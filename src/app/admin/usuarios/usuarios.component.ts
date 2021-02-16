import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/login/usuario';
import { UsuarioService } from './usuario.service';

let usuario: Usuario[] = [];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.mostrar();
  }

  mostrar(){
    this.usuarioService.mostrar().subscribe(
      (datos:any)=>{
        usuario = datos;
        console.log(usuario);
      /*  this.dataSource = new MatTableDataSource(usuario);
        this.dataSource.paginator = this.paginator;*/
      }, 
      (error)=>{
        console.log(error)
      }
    );
}
}
