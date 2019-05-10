import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as M from "../../assets/materialize/js/materialize";
import { Publicacion } from '../model/publicacion.model';
import { TokenStorageService } from '../auth/token-storage.service';
import { ApiService } from '../core/api.service';
import { ComentarioGuardar } from '../model/comentario-guardar.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-usuario',
  templateUrl: './main-usuario.component.html',
  styleUrls: ['./main-usuario.component.css'],
  host: {
    class: 'main'
  }
})
export class MainUsuarioComponent implements OnInit {

  router: Router;
  info: any;
  infoActual: any;
  valido: boolean = false;

  username: string

  form: any = {};
  indexSeleccionado: number = -1;
  publicaciones: Publicacion[] = []

  seguidores: number
  siguiendo: number

  constructor(
    private rutaActiva: ActivatedRoute,
    private token: TokenStorageService,
    private _router: Router,
    private apiService: ApiService
  ) {
    this.router = this._router;
  }

  ngOnInit() {
    this.username = this.rutaActiva.snapshot.params.s;
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.username = params.s;
        this.cargarUsuario();
      }
    );
    this.token.validate();

    this.infoActual = this.token.getInfo();

    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, { alignment: 'right', coverTrigger: false, constrainWidth: false });

    // modal
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
    this.cargarUsuario();
  }

  logout() {
    this.token.signOut();
    this.router.navigate(['/inicio/']);
  }

  cargarUsuario() {

    this.info = {};
    this.apiService.usuarioService.getUsuario(this.username).subscribe(
      data => {
        if (data) {
          this.info = data;
          if (this.info.username == this.infoActual.username) {
            this.router.navigate(['/main/perfil'])
          } else {

            this.getPublicaciones()
            this.cargarSeguidores()
            this.cargarSiguiendo()
            this.valido = true
          }

        }
      }
    );
  }

  getPublicaciones() {
    this.apiService.publicacionService.publicaciones(this.username).subscribe(
      data => this.publicaciones = data
    )
  }

  cargarSeguidores() {
    this.apiService.usuarioService.getTotalSeguidores(this.username).subscribe(
      data => this.seguidores = data,
      error => console.log(error)
    )
  }
  cargarSiguiendo() {
    this.apiService.usuarioService.getTotalSiguiendo(this.username).subscribe(
      data => this.siguiendo = data,
      error => console.log(error)
    )
  }
  addComentario() {
    if (this.indexSeleccionado >= 0 && this.indexSeleccionado < this.publicaciones.length) {
      let modal = M.Modal.getInstance(document.getElementById("modal-comentario"));
      let comentario = new ComentarioGuardar();
      comentario.comentario = this.form.descripcion;

      this.apiService.publicacionService.comentar(this.publicaciones[this.indexSeleccionado].id, comentario).subscribe(
        data => {
          Swal.fire({
            title: 'Hecho!',
            type: 'success'
          })
          this.publicaciones[this.indexSeleccionado] = data;
          modal.close();
          this.form = {}
        }
      )
    } else {
      Swal.fire({
        title: 'Seleccione una publicación!',
        type: 'error'
      })
    }
  }

}
