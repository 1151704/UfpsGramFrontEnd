import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SingupComponent } from './login/singup/singup.component';
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { UsuarioEditarComponent } from './usuario/usuario-editar/usuario-editar.component';
import { BuscarComponent } from './usuario/buscar/buscar.component';
import { InicioComponent } from './inicio/inicio.component';
import { InicioSigninComponent } from './inicio-signin/inicio-signin.component';
import { InicioSignupComponent } from './inicio-signup/inicio-signup.component';
import { InicioMainComponent } from './inicio-main/inicio-main.component';
import { MainComponent } from './main/main.component';
import { MainPublicacionesComponent } from './main-publicaciones/main-publicaciones.component';
import { MainBuscarComponent } from './main-buscar/main-buscar.component';
import { MainSolicitudesComponent } from './main-solicitudes/main-solicitudes.component';
import { MainPerfilComponent } from './main-perfil/main-perfil.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent, children:[
    {path: '', component: InicioMainComponent},
    {path: 'signin', component: InicioSigninComponent},
    {path: 'signup', component: InicioSignupComponent}
  ]},
  { path: 'main', component: MainComponent, children:[
    {path: 'buscar', component: MainBuscarComponent},
    {path: 'solicitudes', component: MainSolicitudesComponent},
    {path: 'perfil', component: MainPerfilComponent},
    {path: 'publicaciones', component: MainPublicacionesComponent}
  ]},
  { path: 'app', component: HomeComponent, children: [
    { path : 'perfil', component: PerfilComponent},
    { path : 'perfil-update', component: UsuarioEditarComponent},
    { path : 'buscar/:s', component: BuscarComponent}
  ] },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/singup', component: SingupComponent},
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
