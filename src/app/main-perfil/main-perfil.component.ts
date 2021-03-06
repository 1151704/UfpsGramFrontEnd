import { Component, OnInit } from '@angular/core';
import * as M from "../../assets/materialize/js/materialize";
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';
import { ApiService } from '../core/api.service';
import { UsuarioApi } from '../model/usuario-api.model';
import { Publicacion } from '../model/publicacion.model';
import { ComentarioGuardar } from '../model/comentario-guardar.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-perfil',
  templateUrl: './main-perfil.component.html',
  styleUrls: ['./main-perfil.component.css'],
  host: {
    class: 'main'
  }
})
export class MainPerfilComponent implements OnInit {

  router: Router;
  info: any = {};

  form: any = {};
  indexSeleccionado: number = -1;
  publicaciones: Publicacion[] = []

  seguidores: UsuarioApi[] = []
  siguiendo: UsuarioApi[] = []

  constructor(
    private token: TokenStorageService,
    private _router: Router,
    private apiService: ApiService
  ) {
    this.router = this._router;
  }

  ngOnInit() {

    this.token.validate();
    this.info = this.token.getInfo();
    this.getPublicaciones();

    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {alignment: 'right', coverTrigger: false, constrainWidth: false});

    // modal
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});

    this.cargarSeguidores()
    this.cargarSiguiendo()
  }

  getPublicaciones() {
    this.apiService.publicacionService.misPublicaciones().subscribe(
      data => this.publicaciones = data
    )
  }

  cargarSeguidores() {
    this.apiService.usuarioService.getSeguidores().subscribe(
      data => this.seguidores = data,
      error => console.log(error)
    )
  }
  cargarSiguiendo() {
    this.apiService.usuarioService.getSiguiendo().subscribe(
      data => this.siguiendo = data,
      error => console.log(error)
    )
  }

  logout() {
    this.token.signOut();
    this.router.navigate(['/inicio/']);
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
          this.form ={}
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
