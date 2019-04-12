import { Injectable } from '@angular/core';

import { REST } from '../url.constants';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = REST +'user/';

  constructor(private http: HttpClient) { }

  getUsuarioCurrent() {
    return this.http.get<Usuario>(this.baseUrl);
  }

  createUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(this.baseUrl, usuario);
  }

  updateUsuario(usuario: Usuario) {
    return this.http.put<Usuario>(this.baseUrl, usuario);
  }

}
