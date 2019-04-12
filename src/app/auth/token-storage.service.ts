import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TOKEN } from '../url.constants';
import { JwtResponse } from './jwt-response';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private storage = window.sessionStorage;

  constructor(private http: HttpClient) { }

  signOut() {
    this.storage.clear();
  }

  public isToken() {
    if (!this.getToken()) {
      this.signOut();
      return false;
    }
    return true;
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

}
