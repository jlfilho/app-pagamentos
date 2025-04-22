export interface LancamentoFiltro {
  descricao?: string;
  dataVencimentoDe?: Date;
  dataVencimentoAte?: Date;
  page: number;
  size: number;
  sort?: string;
}
