import { Component, OnInit } from '@angular/core';
import * as M from "../../assets/materialize/js/materialize";
import { PublicacionGuardar } from '../model/publicacion-guardar.model';
import { ApiService } from '../core/api.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  form: any = {};

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    var elems = document.querySelectorAll('.chips');
    var instances = M.Chips.init(elems, {limit: 5});

    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
  }

  onSubmit() {
    let chips = M.Chips.getInstance(document.getElementById("etiquetas"));
    let etiquetas = [];
    if (chips) {
      for (let e of chips.chipsData) {
        etiquetas.push(e.tag)
      }
    }
    let modal = M.Modal.getInstance(document.getElementById("modal-publicacion"));
    let publicacion = new PublicacionGuardar();
    publicacion.descripcion = this.form.descripcion;
    publicacion.etiquetas = etiquetas;

    this.apiService.publicacionService.save(publicacion).subscribe(
      data => {
        Swal.fire({
          title: 'Hecho!',
          type: 'success'
        })
        modal.close();
      }
    )
  }

}
