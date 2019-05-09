import { Injectable } from '@angular/core';
import { REST } from '../url.constants';
import { HttpClient } from '@angular/common/http';
import { Amistad } from '../model/amistad.model';
import { UsuarioApi } from '../model/usuario-api.model';

@Injectable({
  providedIn: 'root'
})
export class AmistadService {

  baseUrl = REST +'amistad/';

  constructor(private http: HttpClient) { }

  save(username: string) {
    let body: any;
    return this.http.post<Amistad>(this.baseUrl+'solicitud/'+username, body);
  }

  aceptar(username: string) {
    let body: any;
    return this.http.post<Amistad>(this.baseUrl+'aceptar/'+username, body);
  }

  dejarDeSeguir(username: string) {
    return this.http.delete(this.baseUrl+'dejarDeSeguir/'+username)
  }

  getEnviadas() {
    return this.http.get<UsuarioApi[]>(this.baseUrl+'enviadas')
  }

  getRecibidas() {
    return this.http.get<UsuarioApi[]>(this.baseUrl+'recibidas')
  }

}
