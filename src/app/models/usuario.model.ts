import { Permissao } from './permissao.model';

export interface Usuario {
  codigo: number;
  nome: string;
  email: string;
  senha: string;
  permissoes: Permissao[];
}
