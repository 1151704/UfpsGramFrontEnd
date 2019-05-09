import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { ApiService } from 'src/app/core/api.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.css'],
  host: {
    class: 'col s12 m6 offset-m3'
  }
})
export class UsuarioEditarComponent implements OnInit {

  form: any = {};
  errorMessage = '';
  isCreateFailed = false;
  private usuario: Usuario;

  constructor(
    private token: TokenStorageService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {

    this.token.validate();

    this.apiService.usuarioService.getUsuarioCurrent().subscribe(
      data => {
        this.form.email = data.email;
        this.form.nombre = data.nombre;
        this.form.fecha = data.fechaNacimiento;
        this.usuario = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    this.errorMessage = '';
    this.isCreateFailed = false;

    this.usuario.email = this.form.email;
    this.usuario.nombre = this.form.nombre;
    this.usuario.fechaNacimiento = this.form.fecha;

    Swal.fire({
      title: 'Procesando datos',
      onBeforeOpen: () => Swal.showLoading()
    });
    const createUsuario = this.apiService.usuarioService.updateUsuario(this.usuario);

    if (createUsuario) {
      createUsuario.subscribe(
        data => {

          this.token.saveNombre(data.nombre);
          this.token.saveEmail(data.email);

          Swal.close();
          Swal.fire({
            title: 'Usuario actualizado',
            type: 'success'
          }).then((result) => {
              this.router.navigate(['/main/perfil']);
          });
        },
        error => {
          Swal.close();
          this.isCreateFailed = true;
          this.errorMessage = 'Servidor fuera de línea';
          if (error.error.message) {
            this.errorMessage = error.error.message;
          }
        }
      );
    }
  }

}
