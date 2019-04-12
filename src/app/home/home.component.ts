import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { JwtResponse } from '../auth/jwt-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  info : JwtResponse;

  constructor(
    private token: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.info = this.token.getInfo();

    if (!this.info.accessToken) {

      Swal.fire({
        title: 'Sesión caducada',
        type: 'info'
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['auth/login']);
        }
      });

    }
  }

}
