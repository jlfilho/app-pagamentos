import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-lancamentos-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './lancamentos-table.component.html',
  styleUrl: './lancamentos-table.component.scss'
})
export class LancamentosTableComponent implements AfterViewInit {
  @Input() dataSource!: MatTableDataSource<any>;

  colunas: string[] = ['pessoa', 'descricao', 'vencimento', 'pagamento', 'valor', 'acoes'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
