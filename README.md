# ✅ Tutorial — Serviço de Pesquisa de Pessoas com Filtro

## 🧱 1. Gerar o Serviço

No terminal, dentro do seu projeto Angular:

```bash
ng g s services/pessoas
```

Isso criará o arquivo `pessoas.service.ts`.

---

## 🛠️ 2. Estrutura do Filtro (`PessoaFiltro`)

- Crie uma interface para tipar o filtro:

```ts
// src/app/models/pessoa-filtro.ts

export interface PessoaFiltro {
  nome?: string;
  page: number;
  size: number;
  sort?: string;
}
```
---

## 🧪 3. Implementar o Serviço

Atualize o serviço com o seguinte conteúdo:

```ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PessoaFiltro } from '../models/pessoa-filtro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  // JWT hardcoded por enquanto
  private readonly jwtToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkB1ZWEuZWR1LmJyIiwiaWF0IjoxNzQ1Mjg5NjU0LCJleHAiOjE3NDUyOTMyNTR9.8Bi38k2I4u_DZBqRBgXM3yZCHcSIsvjja402-Me4t-o';

  private readonly apiUrl = 'http://localhost:8080/pessoas'; // ajuste para o seu backend

  private http = inject(HttpClient);

  pesquisar(filtro: PessoaFiltro): Observable<any> {
    let params = new HttpParams();

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    params = params.set('page', filtro.page);
    params = params.set('size', filtro.size);
    params = params.set('sort', filtro.sort || 'nome,asc');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.http.get<any>(this.apiUrl, { params, headers });
  }
}
```

---

## 🧪 4. Usar o Serviço no Componente

Atualize o componente `PessoasComponent` para usar o serviço de pesquisa:

```ts
// src/app/pessoas/pessoas.component.ts

import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { PessoasTableComponent } from '../../pessoas-table/pessoas-table.component';
import { PessoasService } from '../../services/pessoas.service';
import { PessoaFiltro } from '../../models/pessoa-filtro';
import { Pessoa } from '../../models/pessoa.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pessoas',
  imports: [FormsModule,
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PessoasTableComponent],
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.scss'
})
export class PessoasComponent {
  pessoasService = inject(PessoasService);
  filtro = signal<PessoaFiltro>({
    nome: '',
    page: 0,
    size: 5,
    sort: 'nome,asc'
  });

  pessoas = signal<Pessoa[]>([]);
  totalElements = signal(0);
  paginaAtual = signal(0);

  pesquisar() {
    this.pessoasService.pesquisar(this.filtro()).subscribe({
      next: dados => {
        this.pessoas.set(dados.content);
        this.totalElements.set(dados.totalElements);
        this.paginaAtual.set(dados.number);
      },
      error: err => console.error('Erro ao carregar lançamentos', err)
    });
  }

  aoMudarPagina(event: PageEvent) {
    this.filtro().page = event.pageIndex;
    this.filtro().size = event.pageSize;
    this.pesquisar();
  }

  ngOnInit() {
    this.pesquisar();
  }

}
```

---

## 📄 5. Atualize o Template do componete `pessoas`

```html
<!-- src/app/pessoas/pessoas.component.html -->

<div class="container">
  <h1><b>Pessoas</b></h1>

  <mat-form-field appearance="outline" class="campo-nome">
    <mat-label>Nome</mat-label>
    <input (keyup)="pesquisar()" matInput [(ngModel)]="filtro().nome" placeholder="Digite o nome">
  </mat-form-field>

  <button mat-raised-button color="primary" class="botao-pesquisar"
  (click)="pesquisar()">
    Pesquisar
  </button>

  <app-pessoas-table [pessoas]="pessoas()"></app-pessoas-table>

  <!-- Paginação -->
  <mat-paginator
    [length]="totalElements()"
    [pageSize]="filtro().size"
    [pageIndex]="paginaAtual()"
    [pageSizeOptions]="[5, 10, 15]"
    showFirstLastButtons
    (page)="aoMudarPagina($event)">
  </mat-paginator>

  <button mat-raised-button color="primary" routerLink="/nova-pessoa">Novo pessoa</button>
</div>
```

---
## 📄 6. Atualize o componete `pessoas-table`

```ts
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Pessoa } from '../models/pessoa.model';

@Component({
  selector: 'app-pessoas-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './pessoas-table.component.html',
  styleUrl: './pessoas-table.component.scss'
})
export class PessoasTableComponent {
  @Input() pessoas: Pessoa[] = [];

  colunas: string[] = ['nome', 'cidade', 'estado', 'status', 'acoes'];
}
```

---

## 📄 7. Atualize o Template do Componente `pessoas-table`

```html
<!-- Tabela de Dados -->
<div class="tabela-container">
  <table mat-table [dataSource]="pessoas" class="mat-elevation-z8">

    <!-- Coluna: Nome -->
    <ng-container matColumnDef="nome">
      <th mat-header-cell *matHeaderCellDef> Nome </th>
      <td mat-cell *matCellDef="let pessoa"> {{ pessoa.nome }} </td>
    </ng-container>

    <!-- Coluna: Cidade -->
    <ng-container matColumnDef="cidade">
      <th mat-header-cell *matHeaderCellDef> Cidade </th>
      <td mat-cell *matCellDef="let pessoa"> {{ pessoa.endereco.cidade }} </td>
    </ng-container>

    <!-- Coluna: Vencimento -->
    <ng-container matColumnDef="estado">
      <th mat-header-cell *matHeaderCellDef> Estado </th>
      <td mat-cell *matCellDef="let pessoa"> {{ pessoa.endereco.estado }} </td>
    </ng-container>

    <!-- Coluna: Pagamento -->
    <ng-container matColumnDef="status">
      <th mat-header-cell *matHeaderCellDef> Status </th>
      <td mat-cell *matCellDef="let pessoa"> {{ pessoa.ativo ? "Ativo" : "Desativado" }} </td>
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
</div>
```

## 💾 8. Salvar e Enviar ao GitHub

Após aplicar todas as alterações, salve e envie os arquivos para o repositório:

```bash
git add .
git commit -m "Serviço de Pesquisa de Pessoas com Filtro"
git push -u origin main
```
