# 🧾 Tutorial — Formulário **"Nova Pessoa"** com Angular 19

Este tutorial ensina como criar um formulário funcional com Angular 19 e Angular Material para cadastro de pessoas, com suporte a:

- Angular Material  
- Máscara de entrada para **CEP** (`ngx-mask`)

---

## 1. 🧱 Gerar o componente `pessoa-cadastro`

No terminal, execute:

```bash
ng g c pessoa-cadastro
```

---

## 2. 🔁 Adicionar o componente às rotas

Edite o arquivo de rotas (ex: `app.routes.ts`):

```ts
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PessoasComponent } from './pessoas/pessoas/pessoas.component';
import { LancamentosComponent } from './lancamentos/lancamentos.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
      { path: 'pessoas', component: PessoasComponent },
      { path: 'lancamentos', component: LancamentosComponent },
      { path: 'novo-lancamento', component: LancamentoCadastroComponent },
      { path: 'nova-pessoa', component: PessoaCadastroComponent } // <-- nova rota
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
```

---

## 3. 🔗 Adicionar botão de navegação

No arquivo `src/app/pessoas/pessoas/pessoas.component.html`, adicione:

```html
<div class="container">
  <button mat-raised-button color="primary" routerLink="/nova-pessoa">Nova pessoa</button>
</div>
```

### ✳️ Importar o `RouterModule` no componente:

No `pessoas.component.ts`:

```ts
imports: [
  CommonModule,
  RouterModule,
  FormsModule,
  MatPaginatorModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatTooltipModule
],
```

---

## 4. 🖼 Template: `pessoa-cadastro.component.html`

```html
<div class="form-container">
  <h2>Nova pessoa</h2>

  <form [formGroup]="form">

    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Nome</mat-label>
      <input matInput formControlName="nome" />
    </mat-form-field>

    <div class="row">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Logradouro</mat-label>
        <input matInput formControlName="logradouro" />
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Número</mat-label>
        <input matInput formControlName="numero" />
      </mat-form-field>
    </div>

    <div class="row">
      <mat-form-field appearance="outline" class="campo35">
        <mat-label>Complemento</mat-label>
        <input matInput formControlName="complemento" />
      </mat-form-field>
      <mat-form-field appearance="outline" class="campo35">
        <mat-label>Bairro</mat-label>
        <input matInput formControlName="bairro" />
      </mat-form-field>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>CEP</mat-label>
        <input matInput
               type="text"
               formControlName="cep"
               mask="00000-000"
               placeholder="00000-000" />
      </mat-form-field>
    </div>

    <div class="row">
      <mat-form-field appearance="outline" class="campo45">
        <mat-label>Cidade</mat-label>
        <input matInput formControlName="cidade" />
      </mat-form-field>
      <mat-form-field appearance="outline" class="campo45">
        <mat-label>Estado</mat-label>
        <input matInput formControlName="estado" />
      </mat-form-field>
    </div>

    <div class="buttons">
      <button mat-raised-button color="primary" (click)="salvar()">Salvar</button>
      <button mat-stroked-button color="accent" (click)="novo()">Novo</button>
      <a mat-button routerLink="/pessoas">Voltar para a pesquisa</a>
    </div>
  </form>
</div>
```

---

## 5. 🎨 Estilo: `pessoa-cadastro.component.scss`

```scss
.form-container {
  max-width: 800px;
  margin: auto;
  padding: 16px;

  .row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;

    .campo100 { flex: 0 0 100%; }
    .campo70 { flex: 0 0 70%; }
    .campo45 { flex: 0 0 49%; }
    .campo35 { flex: 0 0 35%; }
    .campo30 { flex: 0 0 30%; }
    .campo20 { flex: 0 0 20%; }
  }

  .full-width {
    flex: 1;
    width: 100%;
  }

  .buttons {
    display: flex;
    gap: 16px;
    margin-top: 16px;
  }
}
```

---

## 6. 🧩 Lógica: `pessoa-cadastro.component.ts`

```ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-pessoa-cadastro',
  standalone: true,
  templateUrl: './pessoa-cadastro.component.html',
  styleUrl: './pessoa-cadastro.component.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    NgxMaskDirective
  ]
})
export class PessoaCadastroComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  salvar() {
    if (this.form.valid) {
      console.log('Dados salvos:', this.form.value);
    }
  }

  novo() {
    this.form.reset();
  }
}
```

---

## ✅ Pronto!

Agora você tem um formulário de **cadastro de pessoa** com:

- UI elegante com **Angular Material**
- Máscara de CEP `00000-000` usando `ngx-mask`
- Botões funcionais e navegação integrada

---

## 💾 Passo final: Salve no repositório GitHub

```bash
git add .
git commit -m "Formulário Nova Pessoa"
git push -u origin main
```
