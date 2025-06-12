# ✅ Tutorial: Logout no Angular 

Este guia mostra como implementar o **logout funcional** em um app Angular com roteamento, redirecionamento e limpeza do token JWT ao clicar em "Sair".

---

## ✅ 1. Criar o Componente `Logout` (Standalone)

### 📦 Gerar via CLI (opcional)

```bash
ng generate component logout
```

### 🧩 Arquivo `logout.component.ts`

```ts
import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
```

> 💡 Esse componente **não possui interface visual** — ele apenas **executa o logout** automaticamente quando a rota `/sair` é acessada.

---

## ✅ 2. Registrar a Rota `/sair` no Arquivo de Rotas

Adicione a seguinte entrada no seu `routes.ts`:

```ts
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sair', component: LogoutComponent }, // Rota de logout

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
      { path: 'lancamentos', component: LancamentosComponent },
      { path: 'nova-pessoa', component: PessoaCadastroComponent },
      { path: 'pessoas', component: PessoasComponent },
      {
        path: 'pessoas/editar/:codigo',
        loadComponent: () =>
          import('./pessoa-cadastro/pessoa-cadastro.component').then(m => m.PessoaCadastroComponent)
      }
    ]
  },

  { path: '**', redirectTo: '' }
];
```

---

## ✅ 3. Adicionar o Link de Logout no Menu Lateral

Esse trecho no HTML da sidebar já está correto:

```html
<a mat-list-item routerLink="/sair">Sair</a>
```

---

## 🔄 Resultado Esperado

* ✅ Usuário clica em **"Sair"**
* ✅ Rota `/sair` é acessada
* ✅ `LogoutComponent` executa:

  * `auth.logout()` → limpa o token JWT
  * redirecionamento automático para `/login`
