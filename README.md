# ✅ Tutorial Completo: Autenticação com JWT no Angular (2024+)

---

## 🔐 1. Criar o Serviço de Autenticação (`auth.service.ts`)

### 📦 Gerar via CLI

```bash
ng generate service services/auth
```

### 📄 Arquivo `auth.service.ts`

```ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap(response => localStorage.setItem('token', response.token))
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
```

---

## 🔄 2. Criar o Interceptor de Token JWT

O interceptor é um recurso do Angular que permite interceptar todas as requisições HTTP feitas pela aplicação. No contexto da autenticação com JWT (JSON Web Token), sua principal função é:

- Anexar automaticamente o token de autenticação no cabeçalho de cada requisição enviada para a API, utilizando o campo Authorization: Bearer <token>.

Isso garante que o usuário não precise adicionar manualmente o token em cada requisição protegida, mantendo a comunicação com o backend segura e automatizada.

### 📦 Gerar via CLI

```bash
ng generate interceptor services/auth
```

### 📄 Arquivo `auth.interceptor.ts` (Novo padrão funcional)

```ts
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }

  return next(req);
};
```

### ⚙️ Registrar no `app.config.ts`

```ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/auth.interceptor';

export const appConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
```

---

## 🛡️ 3. Criar o Guard de Autenticação

O guard (authGuard) é um mecanismo de segurança usado para controlar o acesso a rotas específicas da aplicação. Ele atua como uma "porteira" que decide se o usuário pode ou não acessar determinada rota com base em uma condição, como:

- O usuário está autenticado? (tem um token válido?)

Se a verificação falhar (por exemplo, se o usuário não estiver logado), o guard pode:

- Bloquear o acesso à rota;

- Redirecionar para a página de login.

### 📦 Gerar via CLI

```bash
ng generate guard services/auth
```

### 📄 Arquivo `auth.guard.ts`

```ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated()
    ? true
    : router.createUrlTree(['/login']);
};
```

---

## 🌐 4. Aplicar o `authGuard` nas Rotas

### 📄 Exemplo de `routes.ts`

```ts
import { authGuard } from './services/auth.guard';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { LancamentosComponent } from './lancamentos/lancamentos.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasComponent } from './pessoas/pessoas/pessoas.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // rota pública

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard], // protege todas as rotas filhas
    children: [
      { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
      { path: 'lancamentos', component: LancamentosComponent },
      { path: 'novo-lancamento', component: LancamentoCadastroComponent },
      { path: 'nova-pessoa', component: PessoaCadastroComponent },
      { path: 'pessoas', component: PessoasComponent },
      {
        path: 'pessoas/editar/:codigo',
        loadComponent: () =>
          import('./pessoa-cadastro/pessoa-cadastro.component').then(m => m.PessoaCadastroComponent)
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
```

---

## 👤 5. Criar o Componente de Login com Angular Material

### 📦 Gerar via CLI

```bash
ng generate component login
```

---

### 📄 `login.component.ts`

```ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule
  ]
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.snackBar.open('Por favor, preencha os campos corretamente.', '', {
        duration: 3000
      });
      return;
    }

    const { username, password } = this.form.value;

    this.auth.login(username, password).subscribe({
      next: () => {
        this.snackBar.open('Login realizado com sucesso!', '', { duration: 3000 });
        this.router.navigate(['/']);
      },
      error: () => {
        this.snackBar.open('Credenciais inválidas.', '', { duration: 3000 });
      }
    });
  }
}
```

---

### 📄 `login.component.html`

```html
<div class="login-wrapper">
  <mat-card class="login-card">
    <h1 class="login-title">Acesso ao Sistema</h1>

    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="login-form">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Email</mat-label>
        <input matInput formControlName="username" type="email" autocomplete="username">
        <mat-error *ngIf="form.get('username')?.hasError('required')">Obrigatório</mat-error>
        <mat-error *ngIf="form.get('username')?.hasError('email')">Formato inválido</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Senha</mat-label>
        <input matInput formControlName="password" type="password" autocomplete="current-password">
        <mat-error *ngIf="form.get('password')?.hasError('required')">Obrigatório</mat-error>
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
        Entrar
      </button>
    </form>
  </mat-card>
</div>
```

---

### 🎨 `login.component.scss`

```scss
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f5f7fa, #c3cfe2);
}

.login-card {
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  font-weight: 600;
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.full-width {
  width: 100%;
}
```

---

