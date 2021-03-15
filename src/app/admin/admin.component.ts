import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CarritoComprasService } from './carrito-compras/carrito-compras.service';
import { DatosUsuarioComponent } from './usuarios/datos-usuario/datos-usuario.component';
import { UsuarioService } from './usuarios/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  toggledValue = true;

  public id_usuario: any;
  public carrito:any;
  estado: boolean = false;

  constructor(private carritoComprasService: CarritoComprasService,
              private router: Router,
              public dialog : MatDialog,) 
  {}

  ngOnInit(): void {
    const tok = localStorage.getItem("token");
  
    if(tok)
    {
      if(this.id_usuario.rol === "Administrador")
      {
        this.estado = false;
      }
      else{ 
        this.estado = true;
      }
    }
    else
    {
      this.router.navigate([""]);
    }   
  }

  openNav(){
     this.carritoComprasService.openNav();
  }

  toggled($event){
    this.toggledValue = $event;
  }
}
