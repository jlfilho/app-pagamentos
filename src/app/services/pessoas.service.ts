import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PessoaFiltro } from '../models/pessoa-filtro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  // JWT hardcoded por enquanto
  private readonly jwtToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkB1ZWEuZWR1LmJyIiwiaWF0IjoxNzQ1Mjk5MDEzLCJleHAiOjE3NDUzMDI2MTN9.HRsFE-wwmjruEzhIdxRCc_DyZjjnP_gIhiE7mYVZLzI';

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
}
