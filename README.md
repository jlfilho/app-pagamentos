# ✅ TUTORIAL: Atualizar Pessoa e Exibir SnackBar

---

## 1. 🔁 **Configurar a rota para edição**

No seu arquivo de rotas (`app.routes.ts`):

```ts
{
  path: 'pessoas/editar/:codigo',
  loadComponent: () => import('./pessoa-cadastro/pessoa-cadastro.component').then(m => m.PessoaCadastroComponent)
}
```

> Essa rota permite abrir a tela de cadastro e carregar os dados da pessoa com base no `:codigo`.

---

## 2. 🔗 **Botão de editar na tabela**

Em `pessoas-table.component.html`, adicione no botão de lápis:

```html
<button mat-icon-button color="primary"
        matTooltip="Editar"
        [routerLink]="['/pessoas/editar', pessoa.codigo]">
  <mat-icon>edit</mat-icon>
</button>
```
- Importe `RouterModule` no seu módulo se ainda não tiver feito isso:

---

## 3. 🧠 **Método no serviço para buscar pessoa por código**

No `PessoasService` (`pessoas.service.ts`):

```ts
buscarPorCodigo(codigo: number): Observable<Pessoa> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.jwtToken}`
  });

  return this.http.get<Pessoa>(`${this.apiUrl}/${codigo}`, { headers });
}
```

---

## 4. ✍️ **Atualizar o componente `PessoaCadastroComponent`**


```ts
import { PessoasService } from './../services/pessoas.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { Pessoa } from '../models/pessoa.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pessoa-cadastro',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    NgxMaskDirective,
    MatSnackBarModule],
  templateUrl: './pessoa-cadastro.component.html',
  styleUrl: './pessoa-cadastro.component.scss'
})
export class PessoaCadastroComponent implements OnInit{
  form: FormGroup;
  pessoaSelecionada?: Pessoa;

  constructor(
    private fb: FormBuilder,
    private pessoasService: PessoasService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      logradouro: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      numero: ['', [Validators.required, Validators.maxLength(10)]],
      complemento: ['', [Validators.maxLength(255)]],
      bairro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      cidade: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      estado: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    });
  }

  ngOnInit(): void {
    const codigo = this.route.snapshot.paramMap.get('codigo');
    if (codigo) {
      this.pessoasService.buscarPorCodigo(+codigo).subscribe(p => {
        this.pessoaSelecionada = p;
        this.preencherFormulario(p);
      });
    }
  }

  preencherFormulario(p: Pessoa) {
    this.form.patchValue({
      nome: p.nome,
      logradouro: p.endereco.logradouro,
      numero: p.endereco.numero,
      complemento: p.endereco.complemento,
      bairro: p.endereco.bairro,
      cep: p.endereco.cep,
      cidade: p.endereco.cidade,
      estado: p.endereco.estado
    });
  }


   salvar() {
    if (this.form.valid) {
      const pessoa: Pessoa = {
        codigo: this.pessoaSelecionada?.codigo,
        nome: this.form.value.nome,
        ativo: this.pessoaSelecionada?.ativo ?? true,
        endereco: {
          logradouro: this.form.value.logradouro,
          numero: this.form.value.numero,
          complemento: this.form.value.complemento,
          bairro: this.form.value.bairro,
          cep: this.form.value.cep.trim(),
          cidade: this.form.value.cidade,
          estado: this.form.value.estado,
        }
      };

      const obs = pessoa.codigo
        ? this.pessoasService.atualizarPessoa(pessoa.codigo, pessoa)
        : this.pessoasService.criarPessoa(pessoa);

      obs.subscribe({
        next: (p) => {
          const mensagem = pessoa.codigo ? 'Atualizado com sucesso!' : 'Salvo com sucesso!';
          this.snackBar.open(mensagem, 'Fechar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
          this.novo();
        },
        error: (e) => {
          const mensagem = pessoa.codigo ? 'Erro ao atualizar!' : 'Erro ao Salvar!';
            this.snackBar.open(mensagem, 'Fechar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['snackbar-error']
            });
          console.error('Erro ao salvar pessoa:', e);
        }
      });
    }
  }

  novo() {
    this.form.reset();
    this.pessoaSelecionada = undefined;
  }

}
```


Já está pronto no seu código. O que ele faz:

* Detecta `:codigo` via `ActivatedRoute`
* Usa `pessoasService.buscarPorCodigo(...)` para buscar os dados
* Preenche o formulário com `patchValue`
* Chama `atualizarPessoa(...)` ou `criarPessoa(...)` baseado na presença do código

---

## 5. ✅ **Formulário com botão dinâmico**

No HTML do formulário (`pessoa-cadastro.component.html`):

```html
<button mat-raised-button color="primary" (click)="salvar()" [disabled]="form.invalid">
  {{ pessoaSelecionada?.codigo ? 'Atualizar' : 'Salvar' }}
</button>
```

> Isso mostra "Atualizar" quando está editando, e "Salvar" quando for novo.

---

## 6. ✅ **Feedback com `MatSnackBar`**

### No `salvar()`:

```ts
const mensagem = pessoa.codigo ? 'Atualizado com sucesso!' : 'Salvo com sucesso!';
this.snackBar.open(mensagem, 'Fechar', {
  duration: 3000,
  horizontalPosition: 'right',
  verticalPosition: 'top',
  panelClass: ['snackbar-success']
});
```

### Em caso de erro:

```ts
const mensagem = pessoa.codigo ? 'Erro ao atualizar!' : 'Erro ao salvar!';
this.snackBar.open(mensagem, 'Fechar', {
  duration: 3000,
  horizontalPosition: 'right',
  verticalPosition: 'top',
  panelClass: ['snackbar-error']
});
```

---

## 7. 🎨 **Estilo do SnackBar – `styles.scss` global**

No seu `src/styles.scss`:

```scss
@use '@angular/material' as mat;

.snackbar-success {
  @include mat.snack-bar-overrides((
    container-color: #4caf50,
    button-color: white,
    supporting-text-color: white
  ));
}

.snackbar-error {
  @include mat.snack-bar-overrides((
    container-color: #f44336,
    button-color: white,
    supporting-text-color: white
  ));
}

```

---

## 8. 🧪 **Testar**

* Acesse `/pessoas` e clique no botão de lápis
* Verifique se o formulário é carregado com os dados da pessoa
* Edite, clique em **Atualizar**
* Veja a snackbar verde: `"Atualizado com sucesso!"`
* Tente com erro e veja a snackbar vermelha: `"Erro ao atualizar!"`

