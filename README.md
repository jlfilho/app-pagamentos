# 🧾 Tutorial — Criando Interfaces 

## 🎯 Objetivo

Criar interfaces TypeScript para uso em na aplicação, organizando os modelos em arquivos separados.

---

## 1 Criar Pasta de Modelos

Crie uma pasta chamada `models` dentro de `src/app`:

```bash
mkdir src/app/models
```

Ou crie manualmente no VSCode:
```
src/
└── app/
    └── models/
```

---

## 2 Criar as Interfaces

Agora vamos criar as interfaces conforme o diagrama.

### 📄 `categoria.model.ts`
```ts
export interface Categoria {
  codigo: number;
  nome: string;
}
```

---

### 📄 `endereco.model.ts`
```ts
export interface Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}
```

---

### 📄 `pessoa.model.ts`
```ts
import { Endereco } from './endereco.model';

export interface Pessoa {
  codigo: number;
  nome: string;
  ativo: boolean;
  endereco: Endereco;
}
```

---

### 📄 `tipo-lancamento.enum.ts`
```ts
export enum TipoLancamento {
  RECEITA = 0,
  DESPESA = 1
}
```

---

### 📄 `lancamento.model.ts`
```ts
import { Categoria } from './categoria.model';
import { Pessoa } from './pessoa.model';
import { TipoLancamento } from './tipo-lancamento.enum';

export interface Lancamento {
  codigo: number;
  descricao: string;
  dataVencimento: string;   // Pode usar Date se preferir
  dataPagamento: string;    // Pode usar Date se preferir
  valor: number;
  observacao: string;
  tipoLancamento: TipoLancamento;
  categoria: Categoria;
  pessoa: Pessoa;
}
```

---

### 📄 `permissao.model.ts`
```ts
export interface Permissao {
  codigo: number;
  descricao: string;
}
```

---

### 📄 `usuario.model.ts`
```ts
import { Permissao } from './permissao.model';

export interface Usuario {
  codigo: number;
  nome: string;
  email: string;
  senha: string;
  permissoes: Permissao[];
}
```

---

## 3 Usar os Models nos Componentes ou Serviços

Exemplo de uso no serviço:

```ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lancamento } from '../models/lancamento.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LancamentoService {
  private readonly apiUrl = '/api/lancamentos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Lancamento[]> {
    return this.http.get<Lancamento[]>(this.apiUrl);
  }
}
```

---

## 4 Boas Práticas

- ✅ Sempre separe modelos em arquivos próprios.
- ✅ Prefira tipos fortes (`enum`, `interface`, `type`) para garantir consistência.
- ✅ Use camelCase para atributos e PascalCase para nomes de interfaces e enums.
- ✅ Mantenha os nomes alinhados com o backend.

---

## 💾 5 Salvar e Enviar ao GitHub

Após aplicar todas as alterações, salve e envie os arquivos para o repositório:

```bash
git add .
git commit -m "Criando Interfaces TypeScript para a Aplicação"
git push -u origin main
```
