# 📘 Tutorial: Adicionando o formulário de pesquisa de pessoas

## 🎯 Objetivo

Implementar uma interface com:

- Uma **Toolbar** azul com um botão de menu.
- Um título "Pessoas".
- Um formulário com:
  - Campo de **nome**.
  - Botão **Pesquisar**.
  - Tabela com:
    - Colunas: **Nome**, **Cidade**, **Estado**, **Status** e **Ações**.
    - Paginação com 10 registros por página.
  - Exibir os dados de pessoas cadastradas.
  - Botão Nova Pessoa que redireciona para o formulário de cadastro de pessoas.

---


## 📁 Passo 1: Criar o componente `pessoas`

```bash
ng generate component pessoas
```

---

## 🎨 Passo 2: Atualizar `pessoas.component.ts`

Substitua o conteúdo por:

```ts
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-pessoas',
  imports: [FormsModule,
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule],
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.scss'
})
export class PessoasComponent implements OnInit, AfterViewInit {
  nome = '';

  colunas: string[] = ['nome', 'cidade', 'estado', 'status', 'acoes'];

  pessoas = [
    { nome: 'Henrique Medeiros', cidade: 'Itacoatiara', estado: 'AM', status: 'Ativo' },
    { nome: 'Juliana Costa', cidade: 'Manaus', estado: 'AM', status: 'Ativo' },
    { nome: 'Roberto Lima', cidade: 'Parintins', estado: 'AM', status: 'Inativo' },
    { nome: 'Ana Paula Souza', cidade: 'Itacoatiara', estado: 'AM', status: 'Ativo' },
    { nome: 'Marcos Vinícius', cidade: 'Tefé', estado: 'AM', status: 'Ativo' },
    { nome: 'Larissa Oliveira', cidade: 'Coari', estado: 'AM', status: 'Inativo' },
    { nome: 'Carlos Henrique', cidade: 'Itacoatiara', estado: 'AM', status: 'Ativo' },
    { nome: 'Fernanda Andrade', cidade: 'Manacapuru', estado: 'AM', status: 'Ativo' },
    { nome: 'João Victor Mendes', cidade: 'Tabatinga', estado: 'AM', status: 'Inativo' },
    { nome: 'Patrícia Ramos', cidade: 'Itacoatiara', estado: 'AM', status: 'Ativo' }
  ];

  dataSource = new MatTableDataSource(this.pessoas);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
```

---

## 🧾 Passo 3: Criar o HTML do componente

Edite `**lancamentos.component.html**`:

```html
<div class="container">
  <h1><b>Pessoas</b></h1>

  <mat-form-field appearance="fill" class="campo-nome">
    <mat-label>Nome</mat-label>
    <input matInput [(ngModel)]="nome" placeholder="Digite o nome">
  </mat-form-field>

  <button mat-raised-button color="primary" class="botao-pesquisar">
    Pesquisar
  </button>
</div>

<!-- Tabela de Dados -->
<div class="tabela-container">
  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

    <!-- Coluna: Nome -->
    <ng-container matColumnDef="nome">
      <th mat-header-cell *matHeaderCellDef> Nome </th>
      <td mat-cell *matCellDef="let pessoa"> {{ pessoa.nome }} </td>
    </ng-container>

    <!-- Coluna: Cidade -->
    <ng-container matColumnDef="cidade">
      <th mat-header-cell *matHeaderCellDef> Cidade </th>
      <td mat-cell *matCellDef="let pessoa"> {{ pessoa.cidade }} </td>
    </ng-container>

    <!-- Coluna: Vencimento -->
    <ng-container matColumnDef="estado">
      <th mat-header-cell *matHeaderCellDef> Estado </th>
      <td mat-cell *matCellDef="let pessoa"> {{ pessoa.estado }} </td>
    </ng-container>

    <!-- Coluna: Pagamento -->
    <ng-container matColumnDef="status">
      <th mat-header-cell *matHeaderCellDef> Status </th>
      <td mat-cell *matCellDef="let pessoa"> {{ pessoa.status }} </td>
    </ng-container>

    <!-- Coluna: Ações -->
    <ng-container matColumnDef="acoes">
      <th mat-header-cell *matHeaderCellDef> Ações </th>
      <td mat-cell *matCellDef="let lanc">
        <button mat-icon-button color="primary" matTooltip="Editar" matTooltipPosition="above">
          <mat-icon>edit</mat-icon>
        </button>
        <button mat-icon-button color="warn" matTooltip="Excluir" matTooltipPosition="above">
          <mat-icon>delete</mat-icon>
        </button>
      </td>
    </ng-container>

    <!-- Cabeçalho e Linhas -->
    <tr mat-header-row *matHeaderRowDef="colunas"></tr>
    <tr mat-row *matRowDef="let row; columns: colunas;"></tr>
  </table>

  <!-- Paginação -->
  <mat-paginator [length]="pessoas.length"
                 [pageSize]="3"
                 [pageSizeOptions]="[3, 10, 20]"
                 showFirstLastButtons>
  </mat-paginator>
</div>

<div class="container">
  <button mat-raised-button color="primary">Novo pessoa</button>
</div>
```

---

## 🎨 Passo 4: Configure os estilos em CSS (SCSS) 

Edite `**lancamentos.component.scss**`:

```scss
.container {
  padding: 24px;
  width: 95%;

  @media (min-width: 1600px) {
    width: 70%;
  }

  h1 {
    font-weight: bold;
  }

  .campo-nome {
    width: 100%;
    margin-top: 16px;
  }

  .botao-pesquisar {
    margin-top: 16px;
  }
}

.tabela-container {
  margin: 24px;
  width: 95%;
  overflow-x: auto;
}
```

---

## 🛠️ Passo 5: Configurar as rotas

Edite o arquivo `src/app/app.routes.ts`:

```ts
import { Routes } from '@angular/router';
import { LancamentosComponent } from './lancamentos/lancamentos.component';
import { LayoutComponent } from './layout/layout.component';
import { PessoasComponent } from './pessoas/pessoas/pessoas.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
      { path: 'pessoas', component: PessoasComponent },
      { path: 'lancamentos', component: LancamentosComponent },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
```

---

## 🖥️ Passo 6: Executar o projeto

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

## 🖍️ Passo 7: Salve no repositório Github


```bash
git add .
git commit -m "Adicionando o formulário de pesquisa de pessoas"
git push -u origin main
```
