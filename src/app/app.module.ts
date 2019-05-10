import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';

import { TokenInterceptor } from "./core/interceptor";
import { ApiService } from './core/api.service';

import { AppComponent } from './app.component';

import { UsuarioEditarComponent } from './usuario/usuario-editar/usuario-editar.component';
import { InicioComponent } from './inicio/inicio.component';
import { InicioSignupComponent } from './inicio-signup/inicio-signup.component';
import { InicioSigninComponent } from './inicio-signin/inicio-signin.component';
import { InicioFooterComponent } from './inicio-footer/inicio-footer.component';
import { InicioHeaderComponent } from './inicio-header/inicio-header.component';
import { InicioMainComponent } from './inicio-main/inicio-main.component';
import { MainComponent } from './main/main.component';
import { MainPublicacionesComponent } from './main-publicaciones/main-publicaciones.component';
import { MainSolicitudesComponent } from './main-solicitudes/main-solicitudes.component';
import { MainBuscarComponent } from './main-buscar/main-buscar.component';
import { MainPerfilComponent } from './main-perfil/main-perfil.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { MainUsuarioComponent } from './main-usuario/main-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioEditarComponent,
    InicioComponent,
    InicioSignupComponent,
    InicioSigninComponent,
    InicioFooterComponent,
    InicioHeaderComponent,
    InicioMainComponent,
    MainComponent,
    MainPublicacionesComponent,
    MainSolicitudesComponent,
    MainBuscarComponent,
    MainPerfilComponent,
    MainFooterComponent,
    SolicitudComponent,
    MainUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [ApiService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
