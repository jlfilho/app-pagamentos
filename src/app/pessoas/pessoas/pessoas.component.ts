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
