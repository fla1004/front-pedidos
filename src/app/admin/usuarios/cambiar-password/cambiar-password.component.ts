import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/login/usuario';
import Swal from 'sweetalert2';
import { UsuarioService } from '../usuario.service';

let user: Usuario[] = [];

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {

  id: any;
  hide = true;
  id_usuario: any;
  public user:any;

  constructor(private usuarioService: UsuarioService,
              private router:Router,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data:any) 
    {
        this.id_usuario = this.usuarioService.getIdentidad();

    }
    userForm = new FormGroup({
      nombreCompleto: new FormControl(''),
      nombre: new FormControl(''),
      apellidos: new FormControl(''),
      correo: new FormControl(''),
      password: new FormControl(''),
      estado: new FormControl(''),
      rol: new FormControl('')
    });

  ngOnInit(): void {
    this.get_datos();
  }

  get_datos(){
    let id = this.id_usuario._id;
    this.usuarioService.mostrar_id(id).subscribe(
      (res:any)=>{
        user = res;
        this.userForm = new FormGroup({
          nombreCompleto: new FormControl(res.user.nombre + " " +res.user.apellidos),
          nombre: new FormControl(res.user.nombre),
          apellidos: new FormControl(res.user.apellidos),
          correo: new FormControl(res.user.correo),
          password: new FormControl(''),
          estado: new FormControl(res.user.estado),
          rol: new FormControl(res.user.rol)
        });
        
        this.id = this.id_usuario._id;        
    },
      (error) => {
        console.log(error);
    });
  }

  modificar(){

    this.usuarioService.cambiarContra(this.id , {
         
            nombre : this.userForm.value.nombre,
            apellidos: this.userForm.value.apellidos,
            correo: this.userForm.value.correo,
            password: this.userForm.value.password,
            estado: this.userForm.value.estado,
            rol: this.userForm.value.rol

      }).subscribe(
        res => {

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Datos modificados',
            showConfirmButton: false,
            timer: 900
          })
          
          this.dialog.closeAll();

        },
        error => {
          console.log(error);
        }
      )
  }

}
