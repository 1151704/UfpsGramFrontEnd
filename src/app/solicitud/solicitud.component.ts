import { Component, OnInit, Input } from '@angular/core';
import { UsuarioApi } from '../model/usuario-api.model';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  @Input() user: UsuarioApi;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }


  seguir(api: UsuarioApi) {
    this.apiService.amistadService.save(api.usuario.username).subscribe(
      data => {
        if (data) {
          api.pendiente=true
        }
      },
      error => console.log(error)
    )
  }

  aceptar(api: UsuarioApi) {
    this.apiService.amistadService.aceptar(api.usuario.username).subscribe(
      data => {
        if (data) {
          api.aceptar = false
          api.seguidor = true
        }
      },
      error => console.log(error)
    )
  }

  dejarDeSeguir(api: UsuarioApi) {
    this.apiService.amistadService.dejarDeSeguir(api.usuario.username).subscribe(
      data => {
          api.siguiendo = false
      },
      error => console.log(error)
    )
  }

}
