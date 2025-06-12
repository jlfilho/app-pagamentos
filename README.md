# ✅ Tutorial: Ativar/Desativar Pessoa ao Clicar no Status

Este guia mostra como tornar o campo **"Status"** da tabela interativo, permitindo alternar entre **"Ativo"** e **"Desativado"** ao clicar, com feedback visual e atualização via API.

---

## 🔧 1. Atualizar o HTML da Tabela (`pessoas-table.component.html`)

Substitua o conteúdo da célula `status` para exibir um `<span>` clicável:

```html
<ng-container matColumnDef="status">
  <th mat-header-cell *matHeaderCellDef> Status </th>
  <td mat-cell *matCellDef="let pessoa">
    <span
      class="status-badge"
      [ngClass]="pessoa.ativo ? 'ativo' : 'desativado'"
      (click)="onAlternarStatus(pessoa)">
      {{ pessoa.ativo ? 'Ativo' : 'Desativado' }}
    </span>
  </td>
</ng-container>
```

> 💡 **Dica**: Esse `<span>` vai alternar o status da pessoa diretamente com um clique.

### Importar `CommonModule` no `@Component` (Angular Standalone)

Se estiver usando `standalone components`, não se esqueça de importar:

```ts
@Component({
  selector: 'app-pessoas-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  ...
})
```

---

## 🧩 2. Adicionar Evento no Componente da Tabela (`pessoas-table.component.ts`)

Crie um evento de saída para emitir a ação de troca de status:

```ts
@Output() alternarStatus = new EventEmitter<any>();

onAlternarStatus(pessoa: any) {
  this.alternarStatus.emit(pessoa);
}
```

---

## 🧠 3. Lidar com o Evento no Componente Pai (`pessoas.component.ts`)

### a) Vincular o evento no HTML (`pessoas.component.html`):

```html
<app-pessoas-table
  [pessoas]="pessoas()"
  (excluir)="excluirPessoa($event)"
  (alternarStatus)="alterarStatusPessoa($event)">
</app-pessoas-table>
```

### b) Implementar o método `alterarStatusPessoa`:

```ts
alterarStatusPessoa(pessoa: any) {
  const novoStatus = !pessoa.ativo;
  const dadosAtualizados = { ...pessoa, ativo: novoStatus };

  this.pessoasService.atualizarPessoa(pessoa.codigo, dadosAtualizados).subscribe({
    next: () => {
      const msg = novoStatus ? 'Pessoa ativada com sucesso!' : 'Pessoa desativada com sucesso!';
      this.snackBar.open(msg, '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });
      this.pesquisar(); // Atualiza a tabela
    },
    error: () => {
      this.snackBar.open('Erro ao atualizar status da pessoa.', '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    }
  });
}
```

---

## 🎨 4. Estilo CSS para Destacar o Status Interativo

Adicione no SCSS do componente de tabela:

```scss
.status-badge {
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
}

.status-badge.ativo {
  color: green;
}

.status-badge.desativado {
  color: red;
}
```
