import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SingupComponent } from './login/singup/singup.component';
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { UsuarioEditarComponent } from './usuario/usuario-editar/usuario-editar.component';

const routes: Routes = [
  { path: 'app', component: HomeComponent, children: [
    { path : 'perfil', component: PerfilComponent},
    { path : 'perfil-update', component: UsuarioEditarComponent}
  ] },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/singup', component: SingupComponent},
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
