# ✅ Tutorial: Atualizando o Componente `PessoaCadastroComponent` para Salvar Pessoas no Backend

---

## 🎯 Objetivo

Atualizar o componente `PessoaCadastroComponent` para:

* Validar corretamente os campos (com base no backend);
* Chamar a API REST para salvar a pessoa via `PessoasService`;
* Aplicar máscara no campo CEP;
* Exibir mensagens de erro apropriadas no formulário.

---

## 🧩 Passo 1 – Instalar dependências (se ainda não instalou)

```bash
npm install ngx-mask
```

Importe o módulo no `main.ts`, `app.config.ts` ou `AppModule`.

---

## 🛠️ Passo 2 – Atualizar o TypeScript do componente

### 🔄 Substitua o código do `pessoa-cadastro.component.ts` antigo por este:

```ts
import { PessoasService } from './../services/pessoas.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { Pessoa } from '../models/pessoa.model';

@Component({
  selector: 'app-pessoa-cadastro',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    NgxMaskDirective
  ],
  templateUrl: './pessoa-cadastro.component.html',
  styleUrl: './pessoa-cadastro.component.scss'
})
export class PessoaCadastroComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pessoasService: PessoasService
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      logradouro: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      numero: ['', [Validators.required, Validators.maxLength(10)]],
      complemento: ['', [Validators.maxLength(255)]],
      bairro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      cep: ['', [Validators.required]],
      cidade: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      estado: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    });
  }

  salvar() {
    if (this.form.valid) {
      const pessoa: Pessoa = {
        nome: this.form.value.nome,
        ativo: true,
        endereco: {
          logradouro: this.form.value.logradouro,
          numero: this.form.value.numero,
          complemento: this.form.value.complemento,
          bairro: this.form.value.bairro,
          cep: this.form.value.cep.trim(),
          cidade: this.form.value.cidade,
          estado: this.form.value.estado
        }
      };

      this.pessoasService.criarPessoa(pessoa).subscribe({
        next: (p) => {
          console.log('Pessoa criada com sucesso:', p);
          this.novo();
        },
        error: (e) => {
          console.error('Erro ao criar pessoa:', e);
        }
      });
    }
  }

  novo() {
    this.form.reset();
  }
}
```

---

## 🎨 Passo 3 – Atualizar o HTML do formulário

### 🔄 Substitua o conteúdo de `pessoa-cadastro.component.html` pelo código abaixo:

> Inclui: validações completas, máscara de CEP, e feedbacks visuais.

```html
<div class="form-container">
  <h2>Nova pessoa</h2>

  <form [formGroup]="form">
    <!-- Nome -->
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Nome</mat-label>
      <input matInput formControlName="nome" />
      @if (form.get('nome')?.hasError('required') && form.get('nome')?.touched) {
        <mat-error>Nome é obrigatório.</mat-error>
      }
      @if (form.get('nome')?.hasError('minlength') && form.get('nome')?.touched) {
        <mat-error>Nome deve ter no mínimo 5 letras.</mat-error>
      }
    </mat-form-field>

    <!-- Logradouro e Número -->
    <div class="row">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Logradouro</mat-label>
        <input matInput formControlName="logradouro" />
        @if (form.get('logradouro')?.hasError('required') && form.get('logradouro')?.touched) {
          <mat-error>Logradouro é obrigatório.</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Número</mat-label>
        <input matInput formControlName="numero" />
        @if (form.get('numero')?.hasError('required') && form.get('numero')?.touched) {
          <mat-error>Número é obrigatório.</mat-error>
        }
      </mat-form-field>
    </div>

    <!-- Complemento, Bairro, CEP -->
    <div class="row">
      <mat-form-field appearance="outline" class="campo35">
        <mat-label>Complemento</mat-label>
        <input matInput formControlName="complemento" />
      </mat-form-field>

      <mat-form-field appearance="outline" class="campo35">
        <mat-label>Bairro</mat-label>
        <input matInput formControlName="bairro" />
        @if (form.get('bairro')?.hasError('required') && form.get('bairro')?.touched) {
          <mat-error>Bairro é obrigatório.</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>CEP</mat-label>
        <input matInput
          type="text"
          formControlName="cep"
          mask="00000-000"
          placeholder="00000-000"
          [dropSpecialCharacters]="false" />
        @if (form.get('cep')?.hasError('required') && form.get('cep')?.touched) {
          <mat-error>CEP é obrigatório.</mat-error>
        }
      </mat-form-field>
    </div>

    <!-- Cidade e Estado -->
    <div class="row">
      <mat-form-field appearance="outline" class="campo45">
        <mat-label>Cidade</mat-label>
        <input matInput formControlName="cidade" />
        @if (form.get('cidade')?.hasError('required') && form.get('cidade')?.touched) {
          <mat-error>Cidade é obrigatória.</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" class="campo45">
        <mat-label>Estado</mat-label>
        <input matInput formControlName="estado" maxlength="2" />
        @if (form.get('estado')?.hasError('required') && form.get('estado')?.touched) {
          <mat-error>Estado é obrigatório.</mat-error>
        }
        @if ((form.get('estado')?.hasError('minlength') || form.get('estado')?.hasError('maxlength')) && form.get('estado')?.touched) {
          <mat-error>O estado deve conter exatamente 2 letras (ex: AM, SP).</mat-error>
        }
      </mat-form-field>
    </div>

    <!-- Botões -->
    <div class="buttons">
      <button mat-raised-button color="primary" (click)="salvar()" [disabled]="form.invalid">Salvar</button>
      <button mat-stroked-button color="accent" (click)="novo()">Novo</button>
      <a mat-button routerLink="/pessoas">Voltar para a pesquisa</a>
    </div>
  </form>
</div>
```

---

## ✅ Pronto!

Agora o formulário:

* Valida todos os campos conforme as anotações do backend (`@NotBlank`, `@Size`, `@Pattern`);
* Aplica máscara no campo CEP e envia o valor com hífen (`dropSpecialCharacters=false`);
* Usa o serviço `PessoasService` para enviar os dados via `POST` para o backend;
* Limpa o formulário com o botão “Novo”.

