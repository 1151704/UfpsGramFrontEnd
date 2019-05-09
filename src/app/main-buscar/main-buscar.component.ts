import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';

import Swal from 'sweetalert2';
import { UsuarioApi } from '../model/usuario-api.model';
import { Usuario } from '../model/usuario.model';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-main-buscar',
  templateUrl: './main-buscar.component.html',
  styleUrls: ['./main-buscar.component.css'],
  host: {
    class: 'main'
  }
})
export class MainBuscarComponent implements OnInit {

  filtrado: string;
  usuarios: UsuarioApi[] = []

  constructor(private apiService: ApiService,
    private token: TokenStorageService) { }

  ngOnInit() {
    this.token.validate();
  }

  efectuarBusqueda(f:string) {
    this.filtrado = f;
    this.usuarios = []

    if (this.filtrado && this.filtrado.length >2) {

    this.apiService.usuarioService.searchUsuarios(this.filtrado).subscribe(
      data => {
        this.usuarios = data;
        console.table(this.usuarios);
      },
      error => {
        Swal.fire({
          title: 'Error al buscar los usuarios',
          type: 'error'
        })
      }
    )
    } else {
      Swal.fire({
        title: 'Mínimo un filtrado de 3 caracteres',
        type: 'error'
      })
    }
  }

}
