# ✅ Tutorial — Criando Componente Filho para a Tabela de Lançamentos

Neste tutorial, vamos criar um componente filho responsável por exibir os lançamentos financeiros em formato de tabela, utilizando Angular Material.

---

## 🧱 1. Criar o Componente `lancamentos-table`

No terminal, execute:

```bash
ng g c lancamentos-table
```

---

## 🛠️ 2. Atualizar o Componente Filho (`lancamentos-table.component.ts`)

Modifique o componente para receber um `MatTableDataSource` como `@Input()`:

```ts
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-lancamentos-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './lancamentos-table.component.html',
  styleUrl: './lancamentos-table.component.scss'
})
export class LancamentosTableComponent implements AfterViewInit {
  @Input() dataSource!: MatTableDataSource<any>;

  colunas: string[] = ['pessoa', 'descricao', 'vencimento', 'pagamento', 'valor', 'acoes'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
```

---

## 👨‍💻 3. Atualizar o Componente Pai (`lancamentos.component.ts`)

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { LancamentosTableComponent } from '../lancamentos-table/lancamentos-table.component';

@Component({
  selector: 'app-lancamentos',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    LancamentosTableComponent
  ],
  templateUrl: './lancamentos.component.html',
  styleUrl: './lancamentos.component.scss'
})
export class LancamentosComponent {
  descricao = '';
  vencimentoInicio = '';
  vencimentoFim = '';

  lancamentos = [
    { tipo: 'RECEITA', pessoa: 'Henrique Medeiros', descricao: 'Bahamas', vencimento: '10/06/2017', pagamento: null, valor: 500.00 },
    { tipo: 'DESPESA', pessoa: 'Josué Mariano', descricao: 'Café', vencimento: '10/06/2017', pagamento: null, valor: 8.32 },
    { tipo: 'RECEITA', pessoa: 'Maria Rita', descricao: 'Bahamas', vencimento: '10/02/2017', pagamento: '10/02/2017', valor: 100.32 },
    { tipo: 'RECEITA', pessoa: 'Pedro Santos', descricao: 'Top Club', vencimento: '10/06/2017', pagamento: null, valor: 120.00 },
    { tipo: 'RECEITA', pessoa: 'Ricardo Pereira', descricao: 'CEMIG', vencimento: '10/02/2017', pagamento: '10/02/2017', valor: 110.44 }
  ];

  dataSource = new MatTableDataSource(this.lancamentos);
}
```

---

## 🧾 4. Atualizar o Template do Componente Pai (`lancamentos.component.html`)

```html
<div class="container">
  <h1><b>Lançamentos</b></h1>

  <mat-form-field appearance="fill" class="campo-descricao">
    <mat-label>Descrição</mat-label>
    <input matInput [(ngModel)]="descricao" placeholder="Digite a descrição" />
  </mat-form-field>

  <div class="grupo-vencimento">
    <mat-form-field appearance="fill" class="campo-vencimento">
      <mat-label>Vencimento</mat-label>
      <input matInput [(ngModel)]="vencimentoInicio" placeholder="De" />
    </mat-form-field>

    <mat-form-field appearance="fill" class="campo-vencimento">
      <mat-label>Até</mat-label>
      <input matInput [(ngModel)]="vencimentoFim" placeholder="Até" />
    </mat-form-field>
  </div>

  <button mat-raised-button color="primary" class="botao-pesquisar">
    Pesquisar
  </button>

  <app-lancamentos-table [dataSource]="dataSource"></app-lancamentos-table>

  <button mat-raised-button color="primary" routerLink="/novo-lancamento">
    Novo lançamento
  </button>
</div>
```

---

## 🎨 5. Estilização do Componente Pai (`lancamentos.component.scss`)

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

## 📊 6. Atualizar o HTML do Componente Filho (`lancamentos-table.component.html`)

```html
<div class="tabela-container">
  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

    <!-- Colunas -->
    <ng-container matColumnDef="pessoa">
      <th mat-header-cell *matHeaderCellDef>Pessoa</th>
      <td mat-cell *matCellDef="let lanc">{{ lanc.pessoa }}</td>
    </ng-container>

    <ng-container matColumnDef="descricao">
      <th mat-header-cell *matHeaderCellDef>Descrição</th>
      <td mat-cell *matCellDef="let lanc">{{ lanc.descricao }}</td>
    </ng-container>

    <ng-container matColumnDef="vencimento">
      <th mat-header-cell *matHeaderCellDef>Vencimento</th>
      <td mat-cell *matCellDef="let lanc">{{ lanc.vencimento }}</td>
    </ng-container>

    <ng-container matColumnDef="pagamento">
      <th mat-header-cell *matHeaderCellDef>Pagamento</th>
      <td mat-cell *matCellDef="let lanc">{{ lanc.pagamento || '-' }}</td>
    </ng-container>

    <ng-container matColumnDef="valor">
      <th mat-header-cell *matHeaderCellDef>Valor</th>
      <td mat-cell *matCellDef="let lanc" [ngStyle]="{ color: lanc.tipo === 'DESPESA' ? 'red' : 'blue' }">
        {{ lanc.valor | currency:'BRL' }}
      </td>
    </ng-container>

    <ng-container matColumnDef="acoes">
      <th mat-header-cell *matHeaderCellDef>Ações</th>
      <td mat-cell *matCellDef="let lanc">
        <button mat-icon-button color="primary" matTooltip="Editar" matTooltipPosition="above">
          <mat-icon>edit</mat-icon>
        </button>
        <button mat-icon-button color="warn" matTooltip="Excluir" matTooltipPosition="above">
          <mat-icon>delete</mat-icon>
        </button>
      </td>
    </ng-container>

    <!-- Cabeçalho e linhas -->
    <tr mat-header-row *matHeaderRowDef="colunas"></tr>
    <tr mat-row *matRowDef="let row; columns: colunas;"></tr>
  </table>

  <!-- Paginação -->
  <mat-paginator
    [length]="dataSource.data.length"
    [pageSize]="3"
    [pageSizeOptions]="[3, 10, 20]"
    showFirstLastButtons>
  </mat-paginator>
</div>
```

---

## 🎨 7. Estilização do Componente Filho (`lancamentos-table.component.scss`)

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

```bash
git add .
git commit -m "Criação do componente filho de tabela de lançamentos"
git push -u origin main
```
