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
