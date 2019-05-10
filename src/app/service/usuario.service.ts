import { Injectable } from '@angular/core';

import { REST } from '../url.constants';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario.model';
import { UsuarioApi } from '../model/usuario-api.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = REST +'user/';

  constructor(private http: HttpClient) { }

  getUsuarioCurrent() {
    return this.http.get<Usuario>(this.baseUrl);
  }

  getUsuario(username: string) {
    return this.http.get<Usuario>(this.baseUrl+username);
  }

  searchUsuarios(filtro: string) {
    return this.http.get<UsuarioApi[]>(this.baseUrl+"users/"+filtro);
  }

  createUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(this.baseUrl, usuario);
  }

  updateUsuario(usuario: Usuario) {
    return this.http.put<Usuario>(this.baseUrl, usuario);
  }

  getSeguidores(){
    return this.http.get<UsuarioApi[]>(this.baseUrl+"seguidores");
  }

  getSiguiendo(){
    return this.http.get<UsuarioApi[]>(this.baseUrl+"siguiendo");
  }

  getTotalSeguidores(username: string){
    return this.http.get<number>(this.baseUrl+"seguidores/"+username);
  }

  getTotalSiguiendo(username: string){
    return this.http.get<number>(this.baseUrl+"siguiendo/"+username);
  }

}
