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
        console.log('Dados recebidos:', dados);
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
