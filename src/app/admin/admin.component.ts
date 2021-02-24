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

  public id_usuario: any;
  public carrito:any;
  estado: boolean = false;

  constructor(private usuarioService: UsuarioService,
              private carritoComprasService: CarritoComprasService,
              private router: Router,
              public dialog : MatDialog,) 
  {
    this.id_usuario = this.usuarioService.getIdentidad();
   
  }

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

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate([""]);
  }
  nuevo(){
    
    this.dialog.open(DatosUsuarioComponent, {
        width: '400px',
    });
  
  }  
  openNav(){
     this.carritoComprasService.openNav();
  }
}
