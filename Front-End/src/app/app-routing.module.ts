import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './paginas/cadastrar/cadastrar.component';
import { CategoriasComponent } from './paginas/categorias/categorias.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { EconomiasComponent } from './paginas/economias/economias.component';
import { LoginComponent } from './paginas/login/login.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { TransacoesComponent } from './paginas/transacoes/transacoes.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'cadastrar', component: CadastrarComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'transacoes', component: TransacoesComponent},
  {path: 'economias', component: EconomiasComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'perfil', component: PerfilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }