# 🧾 Tutorial: Implementação de Diálogo de Confirmação com Angular Material para Exclusão de Pessoa

Este tutorial mostra como criar um **componente de diálogo de confirmação reutilizável** com Angular Material e integrá-lo ao fluxo de exclusão de pessoas no seu projeto.

---

## ✅ 1. Gerar o Componente de Confirmação

Execute o comando abaixo no terminal:

```bash
ng generate component confirmacao-dialog
```

---

## ✅ 2. Criar o Componente de Diálogo

### `confirmacao-dialog.component.ts`

```ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './confirmacao-dialog.component.html',
  styleUrl: './confirmacao-dialog.component.scss',
})
export class ConfirmacaoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmacaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensagem: string }
  ) {}
}
```

> **Dica:** Se estiver usando Angular com `standalone components`, a propriedade `standalone: true` e o array `imports` são obrigatórios.

---

### `confirmacao-dialog.component.html`

```html
<h2 mat-dialog-title>Confirmação</h2>

<mat-dialog-content>
  {{ data.mensagem }}
</mat-dialog-content>

<mat-dialog-actions align="end">
  <button mat-button (click)="dialogRef.close(false)">Cancelar</button>
  <button mat-button color="warn" (click)="dialogRef.close(true)">Confirmar</button>
</mat-dialog-actions>
```

---

## ✅ 3. Usar o Diálogo no Componente Pai (`pessoas.component.ts`)

### a) Importações

```ts
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacaoDialogComponent } from '../../shared/components/confirmacao-dialog/confirmacao-dialog.component';
```

### b) Injeção via `inject()`

```ts
dialog = inject(MatDialog);
```

> Alternativamente, no construtor:
>
> ```ts
> constructor(private dialog: MatDialog) {}
> ```

### c) Atualize o método `excluirPessoa()`

```ts
excluirPessoa(codigo: number) {
  const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
    width: '350px',
    data: { mensagem: 'Deseja realmente excluir esta pessoa?' }
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      this.pessoasService.deletarPessoa(codigo).subscribe({
        next: () => {
          this.snackBar.open('Pessoa excluída com sucesso!', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
          this.pesquisar();
        },
        error: (e) => {
          this.snackBar.open(`${e.error.error}!`, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  });
}
```

