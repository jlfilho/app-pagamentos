import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PessoaFiltro } from '../models/pessoa-filtro';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa.model';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  // JWT hardcoded por enquanto
  private readonly jwtToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkB1ZWEuZWR1LmJyIiwiaWF0IjoxNzQ5NzAwMDE2LCJleHAiOjE3NTAwNjAwMTZ9.5xYw_fg1mOJK0aurEEiETZP4Gi4i2et7P3G1-UDU8oA';

  private readonly apiUrl = 'http://localhost:8080/pessoas'; // ajuste para o seu backend

  private http = inject(HttpClient);

  pesquisar(filtro: PessoaFiltro): Observable<any> {
    let params = new HttpParams();

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    params = params.set('page', filtro.page);
    params = params.set('size', filtro.size);
    params = params.set('sort', filtro.sort || 'nome,asc');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.http.get<any>(this.apiUrl, { params, headers });
  }

  criarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
    return this.http.post<Pessoa>(this.apiUrl, pessoa, { headers });
  }

  atualizarPessoa(codigo: number, pessoa: Pessoa): Observable<Pessoa> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
    console.log(JSON.stringify(pessoa, null, 2));
    return this.http.put<Pessoa>(`${this.apiUrl}/${codigo}`, pessoa, { headers });
  }

  deletarPessoa(codigo: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
    const url = `${this.apiUrl}/${codigo}`;
    return this.http.delete<void>(url, { headers });
  }

  atualizarStatusAtivo(codigo: number, status: boolean): Observable<Pessoa> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
    const url = `${this.apiUrl}/${codigo}/ativo`;
    console.log(url);
    return this.http.patch<Pessoa>(url, status, { headers });
  }

  buscarPorCodigo(codigo: number): Observable<Pessoa> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.http.get<Pessoa>(`${this.apiUrl}/${codigo}`, { headers });
  }

}
