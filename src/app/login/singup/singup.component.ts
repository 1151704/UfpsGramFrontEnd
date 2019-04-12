import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

import { ApiService } from 'src/app/core/api.service';
import { Usuario } from 'src/app/model/usuario.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  form: any = {};
  errorMessage = '';
  isCreateFailed = false;
  private usuario: Usuario;

  constructor(
    private apiService: ApiService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.tokenStorage.isToken()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    this.errorMessage = '';
    this.isCreateFailed = false;

    this.usuario = new Usuario(0, this.form.nombre, this.form.email, this.form.username,
      this.form.password, this.form.fecha);

    Swal.fire({
      title: 'Procesando datos',
      onBeforeOpen: () => Swal.showLoading()
    });
    const createUsuario = this.apiService.usuarioService.createUsuario(this.usuario);

    if (createUsuario) {
      createUsuario.subscribe(
        data => {
          Swal.close();
          Swal.fire({
            title: 'Usuario registrado',
            type: 'success'
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['/auth/login']);
            }
          });
        },
        error => {
          Swal.close();
          this.isCreateFailed = true;
          this.errorMessage = 'Servidor fuera de línea';
          if(error.error.message) {
            this.errorMessage = error.error.message;
          }
        }
      );
    }
  }

}
