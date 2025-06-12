import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Pessoa } from '../models/pessoa.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pessoas-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule
  ],
  templateUrl: './pessoas-table.component.html',
  styleUrl: './pessoas-table.component.scss'
})
export class PessoasTableComponent {
  @Input() pessoas: Pessoa[] = [];

  colunas: string[] = ['nome', 'cidade', 'estado', 'status', 'acoes'];
}
