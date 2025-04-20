# 🧾 Tutorial — Formulário "Novo Lançamento" 

Este tutorial ensina como criar um formulário funcional com Angular 19 e Angular Material para lançamentos de receitas e despesas, com suporte a:

- Angular Material
- `LOCALE_ID` em `pt-BR` (datas formatadas no padrão brasileiro)
- Campo de valor com máscara de moeda (`R$`), usando `ngx-mask`

---

## 1. 🧱 Instale as dependências

```bash
npm install ngx-mask --save
```

---

## 2. 🌎 Registre o locale brasileiro no `main.ts`

```ts
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);
```

---

## 3. ⚙️ Configure o `app.config.ts`

```ts
import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter, MAT_NATIVE_DATE_FORMATS, MAT_DATE_FORMATS } from '@angular/material/core';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideAnimations(),
  provideNativeDateAdapter(),
  { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  { provide: LOCALE_ID, useValue: 'pt-BR' },
  provideNgxMask(),
  ]
};
```

---

## 4. 🧩 Componente `novo-lancamento.component.ts`

```ts
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { NgxMaskDirective } from 'ngx-mask';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatButtonToggleModule,
    NgxMaskDirective],
  templateUrl: './lancamento-cadastro.component.html',
  styleUrl: './lancamento-cadastro.component.scss'
})
export class LancamentoCadastroComponent {
  form: FormGroup;
  tipoLancamento = signal<'receita' | 'despesa'>('receita');

  categorias = ['Salário', 'Aluguel', 'Transporte'];
  pessoas = ['João', 'Maria', 'Carlos'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      vencimento: ['', Validators.required],
      recebimento: [''],
      descricao: ['', Validators.required],
      valor: [0, Validators.required],
      categoria: ['', Validators.required],
      pessoa: ['', Validators.required],
      observacao: ['']
    });
  }

  salvar() {
    if (this.form.valid) {
      console.log('Dados salvos:', this.form.value);
    }
  }

  novo() {
    this.form.reset({ valor: 0 });
    this.tipoLancamento.set('receita');
  }
}
```

---

## 5. 🖼 HTML: `novo-lancamento.component.html`

```html
<div class="form-container">
  <h2>Novo lançamento</h2>

  <mat-button-toggle-group class="button-toggle-group" [(ngModel)]="tipoLancamento" name="tipoLancamento" aria-label="Tipo de lançamento">
    <mat-button-toggle value="receita">Receita</mat-button-toggle>
    <mat-button-toggle value="despesa">Despesa</mat-button-toggle>
  </mat-button-toggle-group>

  <form [formGroup]="form">
    <div class="row">
      <mat-form-field appearance="outline">
        <mat-label>Vencimento</mat-label>
        <input matInput [matDatepicker]="vencimentoPicker" formControlName="vencimento">
        <mat-datepicker-toggle matSuffix [for]="vencimentoPicker"></mat-datepicker-toggle>
        <mat-datepicker #vencimentoPicker></mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Recebimento</mat-label>
        <input matInput [matDatepicker]="recebimentoPicker" formControlName="recebimento">
        <mat-datepicker-toggle matSuffix [for]="recebimentoPicker"></mat-datepicker-toggle>
        <mat-datepicker #recebimentoPicker></mat-datepicker>
      </mat-form-field>
    </div>

    <div class="row">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Descrição</mat-label>
        <input matInput formControlName="descricao">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Valor</mat-label>
        <input matInput
         formControlName="valor"
         type="text"
         mask="separator.2"
         thousandSeparator="."
         decimalMarker=","
         prefix="R$ " />
      </mat-form-field>
    </div>

    <div class="row">
      <mat-form-field appearance="outline">
        <mat-label>Categoria</mat-label>
        <mat-select formControlName="categoria">
          @for (categoria of categorias; track categoria;) {
            <mat-option [value]="categoria">{{ categoria }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Pessoa</mat-label>
        <mat-select formControlName="pessoa">
          @for (pessoa of pessoas; track pessoa;) {
            <mat-option [value]="pessoa">{{ pessoa }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
    </div>

    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Observação</mat-label>
      <textarea matInput formControlName="observacao"></textarea>
    </mat-form-field>

    <div class="buttons">
      <button mat-raised-button color="primary" (click)="salvar()">Salvar</button>
      <button mat-stroked-button color="accent" (click)="novo()">Novo</button>
      <a mat-button routerLink="/lancamentos">Voltar para a pesquisa</a>
    </div>
  </form>
</div>
```

---

## 6. 🎨 CSS: `novo-lancamento.component.scss`

```scss
.form-container {
  max-width: 800px;
  margin: auto;

  .button-toggle-group {
    margin-bottom: 16px;
  }

  .row {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
  }

  .full-width {
    flex: 1;
  }

  .buttons {
    display: flex;
    gap: 16px;
    margin-top: 16px;
  }
}
```

---

## 7. Adicione o routerLink no `src\app\lancamentos\lancamentos.component.html`

```html

<div class="container">
  <button mat-raised-button color="primary" routerLink="/novo-lancamentos">Novo lançamento</button>
</div>
```

---

## ✅ Pronto!

Seu formulário "Novo lançamento" está agora com:
- Material Design
- Máscara de moeda (R$)
- Datas no padrão brasileiro (com `pt-BR`)

---

## 🖍️ Passo 7: Salve no repositório Github

```sh
git add .
git commit -m "Formulário Novo Lançamento"
git push -u origin main
```
