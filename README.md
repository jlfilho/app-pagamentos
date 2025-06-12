
# Tutorial: Implementação de Exclusão de Pessoas 

Este tutorial mostra como implementar a exclusão de registros de pessoas utilizando um componente de tabela separado, `MatSnackBar` para feedback, e `EventEmitter` para comunicação com o componente pai.

---

## ✅ 1. Componente de Tabela (`pessoas-table.component.ts`)

### a) Configure `@Input` e `@Output`:

```ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pessoas-table',
  templateUrl: './pessoas-table.component.html',
})
export class PessoasTableComponent {
  @Input() pessoas: any[] = [];
  @Output() excluir = new EventEmitter<number>();

  colunas: string[] = ['nome', 'cidade', 'estado', 'status', 'acoes'];

  onExcluir(pessoaId: number) {
    this.excluir.emit(pessoaId);
  }
}
```

### b) Atualize o HTML da tabela (`pessoas-table.component.html`):

```html
<button mat-icon-button
        color="warn"
        matTooltip="Excluir"
        matTooltipPosition="above"
        (click)="onExcluir(pessoa.codigo)">
  <mat-icon>delete</mat-icon>
</button>
```

---

## ✅ 2. Componente Pai (`pessoas.component.ts`)

### a) No HTML (`pessoas.component.html`), vincule o evento `excluir`:

```html
<app-pessoas-table
  [pessoas]="pessoas()"
  (excluir)="excluirPessoa($event)">
</app-pessoas-table>
```

### b) Implemente o método `excluirPessoa()` no TypeScript:

```ts
excluirPessoa(codigo: number) {
  if (confirm('Deseja realmente excluir esta pessoa?')) {
    this.pessoasService.deletarPessoa(codigo).subscribe({
      next: () => {
        this.snackBar.open('Pessoa excluída com sucesso!', '', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.pesquisar(); // recarrega a lista
      },
      error: (e) => {
        this.snackBar.open(e.error.error, '', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}
```

---

## ✅ 3. Feedback com `MatSnackBar`

### a) Importe o serviço:

```ts
import { MatSnackBar } from '@angular/material/snack-bar';
```

### b) Injete com `inject()` (Angular >= 14):

```ts
snackBar = inject(MatSnackBar);
```

---

## ✅ 4. (Opcional) Adicionar o botão no HTML diretamente, se necessário

Se a tabela não estiver isolada e quiser usar diretamente:

```html
<button mat-icon-button
        color="warn"
        matTooltip="Excluir"
        matTooltipPosition="above"
        (click)="excluirPessoa(pessoa.codigo)">
  <mat-icon>delete</mat-icon>
</button>
```
