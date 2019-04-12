import { Component, OnInit } from '@angular/core';
import { AuthLoginInfo } from '../auth/login-info';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  private loginInfo: AuthLoginInfo;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn = false;
    this.authService.isLoggedIn().subscribe(data => {
      if (data) {
        this.isLoggedIn = true;
        this.router.navigate(['/app']);
      }
    })
  }

  onSubmit() {
    this.errorMessage = '';
    this.isLoginFailed = false;
    this.loginInfo = new AuthLoginInfo(this.form.username, this.form.password);
    Swal.fire({
      title: 'Procesando datos',
      onBeforeOpen: () => Swal.showLoading()
    });
    const attemptAuth = this.authService.attemptAuth(this.loginInfo);

    if (attemptAuth) {
      attemptAuth.subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveEmail(data.email);
          this.tokenStorage.saveNombre(data.nombre);

          this.isLoginFailed = false;
          this.isLoggedIn = true;

          this.authService.isLoggedIn();

          this.router.navigate(['/app']);
          Swal.close();
        },
        error => {
          this.errorMessage = 'Servidor fuera de línea';
          if (error.error.message) {
            this.errorMessage = error.error.message;
          }
          this.isLoginFailed = true;
          Swal.close();
        }
      );
    }
  }
}
