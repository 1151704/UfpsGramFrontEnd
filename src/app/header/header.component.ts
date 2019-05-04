import { Component, OnInit } from '@angular/core';
import { JwtResponse } from '../auth/jwt-response';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  info: JwtResponse;
  title: string = 'Ufpsgram';
  isLoggedIn: Observable<boolean>;
  router: Router;

  constructor(
    private token: TokenStorageService,
    private _router: Router,
    private authService: AuthService
  ) {
    this.router = this._router;
  }

  ngOnInit() {
    this.info = this.token.getInfo();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.token.signOut();
    this.router.navigate(['/auth/login']);
  }

  searchUser(value: string) {
    this.router.navigate(['/app/buscar/'+value]);
  }

}
