import { Categoria } from './categoria.model';
import { Pessoa } from './pessoa.model';
import { TipoLancamento } from './tipo-lancamento.enum';

export interface Lancamento {
  codigo: number;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  tipoLancamento: TipoLancamento;
  categoria: Categoria;
  pessoa: Pessoa;
}
