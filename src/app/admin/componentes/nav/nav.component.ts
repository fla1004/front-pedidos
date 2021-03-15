import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsuarioService } from '../../usuarios/usuario.service';
import { DatosUsuarioComponent } from './../../usuarios/datos-usuario/datos-usuario.component';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  toggledValue = true;
  @Output() toggleChange = new EventEmitter<boolean>();

  
  public id_usuario: any;

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              public dialog : MatDialog) { 
    this.id_usuario = this.usuarioService.getIdentidad();
  }

  ngOnInit(): void {
  }

  toggled(){
    if(this.toggledValue === undefined)
    {
      this.toggledValue = true;
    }
    this.toggledValue = !this.toggledValue;
    this.toggleChange.emit(this.toggledValue);
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate([""]);
  }

  nuevo(){
    this.dialog.open(DatosUsuarioComponent, {
        width: '400px',});
  } 

}
