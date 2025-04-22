import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LancamentoFiltro } from '../models/lancamento-filtro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {
  // JWT hardcoded por enquanto
  private readonly jwtToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkB1ZWEuZWR1LmJyIiwiaWF0IjoxNzQ1Mjk5NTM4LCJleHAiOjE3NDUzMDMxMzh9.c9MY1sFKQn7rhZCJrl60F9f6qvHWLO6wrpIqRpVSHVM';

  private readonly apiUrl = 'http://localhost:8080/lancamentos/resumo'; // ajuste para o seu backend

  private http = inject(HttpClient);

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
    let params = new HttpParams();

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoDe) {
      params = params.set('dataVencimentoDe', filtro.dataVencimentoDe.toISOString().split('T')[0]);
    }

    if (filtro.dataVencimentoAte) {
      params = params.set('dataVencimentoAte', filtro.dataVencimentoAte.toISOString().split('T')[0]);
    }

    params = params.set('page', filtro.page);
    params = params.set('size', filtro.size);
    params = params.set('sort', filtro.sort || 'dataVencimento,asc');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.http.get<any>(this.apiUrl, { params, headers });
  }
}
