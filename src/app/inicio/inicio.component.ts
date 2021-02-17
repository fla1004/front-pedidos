import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../admin/usuarios/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public id_usuario;

  constructor(
        private usuarioService: UsuarioService,
        private router: Router) {
            this.id_usuario = this.usuarioService.getIdentidad();
         }

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if(token)
    {
      this.router.navigate(["admin"]);
    }/**/
  }

}
