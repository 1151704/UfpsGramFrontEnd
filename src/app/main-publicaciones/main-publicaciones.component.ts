import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { Publicacion } from '../model/publicacion.model';
import * as M from "../../assets/materialize/js/materialize";
import { ApiService } from '../core/api.service';
import { ComentarioGuardar } from '../model/comentario-guardar.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-publicaciones',
  templateUrl: './main-publicaciones.component.html',
  styleUrls: ['./main-publicaciones.component.css'],
  host: {
    class: 'main'
  }
})
export class MainPublicacionesComponent implements OnInit {

  form: any = {};
  indexSeleccionado: number = -1;
  publicaciones: Publicacion[] = []

  constructor(private token: TokenStorageService, private apiService: ApiService) { }

  ngOnInit() {

    this.token.validate();
    this.getPublicaciones();

  }

  getPublicaciones() {
    this.apiService.publicacionService.misPublicaciones().subscribe(
      data => this.publicaciones = data
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
