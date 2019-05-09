import { Component, OnInit } from '@angular/core';
import * as M from "../../assets/materialize/js/materialize";
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../core/api.service';
import { UsuarioApi } from '../model/usuario-api.model';

@Component({
  selector: 'app-main-perfil',
  templateUrl: './main-perfil.component.html',
  styleUrls: ['./main-perfil.component.css'],
  host: {
    class: 'main'
  }
})
export class MainPerfilComponent implements OnInit {

  router: Router;
  info: any = {};

  seguidores: UsuarioApi[] = []
  siguiendo: UsuarioApi[] = []

  constructor(
    private token: TokenStorageService,
    private _router: Router,
    private apiService: ApiService
  ) {
    this.router = this._router;
  }

  ngOnInit() {

    this.token.validate();
    this.info = this.token.getInfo();

    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {alignment: 'right', coverTrigger: false, constrainWidth: false});

    // modal
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});

    this.cargarSeguidores()
    this.cargarSiguiendo()
  }

  cargarSeguidores() {
    this.apiService.usuarioService.getSeguidores().subscribe(
      data => this.seguidores = data,
      error => console.log(error)
    )
  }
  cargarSiguiendo() {
    this.apiService.usuarioService.getSiguiendo().subscribe(
      data => this.siguiendo = data,
      error => console.log(error)
    )
  }

  logout() {
    this.token.signOut();
    this.router.navigate(['/inicio/']);
  }

}
