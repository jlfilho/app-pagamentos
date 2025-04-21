import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { PessoaCadastroComponent } from "../../pessoa-cadastro/pessoa-cadastro.component";
import { PessoasTableComponent } from '../../pessoas-table/pessoas-table.component';

@Component({
  selector: 'app-pessoas',
  imports: [FormsModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PessoasTableComponent],
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
