import { HttpClient } from '@angular/common/http';
import { REST } from '../url.constants';
import { Injectable } from '@angular/core';
import { PublicacionGuardar } from '../model/publicacion-guardar.model';
import { Publicacion } from '../model/publicacion.model';
import { ComentarioGuardar } from '../model/comentario-guardar.model';
import { Comentario } from '../model/Comentario.model';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  baseUrl = REST + 'publicacion/';

  constructor(private http: HttpClient) { }

  save(publicacion: PublicacionGuardar) {
    return this.http.post<Publicacion>(this.baseUrl, publicacion)
  }

  misPublicaciones() {
    return this.http.get<Publicacion[]>(this.baseUrl)
  }

  publicaciones(username: string) {
    return this.http.get<Publicacion[]>(this.baseUrl + username)
  }

  publicacionesAmigos() {
    return this.http.get<Publicacion[]>(this.baseUrl+'amigos')
  }

  comentar(idPublicacion: number, comentario: ComentarioGuardar) {
    return this.http.post<Publicacion>(this.baseUrl + 'comentar/' + idPublicacion, comentario)
  }

}
