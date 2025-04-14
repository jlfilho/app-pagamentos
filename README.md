# 📘 Tutorial: Adicionando o formulário de pesquisa de lançamentos

## 🎯 Objetivo

Implementar uma interface com:

- Uma **Toolbar** azul com um botão de menu.
- Um título "Lançamentos".
- Um formulário com:
  - Campo de **descrição**.
  - Campo de **vencimento (de/até)**.
  - Botão **Pesquisar**.

---

## ✅ Pré-requisitos

- Angular CLI instalado (`npm install -g @angular/cli`)
- Projeto Angular já criado com o modo standalone:

```bash
ng new api-pagamentos --standalone
cd api-pagamentos
```

---

## 🧩 Passo 1: Instalar o Angular Material

```bash
ng add @angular/material
```

Durante a instalação, escolha:

- Theme: `Azure/Blue` (ou outro de sua preferência)
- Global typography styles: `Yes`

---

## Passo 2: Instalando o angular animations

```bash
ng add @angular/material
npm install @angular/animations
```

## 📁 Passo 3: Criar o componente `lancamentos`

```bash
ng generate component lancamentos --standalone
```

---

## 🎨 Passo 4: Atualizar `lancamentos.component.ts`

Substitua o conteúdo por:

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lancamentos',
  standalone: true,
  imports: [
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.scss']
})
export class LancamentosComponent {
  descricao = '';
  vencimentoInicio = '';
  vencimentoFim = '';
}
```

---

## 🧾 Passo 5: Criar o HTML do componente

Edite `**lancamentos.component.html**`:

```html
<mat-toolbar color="primary">
  <button mat-icon-button>
    <mat-icon>menu</mat-icon>
  </button>
</mat-toolbar>

<div class="container">
  <h1><b>Lançamentos</b></h1>

  <mat-form-field appearance="fill" class="campo-descricao">
    <mat-label>Descrição</mat-label>
    <input matInput [(ngModel)]="descricao" placeholder="Digite a descrição">
  </mat-form-field>

  <div class="grupo-vencimento">
    <mat-form-field appearance="fill" class="campo-vencimento">
      <mat-label>Vencimento</mat-label>
      <input matInput [(ngModel)]="vencimentoInicio" placeholder="De">
    </mat-form-field>

    <mat-form-field appearance="fill" class="campo-vencimento">
      <mat-label>até</mat-label>
      <input matInput [(ngModel)]="vencimentoFim" placeholder="Até">
    </mat-form-field>
  </div>

  <button mat-raised-button color="primary" class="botao-pesquisar">
    Pesquisar
  </button>
</div>
```

---

## 🎨 Passo 6: Configure os estilos em CSS (SCSS) 

Edite `**lancamentos.component.scss**`:

```scss
.container {
  padding: 24px;
  width: 90%;

  @media (min-width: 1600px) {
    width: 70%;
  }

  h1 {
    font-weight: bold;
  }

  .campo-descricao {
    width: 100%;
    margin-top: 16px;
  }

  .grupo-vencimento {
    display: flex;
    gap: 16px;
    margin-top: 16px;

    .campo-vencimento {
      flex: 1;
    }
  }

  .botao-pesquisar {
    margin-top: 16px;
  }
}
```

---

## 🛠️ Passo 7: Configurar as rotas

Edite o arquivo `src/app/app.routes.ts`:

```ts
import { Routes } from '@angular/router';
import { LancamentosComponent } from './lancamentos/lancamentos.component';

export const routes: Routes = [
  {
    path: '',
    component: LancamentosComponent
  }
];
```

---

## ⚙️ Passo 8: Garantir que animações estejam configuradas

Edite `src/app/app.config.ts`:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations()
  ]
};
```

---

## 🖥️ Passo 9: Executar o projeto

```bash
ng serve
```

Acesse [http://localhost:4200](http://localhost:4200)


Se ocorrer `Error: EBUSY`

```bash
npm cache clean

npm install --cache
```

---

## ✅ Resultado Esperado

A aplicação deve exibir:

- Uma **barra cinza** com botão de menu.
- Um **título "Lançamentos"** em destaque.
- Um formulário com:
  - Campo de **Descrição**.
  - Campo de vencimento **De** e **Até**.
  - Botão **Pesquisar**.

---

## 🖍️ Passo 10: Salve no repositório Github


```bash
git add .
git commit -m "Adicionando o formulário de pesquisa de lançamentos"
git push -u origin main
```

