import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public id_usuario: any;
  estado: boolean = false;

  constructor() 
  {
    //this.id_usuario = this.usuarioService.getIdentidad();
  }

  ngOnInit(): void {
  }

}
