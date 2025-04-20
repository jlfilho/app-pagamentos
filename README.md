## ✅ Tutorial — Validações no Formulário "Nova Pessoa" e "Novo Lançamento"

### 🛠️ Tecnologias:
- Angular 19
- Angular Material
- Reactive Forms

---

## 1. 📁 Estrutura dos Componentes

Você deve ter dois componentes:
- `pessoa-cadastro.component.ts`
- `lancamento-cadastro.component.ts`

---

## 2. 👤 Formulário Nova Pessoa

### TS: `pessoa-cadastro.component.ts`

```ts
constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
     });
  }
```

### HTML: `pessoa-cadastro.component.html`

```html
<div class="form-container">
  <h2>Nova pessoa</h2>

  <form [formGroup]="form">

    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Nome</mat-label>
      <input matInput formControlName="nome" />
      @if (form.get('nome')?.hasError('required') && form.get('nome')?.touched) {
        <mat-error>
          Nome é obrigatório.
        </mat-error>
      }
      @if (form.get('nome')?.hasError('minlength') && form.get('nome')?.touched) {
        <mat-error>
          Nome deve ter no mínimo 5 letras.
        </mat-error>
      }
    </mat-form-field>

    <div class="row">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Logradouro</mat-label>
        <input matInput formControlName="logradouro" />
        @if (form.get('logradouro')?.hasError('required') && form.get('logradouro')?.touched) {
          <mat-error>
            Logradouro é obrigatório.
          </mat-error>
        }
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Número</mat-label>
        <input matInput formControlName="numero" />
        @if (form.get('numero')?.hasError('required') && form.get('numero')?.touched) {
          <mat-error>
            Número é obrigatório.
          </mat-error>
        }
      </mat-form-field>
    </div>

    <div class="row">
      <mat-form-field appearance="outline" class="campo35">
        <mat-label>Complemento</mat-label>
        <input matInput formControlName="complemento" />
      </mat-form-field>
      <mat-form-field appearance="outline" class="campo35">
        <mat-label>Bairro</mat-label>
        <input matInput formControlName="bairro" />
        @if (form.get('bairro')?.hasError('required') && form.get('bairro')?.touched) {
          <mat-error>
            Bairro é obrigatório.
          </mat-error>
        }
      </mat-form-field>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>CEP</mat-label>
        <input matInput
         type="text"
         formControlName="cep"
         mask="00.000-000"
         placeholder="00.000-000" />
         @if (form.get('cep')?.hasError('required') && form.get('cep')?.touched) {
          <mat-error>
            Cep é obrigatório.
          </mat-error>
        }
      </mat-form-field>
    </div>

    <div class="row">
      <mat-form-field appearance="outline" class="campo45">
        <mat-label>Cidade</mat-label>
        <input matInput formControlName="cidade" />
        @if (form.get('cidade')?.hasError('required') && form.get('cidade')?.touched) {
          <mat-error>
            Cidade é obrigatório.
          </mat-error>
        }
      </mat-form-field>
      <mat-form-field appearance="outline" class="campo45">
        <mat-label>Estado</mat-label>
        <input matInput formControlName="estado" />
        @if (form.get('estado')?.hasError('required') && form.get('estado')?.touched) {
          <mat-error>
            Estado é obrigatório.
          </mat-error>
        }
      </mat-form-field>
    </div>

    <div class="buttons">
      <button mat-raised-button color="primary" (click)="salvar()">Salvar</button>
      <button mat-stroked-button color="accent" (click)="novo()">Novo</button>
      <a mat-button routerLink="/pessoas">Voltar para a pesquisa</a>
    </div>
  </form>
</div>

```

---

## 3. 💰 Formulário Novo Lançamento

### TS: `lancamento-cadastro.component.ts`

```ts
constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      tipo: ['receita', Validators.required],
      vencimento: ['', Validators.required],
      recebimento: [''],
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      valor: [0, [Validators.required, Validators.min(0.01)]],
      categoria: ['', Validators.required],
      pessoa: ['', Validators.required],
      observacao: ['']
    });
  }
```

### HTML: `lancamento-cadastro.component.html`

```html
<div class="form-container">
  <h2>Novo lançamento</h2>

  <form [formGroup]="form">

    <mat-button-toggle-group class="button-toggle-group" formControlName="tipo"  name="tipo" aria-label="Tipo de lançamento">
      <mat-button-toggle value="receita">Receita</mat-button-toggle>
      <mat-button-toggle value="despesa">Despesa</mat-button-toggle>
    </mat-button-toggle-group>

    <div class="row">
      <mat-form-field appearance="outline" class="campo45">
        <mat-label>Vencimento</mat-label>
        <input matInput [matDatepicker]="vencimentoPicker" formControlName="vencimento">
        <mat-datepicker-toggle matSuffix [for]="vencimentoPicker"></mat-datepicker-toggle>
        <mat-datepicker #vencimentoPicker></mat-datepicker>
        @if (form.get('vencimento')?.hasError('required') && form.get('vencimento')?.touched) {
          <mat-error>
            O vencimento é obrigatório.
          </mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" class="campo45">
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
        @if (form.get('descricao')?.hasError('required') && form.get('descricao')?.touched) {
          <mat-error>
            A descrição é obrigatório.
          </mat-error>
        }
        @if (form.get('descricao')?.hasError('minlength') && form.get('descricao')?.touched) {
          <mat-error>
            Descrição deve ter no mínimo 10 letras.
          </mat-error>
        }
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
         @if (form.get('valor')?.hasError('required') && form.get('valor')?.touched) {
          <mat-error>
            O valor é obrigatório.
          </mat-error>
        }
        @if (form.get('valor')?.hasError('min') && form.get('valor')?.touched) {
          <mat-error>
            O valor tem que ser maior que zero.
          </mat-error>
        }
      </mat-form-field>
    </div>

    <div class="row">
      <mat-form-field appearance="outline" class="campo45">
        <mat-label>Categoria</mat-label>
        <mat-select formControlName="categoria">
          @for (categoria of categorias; track categoria;) {
            <mat-option [value]="categoria">{{ categoria }}</mat-option>
          }
        </mat-select>
        @if (form.get('categoria')?.hasError('required') && form.get('categoria')?.touched) {
          <mat-error>
            A categoria é obrigatória.
          </mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" class="campo45">
        <mat-label>Pessoa</mat-label>
        <mat-select formControlName="pessoa">
          @for (pessoa of pessoas; track pessoa;) {
            <mat-option [value]="pessoa">{{ pessoa }}</mat-option>
          }
        </mat-select>
        @if (form.get('pessoa')?.hasError('required') && form.get('pessoa')?.touched) {
          <mat-error>
            A pessoa é obrigatória.
          </mat-error>
        }
      </mat-form-field>
    </div>

    <div class="row">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Observação</mat-label>
        <textarea matInput formControlName="observacao"></textarea>
      </mat-form-field>
    </div>

    <div class="buttons">
      <button mat-raised-button color="primary" (click)="salvar()">Salvar</button>
      <button mat-stroked-button color="accent" (click)="novo()">Novo</button>
      <a mat-button routerLink="/lancamentos">Voltar para a pesquisa</a>
    </div>
  </form>
</div>

```

---

## 5. ✅ Verificação Final no Submit

No botão de salvar de `lancamento-cadastro.component.html`:

```html
<div class="buttons">
      <button mat-raised-button color="primary" (click)="salvar()" [disabled]="form.invalid">Salvar</button>
      <button mat-stroked-button color="accent" (click)="novo()">Novo</button>
      <a mat-button routerLink="/lancamentos">Voltar para a pesquisa</a>
    </div>
```

No botão de salvar de `pessoa-cadastro.component.html`:

```html
<div class="buttons">
      <button mat-raised-button color="primary" (click)="salvar()" [disabled]="form.invalid">Salvar</button>
      <button mat-stroked-button color="accent" (click)="novo()">Novo</button>
      <a mat-button routerLink="/pessoas">Voltar para a pesquisa</a>
    </div>
```

---

## 💾 Passo final: Salve no repositório GitHub

```bash
git add .
git commit -m "Validações no Formulário Nova Pessoa e Novo Lançamento"
git push -u origin main
```
