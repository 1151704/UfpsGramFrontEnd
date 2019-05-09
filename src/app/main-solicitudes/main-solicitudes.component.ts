import { Component, OnInit } from '@angular/core';
import * as M from "../../assets/materialize/js/materialize";
import { ApiService } from '../core/api.service';
import { UsuarioApi } from '../model/usuario-api.model';

@Component({
  selector: 'app-main-solicitudes',
  templateUrl: './main-solicitudes.component.html',
  styleUrls: ['./main-solicitudes.component.css'],
  host: {
    class: "main"
  }
})
export class MainSolicitudesComponent implements OnInit {

  enviadas: UsuarioApi[] = []
  recibidas: UsuarioApi[] = []

  constructor(private apiService: ApiService) { }

  ngOnInit() {

    var elems = document.querySelector('#tab');
    var instance = M.Tabs.init(elems, {});

    this.getEnviadas();
    this.getRecibidas();

  }

  getEnviadas() {
    this.apiService.amistadService.getEnviadas().subscribe(
      data => this.enviadas = data,
      error => console.log(error)
    )
  }

  getRecibidas() {
    this.apiService.amistadService.getRecibidas().subscribe(
      data => this.recibidas = data,
      error => console.log(error)
    )
  }

}
