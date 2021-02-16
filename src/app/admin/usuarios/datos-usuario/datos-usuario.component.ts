import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CambiarPasswordComponent } from '../cambiar-password/cambiar-password.component';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {

  public id_usuario: any;

  constructor(public dialog: MatDialog,
              private usuarioService: UsuarioService) 
              {
                this.id_usuario = this.usuarioService.getIdentidad();
              }


  ngOnInit(): void {
  }

  cambiar_contra(){
    
    this.dialog.open(CambiarPasswordComponent, {
      width: '380px',
    });
  }
}
