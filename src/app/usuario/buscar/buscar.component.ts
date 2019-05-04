import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { ApiService } from 'src/app/core/api.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  filtro: string
  usuarios: Usuario[] = []

  constructor(private rutaActiva: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.filtro = this.rutaActiva.snapshot.params.s;
    this.efectuarBusqueda();
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.filtro = params.s;
        this.efectuarBusqueda();
      }
    );
  }

  efectuarBusqueda() {
    this.usuarios = []

    this.apiService.usuarioService.searchUsuarios(this.filtro).subscribe(
      data => {
        this.usuarios = data;
      },
      error => {
        Swal.fire({
          title: 'Error al buscar los usuarios',
          type: 'error'
        })
      }
    )
  }

}
