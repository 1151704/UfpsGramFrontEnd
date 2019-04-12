import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  info: any = {};
  constructor( private token: TokenStorageService) { }

  ngOnInit() {
    this.token.validate();
    this.info = this.token.getInfo();
  }

}
