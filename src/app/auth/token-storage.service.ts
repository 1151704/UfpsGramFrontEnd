import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TOKEN, REST } from '../url.constants';
import { JwtResponse } from './jwt-response';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  valido: boolean = false;
  isLoggedIn: Observable<boolean>;
  private storage = window.sessionStorage;

  constructor(
    private authService: AuthService,
    private router: Router) {


  }

  signOut() {
    this.storage.clear();
  }

  async isToken() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.valido = await this.isLoggedIn.toPromise();

    if (!this.valido) {
      this.signOut();
    }
    return this.valido;
  }

  public saveToken(token: string) {
    this.storage.removeItem(TOKEN.TOKEN_KEY);
    this.storage.setItem(TOKEN.TOKEN_KEY, token);
  }

  public saveUsername(username: string) {
    this.storage.removeItem(TOKEN.USERNAME_KEY);
    this.storage.setItem(TOKEN.USERNAME_KEY, username);
  }

  public saveNombre(nombre: string) {
    this.storage.removeItem(TOKEN.NOMBRE_KEY);
    this.storage.setItem(TOKEN.NOMBRE_KEY, nombre);
  }

  public saveEmail(nombre: string) {
    this.storage.removeItem(TOKEN.EMAIL_KEY);
    this.storage.setItem(TOKEN.EMAIL_KEY, nombre);
  }

  public getToken(): string {
    return this.storage.getItem(TOKEN.TOKEN_KEY);
  }

  public getUsername(): string {
    return this.storage.getItem(TOKEN.USERNAME_KEY);
  }

  public getNombre(): string {
    return this.storage.getItem(TOKEN.NOMBRE_KEY);
  }

  public getEmail(): string {
    return this.storage.getItem(TOKEN.EMAIL_KEY);
  }

  public getInfo(): JwtResponse {
    return new JwtResponse(
      this.getToken(),
      "Bearer ",
      this.getNombre(),
      this.getEmail(),
      this.getUsername());
  }

  public validate() {
    this.isToken().then(data => {
      if (!data) {
        Swal.fire({
          title: 'Sesión caducada',
          type: 'info'
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['inicio/signin']);
          }
        });
      }
    });
  }

}
