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
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    NgxMaskDirective],
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
          estado: this.form.value.estado,
        }
      };

      this.pessoasService.criarPessoa(pessoa).subscribe({
        next: (p) => {
          console.log('Pessoa criada com sucesso:', p);
          this.novo(); // limpa o formulário
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
