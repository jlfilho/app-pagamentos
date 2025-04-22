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
