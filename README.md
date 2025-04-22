# ✅ Tutorial — Serviço de Pesquisa de Lançamentos com Filtro

## 🧱 1. Gerar o Serviço

No terminal, dentro do seu projeto Angular:

```bash
ng g s services/lancamentos
```

Isso criará o arquivo `lancamentos.service.ts`.

---

## 🛠️ 2. Estrutura do Filtro (`LancamentoFiltro`)

- Crie uma interface para tipar o filtro:

```ts
// src/app/models/lancamento-filtro.ts

export interface LancamentoFiltro {
  descricao?: string;
  dataVencimentoDe?: Date;
  dataVencimentoAte?: Date;
  page: number;
  size: number;
  sort?: string;
}
```

- Crie uma interface para tipar o LancamentoResumido:

```ts
// src\app\models\lancamento-resumido.model.ts

export interface LancamentoResumido {
  codigo: number;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  tipoLancamento: string;
  categoria: string;
  pessoa: string;
}
```

---

## 3. Fornecer o provedor `HttpClient`

Certifique-se de que o módulo `HttpClientModule` esteja importado no seu `app.config.ts`:

```ts
import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter, MAT_NATIVE_DATE_FORMATS, MAT_DATE_FORMATS } from '@angular/material/core';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNgxMask } from 'ngx-mask';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideHttpClient(), // <-- Adicione esta linha
  provideAnimations(),
  provideNativeDateAdapter(),
  { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  { provide: LOCALE_ID, useValue: 'pt-BR' },
  provideNgxMask(),
  ]
};
```

## 🧪 4. Implementar o Serviço

Atualize o serviço com o seguinte conteúdo:

```ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LancamentoFiltro } from '../models/lancamento-filtro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {
  // JWT hardcoded por enquanto
  private readonly jwtToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkB1ZWEuZWR1LmJyIiwiaWF0IjoxNzQ1Mjg5NjU0LCJleHAiOjE3NDUyOTMyNTR9.8Bi38k2I4u_DZBqRBgXM3yZCHcSIsvjja402-Me4t-o';

  private readonly apiUrl = 'http://localhost:8080/lancamentos/resumo'; // ajuste para o seu backend

  private http = inject(HttpClient);

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
    let params = new HttpParams();

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoDe) {
      params = params.set('dataVencimentoDe', filtro.dataVencimentoDe.toISOString().split('T')[0]);
    }

    if (filtro.dataVencimentoAte) {
      params = params.set('dataVencimentoAte', filtro.dataVencimentoAte.toISOString().split('T')[0]);
    }

    params = params.set('page', filtro.page);
    params = params.set('size', filtro.size);
    params = params.set('sort', filtro.sort || 'dataVencimento,asc');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.http.get<any>(this.apiUrl, { params, headers });
  }
}
```

---

## 🧪 5. Usar o Serviço no Componente

Atualize o componente `LancamentosComponent` para usar o serviço de pesquisa:

```ts
// src/app/lancamentos/lancamentos.component.ts

import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LancamentosTableComponent } from "../lancamentos-table/lancamentos-table.component";
import { LancamentoFiltro } from '../models/lancamento-filtro';
import { LancamentosService } from '../services/lancamentos.service';
import { LancamentoResumido } from '../models/lancamento-resumido.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-lancamentos',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    LancamentosTableComponent,
    MatDatepickerModule,
    MatNativeDateModule,
],
  templateUrl: './lancamentos.component.html',
  styleUrl: './lancamentos.component.scss'
})
export class LancamentosComponent {

  lancamentosService = inject(LancamentosService);
  filtro = signal<LancamentoFiltro>({
    descricao: '',
    dataVencimentoDe: undefined,
    dataVencimentoAte: undefined,
    page: 0,
    size: 5,
    sort: 'dataVencimento,asc'
  });

  lancamentos = signal<LancamentoResumido[]>([]);
  totalElements = signal(0);
  paginaAtual = signal(0);


  pesquisar() {
    this.lancamentosService.pesquisar(this.filtro()).subscribe({
      next: dados => {
        this.lancamentos.set(dados.content);
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

## 📄 6. Atualize o Template do componete `lancamentos`

```html
<!-- src/app/lancamentos/lancamentos.component.html -->

<div class="container">
  <h1><b>Lançamentos</b></h1>

  <mat-form-field appearance="outline" class="campo-descricao">
    <mat-label>Descrição</mat-label>
    <input (keyup)="pesquisar()" matInput [(ngModel)]="filtro().descricao" placeholder="Digite a descrição">
  </mat-form-field>

  <div class="grupo-vencimento">
    <mat-form-field appearance="outline" class="campo45">
      <mat-label>Vencimento de</mat-label>
      <input matInput [matDatepicker]="vencimentoPicker" [(ngModel)]="filtro().dataVencimentoDe" placeholder="De" readonly>
      <mat-datepicker-toggle matSuffix [for]="vencimentoPicker"></mat-datepicker-toggle>
      <mat-datepicker #vencimentoPicker></mat-datepicker>
    </mat-form-field>

    <mat-form-field appearance="outline" class="campo45">
      <mat-label>Vencimento até</mat-label>
      <input matInput [matDatepicker]="recebimentoPicker" [(ngModel)]="filtro().dataVencimentoAte" placeholder="Até" readonly>
      <mat-datepicker-toggle matSuffix [for]="recebimentoPicker"></mat-datepicker-toggle>
      <mat-datepicker #recebimentoPicker></mat-datepicker>
    </mat-form-field>
  </div>

  <button mat-raised-button color="primary" class="botao-pesquisar"
  (click)="pesquisar()">
    Pesquisar
  </button>

  <app-lancamentos-table [lancamentos]="lancamentos()"></app-lancamentos-table>

    <!-- Paginação -->
    <mat-paginator
      [length]="totalElements()"
      [pageSize]="filtro().size"
      [pageIndex]="paginaAtual()"
      [pageSizeOptions]="[5, 10, 15]"
      showFirstLastButtons
      (page)="aoMudarPagina($event)">
    </mat-paginator>

  <button mat-raised-button color="primary" routerLink="/novo-lancamento">
    Novo lançamento
  </button>
</div>
```

---
## 📄 7. Atualize o componete `lancamentos`

```ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LancamentoResumido } from '../models/lancamento-resumido.model';

@Component({
  selector: 'app-lancamentos-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './lancamentos-table.component.html',
  styleUrl: './lancamentos-table.component.scss'
})
export class LancamentosTableComponent {
  @Input() lancamentos: LancamentoResumido[] = [];

  colunas: string[] = ['pessoa', 'descricao', 'vencimento', 'pagamento', 'valor', 'acoes'];
}
```

---

## 📄 8. Atualize o Template do Componente `lancamentos-table`

```html
<!-- Tabela de Dados -->
<div class="tabela-container">
  <table mat-table [dataSource]="lancamentos" class="mat-elevation-z8">

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
      <td mat-cell *matCellDef="let lanc"> {{ lanc.dataVencimento | date:'dd/MM/yyyy' }} </td>
    </ng-container>

    <!-- Coluna: Pagamento -->
    <ng-container matColumnDef="pagamento">
      <th mat-header-cell *matHeaderCellDef> Pagamento </th>
      <td mat-cell *matCellDef="let lanc"> {{ lanc.dataPagamento ? (lanc.dataPagamento | date:'dd/MM/yyyy') : '-' }} </td>
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
</div>
```

## 💾 9. Salvar e Enviar ao GitHub

Após aplicar todas as alterações, salve e envie os arquivos para o repositório:

```bash
git add .
git commit -m "Serviço de Pesquisa de Lançamentos com Filtro"
git push -u origin main
```
