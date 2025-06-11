import { Endereco } from './endereco.model';

export interface Pessoa {
  codigo?: number;
  nome: string;
  ativo: boolean;
  endereco: Endereco;
}
