import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { UsuarioService } from '../admin/usuarios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  public id_usuario: any;

  profileForm = new FormGroup({
    correo : new FormControl('', [Validators.email, Validators.required] ),
    password : new FormControl('', [Validators.required]), 
  });

  constructor( private usuarioService: UsuarioService,
               private loginService: LoginService,
               private router: Router ) {
                 this.id_usuario = this.usuarioService.getIdentidad();
                }

  ngOnInit(): void {
  
  }
  
  ingresar(){   
    this.loginService.login(this.profileForm.value).subscribe(
      (datos:any)=>{
        if(!datos.access_token){ 
          Swal.fire({
              icon: 'error',
              title: datos.mensaje,
            })
        }
        else{
          localStorage.setItem("token",btoa(JSON.stringify(datos)));
          localStorage.setItem("usuario",JSON.stringify(datos.Usuario));
          this.router.navigate(["admin"]);

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Bienvenid@ '+ datos.Usuario.nombre,
            showConfirmButton: false,
            timer: 1000
          })

          console.log(datos);
          localStorage.setItem("token",btoa(JSON.stringify(datos)));
          this.router.navigate(["admin"]);
        }
      },
      (error:any) =>{ 
        Swal.fire({
          icon: 'error',
          title: error.mensaje,
        })
      }
    )
  }

}
