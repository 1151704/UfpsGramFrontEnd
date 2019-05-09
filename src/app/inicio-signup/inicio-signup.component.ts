import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { Usuario } from '../model/usuario.model';
import { ApiService } from '../core/api.service';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-signup',
  templateUrl: './inicio-signup.component.html',
  styleUrls: ['./inicio-signup.component.css']
})
export class InicioSignupComponent implements OnInit {

  form: any = {};
  errorMessage = '';
  isCreateFailed = false;
  private usuario: Usuario;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit() {

    this.authService.isLoggedIn().subscribe(data => {
      if (data) {
        this.router.navigate(['/main/publicaciones']);
      }
    })

  }

  onSubmit() {
    this.errorMessage = '';
    this.isCreateFailed = false;

    console.log(this.form);

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
              this.router.navigate(['/inicio/signin']);
            }
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
