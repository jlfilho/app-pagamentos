# ✅ Tutorial — Criando Componente Filho para a Tabela de Pessoas

Neste tutorial, você aprenderá a criar um componente filho responsável por exibir os dados das pessoas cadastradas em uma tabela, utilizando o Angular Material.

---

## 🧱 1. Criar o Componente `pessoas-table`

Execute no terminal o comando abaixo para gerar o componente:

```bash
ng g c pessoas-table
```

---

## 🛠️ 2. Atualizar o Componente Filho (`pessoas-table.component.ts`)

Atualize o componente gerado para receber um `MatTableDataSource` por meio de um `@Input()`:

```ts
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-pessoas-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './pessoas-table.component.html',
  styleUrl: './pessoas-table.component.scss'
})
export class PessoasTableComponent implements AfterViewInit {
  @Input() dataSource!: MatTableDataSource<any>;

  colunas: string[] = ['nome', 'cidade', 'estado', 'status', 'acoes'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
```

---

## 👨‍💻 3. Atualizar o Componente Pai (`pessoas.component.ts`)

```ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { PessoasTableComponent } from '../../pessoas-table/pessoas-table.component';

@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PessoasTableComponent
  ],
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.scss'
})
export class PessoasComponent {
  nome = '';

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
}
```

---

## 🧾 4. Atualizar o Template do Componente Pai (`pessoas.component.html`)

```html
<div class="container">
  <h1><b>Pessoas</b></h1>

  <mat-form-field appearance="fill" class="campo-nome">
    <mat-label>Nome</mat-label>
    <input matInput [(ngModel)]="nome" placeholder="Digite o nome" />
  </mat-form-field>

  <button mat-raised-button color="primary" class="botao-pesquisar">
    Pesquisar
  </button>

  <app-pessoas-table [dataSource]="dataSource"></app-pessoas-table>

  <button mat-raised-button color="primary" routerLink="/nova-pessoa">
    Nova pessoa
  </button>
</div>
```

---

## 🎨 5. Estilização do Componente Pai (`pessoas.component.scss`)

```scss
.container {
  padding: 24px;
  max-width: 800px;
  margin: auto;

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
```

---

## 📊 6. Atualizar o HTML do Componente Filho (`pessoas-table.component.html`)

```html
<div class="tabela-container">
  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

    <!-- Coluna: Nome -->
    <ng-container matColumnDef="nome">
      <th mat-header-cell *matHeaderCellDef>Nome</th>
      <td mat-cell *matCellDef="let pessoa">{{ pessoa.nome }}</td>
    </ng-container>

    <!-- Coluna: Cidade -->
    <ng-container matColumnDef="cidade">
      <th mat-header-cell *matHeaderCellDef>Cidade</th>
      <td mat-cell *matCellDef="let pessoa">{{ pessoa.cidade }}</td>
    </ng-container>

    <!-- Coluna: Estado -->
    <ng-container matColumnDef="estado">
      <th mat-header-cell *matHeaderCellDef>Estado</th>
      <td mat-cell *matCellDef="let pessoa">{{ pessoa.estado }}</td>
    </ng-container>

    <!-- Coluna: Status -->
    <ng-container matColumnDef="status">
      <th mat-header-cell *matHeaderCellDef>Status</th>
      <td mat-cell *matCellDef="let pessoa">{{ pessoa.status }}</td>
    </ng-container>

    <!-- Coluna: Ações -->
    <ng-container matColumnDef="acoes">
      <th mat-header-cell *matHeaderCellDef>Ações</th>
      <td mat-cell *matCellDef="let pessoa">
        <button mat-icon-button color="primary" matTooltip="Editar" matTooltipPosition="above">
          <mat-icon>edit</mat-icon>
        </button>
        <button mat-icon-button color="warn" matTooltip="Excluir" matTooltipPosition="above">
          <mat-icon>delete</mat-icon>
        </button>
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="colunas"></tr>
    <tr mat-row *matRowDef="let row; columns: colunas;"></tr>
  </table>

  <mat-paginator
    [length]="dataSource.data.length"
    [pageSize]="3"
    [pageSizeOptions]="[3, 10, 20]"
    showFirstLastButtons>
  </mat-paginator>
</div>
```

---

## 🎨 7. Estilização do Componente Filho (`pessoas-table.component.scss`)

```scss
.tabela-container {
  margin: 24px;
  max-width: 800px;
  margin: auto;
  overflow-x: auto;
}
```

---

## 💾 8. Salvar e Enviar ao GitHub

Após aplicar todas as alterações, salve e envie os arquivos para o repositório:

```bash
git add .
git commit -m "Criação do componente filho de tabela de pessoas"
git push -u origin main
```
