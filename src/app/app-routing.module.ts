import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioEditarComponent } from './usuario/usuario-editar/usuario-editar.component';
import { InicioComponent } from './inicio/inicio.component';
import { InicioSigninComponent } from './inicio-signin/inicio-signin.component';
import { InicioSignupComponent } from './inicio-signup/inicio-signup.component';
import { InicioMainComponent } from './inicio-main/inicio-main.component';
import { MainComponent } from './main/main.component';
import { MainPublicacionesComponent } from './main-publicaciones/main-publicaciones.component';
import { MainBuscarComponent } from './main-buscar/main-buscar.component';
import { MainSolicitudesComponent } from './main-solicitudes/main-solicitudes.component';
import { MainPerfilComponent } from './main-perfil/main-perfil.component';
import { MainUsuarioComponent } from './main-usuario/main-usuario.component';

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
    {path: 'publicaciones', component: MainPublicacionesComponent},
    {path: 'usuario/:s', component: MainUsuarioComponent}
  ]},
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
