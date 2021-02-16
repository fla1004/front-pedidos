import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UsuarioService } from '../usuario.service';
import { Rol } from './rol';
import { UsuarioEstado } from './usuarioEstado';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-create-usuario-dialog',
  templateUrl: './create-usuario-dialog.component.html',
  styleUrls: ['./create-usuario-dialog.component.css']
})
export class CreateUsuarioDialogComponent implements OnInit {

  roles: Rol[] = [
    {value: 'Empleado', viewValue: 'Empleado'},
    {value: 'Administrador', viewValue: 'Administrador'}
  ];

  estados: UsuarioEstado[] = [
    {value: true, viewValue: 'Habilitado'},
    {value: false, viewValue: 'Inhabilitado'}
  ];

  usuarioForm = new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      apellidos: new FormControl('',[Validators.required]),
      correo: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      rol: new FormControl('',[Validators.required]),
      estado: new FormControl('',[Validators.required]),
    });

    id: string | undefined;
    estado: boolean = false;  


  constructor(private usuarioService : UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data:any){
        if(data!=null)
        {
          this.usuarioForm = new FormGroup({
            nombre: new FormControl(data.nombre,[Validators.required]),
            apellidos: new FormControl(data.apellidos,[Validators.required]),
            correo: new FormControl(data.correo,[Validators.required]),
            password: new FormControl(data.password,[Validators.required]),
            rol: new FormControl(data.rol,[Validators.required]),
            estado: new FormControl(data.estado,[Validators.required]),
          });
          this.id = data._id;
          this.estado = true;
        }
    }

  ngOnInit(): void {
  }

  guardar(){
    if(this.usuarioForm.valid)
    {
        this.usuarioService.guardar({
            nombre: this.usuarioForm.value.nombre,
            apellidos: this.usuarioForm.value.apellidos,
            correo: this.usuarioForm.value.correo,
            password: this.usuarioForm.value.password,
            rol: this.usuarioForm.value.rol,
            estado: this.usuarioForm.value.estado,
      }).subscribe(
        (res)=>{
            console.log("Datos guardados");
        },
        (error)=>{
          console.log("Error guardando al cliente",JSON.stringify(error));
        }
      )
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Revise los datos!',
      })
    }
  }

  modificar(){
    this.usuarioService.modificar(this.id, this.usuarioForm.value)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error)=>{
          console.log(error);
        }
      )
  }

}
