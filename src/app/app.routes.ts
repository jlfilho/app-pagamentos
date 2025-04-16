import { Routes } from '@angular/router';
import { LancamentosComponent } from './lancamentos/lancamentos.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'lancamentos', component: LancamentosComponent },
      { path: '', redirectTo: 'lancamentos', pathMatch: 'full' }
    ]
  }
];
