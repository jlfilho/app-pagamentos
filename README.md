# 📘 Tutorial: Desmembrando o `mat-toolbar` e Criando Menu Intercambiável

## 🎯 Objetivo  

- Separar a `mat-toolbar` em um componente chamado `TopbarComponent`.
- Adicionar um menu lateral (`mat-sidenav`) com itens de navegação.
- Permitir que o menu seja aberto/fechado de qualquer lugar da aplicação.
- Integrar a navegação utilizando o Angular Router.

---

## ✅ Pré-requisitos

- Rotas configuradas com alguns componentes (como `LancamentosComponent`).

---

## 🧩 Passo 1: Criar o componente `topbar` 

```bash
ng generate component shared/components/topbar 
```

---

## ✏️ Passo 2: Editar `topbar.component.html`

```html
<mat-toolbar color="primary">
  <button mat-icon-button (click)="toggleMenu.emit()">
    <mat-icon>menu</mat-icon>
  </button>
  <span>App Pagamentos</span>
</mat-toolbar>
```

---

## 🧠 Passo 3: Editar `topbar.component.ts`

```ts
import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  @Output() toggleMenu = new EventEmitter<void>();
}
```

---

## 🔧 Passo 4: Remover a `mat-toolbar` do `lancamentos.component.html`

Remova o trecho antigo da toolbar, pois agora ela será usada no `LayoutComponent`.

```html
<mat-toolbar color="primary">
  <button mat-icon-button>
    <mat-icon>menu</mat-icon>
  </button>
</mat-toolbar>
```

---

## 🧩 Passo 5: Criar o componente `layout` 

```bash
ng generate component layout 
```

---

## ✏️ Passo 6: Editar `layout.component.html`

```html
<!--Barra de menu-->
<app-topbar (toggleMenu)="drawer.toggle()"></app-topbar>
<!--Menu lateral-->
<mat-sidenav-container class="sidenav-container">
  <mat-sidenav #drawer mode="side" opened="false" position="start">
     <!-- Barra Lateral -->
    <mat-nav-list>
      <a mat-list-item routerLink="/lancamentos">Administrador</a>
      <mat-divider></mat-divider>
      <a mat-list-item routerLink="/lancamentos">Lancamentos</a>
      <a mat-list-item routerLink="/Pessoas">Pessoas</a>
      <a mat-list-item routerLink="/Pessoas">Sair</a>
    </mat-nav-list>
  </mat-sidenav>

  <!-- Conteúdo Principal -->
  <mat-sidenav-content>
    <!-- Área de Conteúdo -->
    <div class="content">
      <router-outlet />
    </div>
  </mat-sidenav-content>
</mat-sidenav-container>
```

---

## 🎨 Passo 7: Editar `layout.component.scss`

```scss
.sidenav-container {
  height: 100vh;
}

.content {
  padding: 24px;
}
```

---

## 🛠️ Passo 8: Editar `layout.component.ts` com os imports necessários

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { TopbarComponent } from '../shared/components/topbar/topbar.component';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    TopbarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {}
```

---

## 🌐 Passo 9: Configurar as rotas para usar o `LayoutComponent`

No seu arquivo `app.routes.ts` (ou onde define suas rotas):

```ts
import { Routes } from '@angular/router';
import { LancamentosComponent } from './lancamentos/lancamentos.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'lancamentos', component: LancamentosComponent },
      { path: '', redirectTo: 'lancamentos', pathMatch: 'full' }
    ]
  }
];
```
