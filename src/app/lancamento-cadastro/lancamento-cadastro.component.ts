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

  categorias = ['Salário', 'Aluguel', 'Transporte'];
  pessoas = ['João', 'Maria', 'Carlos'];

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

  salvar() {
    if (this.form.valid) {
      console.log('Dados salvos:', this.form.value);
    }
  }

  novo() {
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.reset({ tipo: 'receita', valor: 0 });
  }
}
