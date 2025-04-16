# 📘 Tutorial: Adicionando uma Tabela com Paginação no Angular Material

## 🎯 Objetivos

- Integrar uma tabela de dados ao formulário de pesquisa de lançamentos utilizando o componente `mat-table` do Angular Material com suporte à paginação.
- Aplicar estilos condicionais às células da tabela com a diretiva `ngStyle`, destacando visualmente lançamentos de despesas.
- Formatar os valores monetários com o `currency pipe`, garantindo exibição adequada no padrão brasileiro.
- Utilizar o componente `MatTooltip` do Angular Material para fornecer informações complementares ao passar o cursor sobre os ícones de ação.

---

## ✅ Pré-requisitos

- Projeto Angular com Angular Material instalado.
- Componente `lancamentos` já contendo o formulário de pesquisa.

---

## 🧩 Passo 1: Editar o Template HTML

Adicione o seguinte conteúdo ao arquivo `lancamentos.component.html`:

```html

<!-- Tabela de Dados -->
<div class="tabela-container">
  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

    <!-- Coluna: Pessoa -->
    <ng-container matColumnDef="pessoa">
      <th mat-header-cell *matHeaderCellDef> Pessoa </th>
      <td mat-cell *matCellDef="let lanc"> {{ lanc.pessoa }} </td>
    </ng-container>

    <!-- Coluna: Descrição -->
    <ng-container matColumnDef="descricao">
      <th mat-header-cell *matHeaderCellDef> Descrição </th>
      <td mat-cell *matCellDef="let lanc"> {{ lanc.descricao }} </td>
    </ng-container>

    <!-- Coluna: Vencimento -->
    <ng-container matColumnDef="vencimento">
      <th mat-header-cell *matHeaderCellDef> Vencimento </th>
      <td mat-cell *matCellDef="let lanc"> {{ lanc.vencimento }} </td>
    </ng-container>

    <!-- Coluna: Pagamento -->
    <ng-container matColumnDef="pagamento">
      <th mat-header-cell *matHeaderCellDef> Pagamento </th>
      <td mat-cell *matCellDef="let lanc"> {{ lanc.pagamento || '-' }} </td>
    </ng-container>

    <!-- Coluna: Valor -->
    <ng-container matColumnDef="valor">
      <th mat-header-cell *matHeaderCellDef> Valor </th>
      <td mat-cell *matCellDef="let lanc" [ngStyle]="{ color: lanc.tipo === 'DESPESA' ? 'red' : 'blue' }">
        {{ lanc.valor | currency:'BRL' }}
      </td>
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
  <mat-paginator [length]="lancamentos.length"
                 [pageSize]="3"
                 [pageSizeOptions]="[3, 10, 20]"
                 showFirstLastButtons>
  </mat-paginator>
</div>

<div class="container">
  <button mat-raised-button color="primary">Novo lançamento</button>
</div>
```

---

## 🎨 Passo 2: Aplicar Estilos CSS

No arquivo `lancamentos.component.scss`, adicione:

```scss
.tabela-container {
  margin: 24px;
  width: 95%;
  overflow-x: auto;
}
```

---

## 🔧 Passo 3: Atualizar o Componente TypeScript

Substitua o conteúdo do arquivo `lancamentos.component.ts` por:

```ts
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-lancamentos',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule
  ],
  templateUrl: './lancamentos.component.html',
  styleUrl: './lancamentos.component.scss'
})
export class LancamentosComponent implements OnInit, AfterViewInit {
  descricao = '';
  vencimentoInicio = '';
  vencimentoFim = '';

  colunas: string[] = ['pessoa', 'descricao', 'vencimento', 'pagamento', 'valor', 'acoes'];

  lancamentos = [
    { tipo: 'RECEITA', pessoa: 'Henrique Medeiros', descricao: 'Bahamas', vencimento: '10/06/2017', pagamento: null, valor: 500.00 },
    { tipo: 'DESPESA', pessoa: 'Josué Mariano', descricao: 'Café', vencimento: '10/06/2017', pagamento: null, valor: 8.32 },
    { tipo: 'RECEITA', pessoa: 'Maria Rita', descricao: 'Bahamas', vencimento: '10/02/2017', pagamento: '10/02/2017', valor: 100.32 },
    { tipo: 'RECEITA', pessoa: 'Pedro Santos', descricao: 'Top Club', vencimento: '10/06/2017', pagamento: null, valor: 120.00 },
    { tipo: 'RECEITA', pessoa: 'Ricardo Pereira', descricao: 'CEMIG', vencimento: '10/02/2017', pagamento: '10/02/2017', valor: 110.44 }
  ];

  dataSource = new MatTableDataSource(this.lancamentos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
```

---

## ▶️ Passo 4: Executar o Projeto

No terminal, execute o comando:

```bash
ng serve
```

Acesse a aplicação no navegador pelo endereço: [http://localhost:4200](http://localhost:4200)

---

## 🗃️ Passo 5: Versionar no GitHub

Após verificar que está tudo funcionando corretamente, registre e envie as alterações ao repositório remoto:

```bash
git add .
git commit -m "Adiciona tabela de lançamentos com paginação"
git push origin main
```
