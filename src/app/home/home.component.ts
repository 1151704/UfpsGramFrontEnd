import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { JwtResponse } from '../auth/jwt-response';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private token: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.token.validate();
  }

}
