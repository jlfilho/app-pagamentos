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
