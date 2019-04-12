import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UsuarioService } from '../service/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  usuarioService: UsuarioService;

  constructor(private http: HttpClient) {
      this.usuarioService = new UsuarioService(this.http);
  }

}
