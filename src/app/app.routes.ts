import { Routes } from '@angular/router';
import { LancamentosComponent } from './lancamentos/lancamentos.component';
import { LayoutComponent } from './layout/layout.component';
import { PessoasComponent } from './pessoas/pessoas/pessoas.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
      { path: 'pessoas', component: PessoasComponent },
      { path: 'lancamentos', component: LancamentosComponent },
      { path: 'novo-lancamento', component: LancamentoCadastroComponent },
      { path: 'nova-pessoa', component: PessoaCadastroComponent },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

