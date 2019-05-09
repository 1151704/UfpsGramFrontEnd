import { Component, OnInit } from '@angular/core';
import * as M from "../../assets/materialize/js/materialize";

@Component({
  selector: 'app-inicio-main',
  templateUrl: './inicio-main.component.html',
  styleUrls: ['./inicio-main.component.css']
})
export class InicioMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems, {});

    // menu
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});

  }

}
