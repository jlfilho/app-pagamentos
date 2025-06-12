# Revisão do Serviço de Pessoas

### ✅ Objetivo da Revisão

* ✅ Remover `HttpHeaders` com token fixo
* ✅ Remover campo `jwtToken`
* ✅ Usar o `HttpClient` diretamente (o `authInterceptor` já insere o token)

---

### ✅ Versão Atualizada: `pessoas.service.ts`

```ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PessoaFiltro } from '../models/pessoa-filtro';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa.model';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {
  private readonly apiUrl = 'http://localhost:8080/pessoas';
  private http = inject(HttpClient);

  pesquisar(filtro: PessoaFiltro): Observable<any> {
    let params = new HttpParams();

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    params = params.set('page', filtro.page);
    params = params.set('size', filtro.size);
    params = params.set('sort', filtro.sort || 'nome,asc');

    return this.http.get<any>(this.apiUrl, { params });
  }

  criarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.apiUrl, pessoa);
  }

  atualizarPessoa(codigo: number, pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.apiUrl}/${codigo}`, pessoa);
  }

  deletarPessoa(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codigo}`);
  }

  atualizarStatusAtivo(codigo: number, status: boolean): Observable<Pessoa> {
    const url = `${this.apiUrl}/${codigo}/ativo`;
    return this.http.patch<Pessoa>(url, status);
  }

  buscarPorCodigo(codigo: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.apiUrl}/${codigo}`);
  }
}
```
---

### ✅ Requisitos para que isso funcione corretamente:

1. O `authInterceptor` já deve estar implementado e registrado via `provideHttpClient(...)` com `withInterceptors(...)`.
2. O `AuthService.getToken()` deve retornar o token corretamente do `localStorage`.

