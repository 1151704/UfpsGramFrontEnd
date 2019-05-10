import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UsuarioService } from '../service/usuario.service';
import { AmistadService } from '../service/amistad.service';
import { PublicacionService } from '../service/publicacion.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  usuarioService: UsuarioService;
  amistadService: AmistadService;
  publicacionService: PublicacionService;

  constructor(private http: HttpClient) {
      this.usuarioService = new UsuarioService(this.http);
      this.amistadService = new AmistadService(this.http);
      this.publicacionService = new PublicacionService(this.http);
  }

}
