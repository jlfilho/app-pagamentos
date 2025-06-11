# ✅ Tutorial – Continuação do Serviço `PessoasService` no Angular

Este tutorial mostra como completar os métodos do serviço Angular para **criar**, **atualizar**, **deletar** e **alterar o status ativo** de uma pessoa, consumindo uma API REST protegida por JWT.

---

## 🧩 Pré-requisitos

* O projeto Angular já está com o `HttpClientModule` importado.
* O serviço `PessoasService` já contém o método `pesquisar()` implementado.
* Você já tem os modelos `Pessoa` e `PessoaFiltro` criados.

---

## 🔹 Passo 1 – Adicionar o método `criarPessoa()`

Este método envia um `POST` para o endpoint `/pessoas` com o corpo contendo os dados da nova pessoa.

```ts
criarPessoa(pessoa: Pessoa): Observable<Pessoa> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.jwtToken}`
  });

  return this.http.post<Pessoa>(this.apiUrl, pessoa, { headers });
}
```

---

## 🔹 Passo 2 – Adicionar o método `atualizarPessoa()`

Este método envia um `PUT` para `/pessoas/{codigo}`, substituindo os dados da pessoa correspondente ao `codigo`.

```ts
atualizarPessoa(codigo: number, pessoa: Pessoa): Observable<Pessoa> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.jwtToken}`
  });

  return this.http.put<Pessoa>(`${this.apiUrl}/${codigo}`, pessoa, { headers });
}
```

---

## 🔹 Passo 3 – Adicionar o método `deletarPessoa()`

Este método envia um `DELETE` para `/pessoas/{codigo}`, removendo a pessoa do backend.

```ts
deletarPessoa(codigo: number): Observable<void> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.jwtToken}`
  });

  return this.http.delete<void>(`${this.apiUrl}/${codigo}`, { headers });
}
```

---

## 🔹 Passo 4 – Adicionar o método `atualizarStatusAtivo()`

Este método envia um `PATCH` para `/pessoas/{codigo}/ativo`, alterando somente o valor booleano do campo `ativo`.

```ts
atualizarStatusAtivo(codigo: number, ativo: boolean): Observable<Pessoa> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.jwtToken}`
  });

  return this.http.patch<Pessoa>(`${this.apiUrl}/${codigo}/ativo`, ativo, { headers });
}
```

---

## 🧩 Dica adicional – Centralizar headers com JWT

Se quiser evitar repetição, você pode criar um método auxiliar:

```ts
private getHeaders(): HttpHeaders {
  return new HttpHeaders({
    'Authorization': `Bearer ${this.jwtToken}`
  });
}
```

E reutilizar:

```ts
return this.http.post<Pessoa>(this.apiUrl, pessoa, { headers: this.getHeaders() });
```

