import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LancamentosTableComponent } from "../lancamentos-table/lancamentos-table.component";
import { MatTableDataSource } from '@angular/material/table';

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
