import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ClientesService } from '../clientes.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-crear-modificar-cliente',
  templateUrl: './crear-modificar-cliente.component.html',
  styleUrls: ['./crear-modificar-cliente.component.css']
})
export class CrearModificarClienteComponent implements OnInit {

  clienteForm = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    apellidos: new FormControl('',[Validators.required]),
    ci: new FormControl('' ,[Validators.required]),
    email: new FormControl('',[Validators.required]),
    telefono: new FormControl(''),
  });

  id: string | undefined;
  estado: boolean = false;
  
  constructor(private clienteService: ClientesService,
    @Inject(MAT_DIALOG_DATA) public data:any){
    if(data!=null)
    {
      this.clienteForm = new FormGroup({
        nombre: new FormControl(data.nombre, [Validators.required]),
        apellidos: new FormControl(data.apellidos, [Validators.required]),
        ci: new FormControl(data.ci,[Validators.required]),
        email: new FormControl(data.email,[Validators.required]),
        telefono: new FormControl(data.telefono),
      });
      this.id = data._id;
      this.estado = true;

      console.log("ID: ", this.id);
    }}

  ngOnInit(): void {
  }
  guardar(){
    if(this.clienteForm.valid)
    {
        this.clienteService.guardar({
        nombre: this.clienteForm.value.nombre,
        apellidos: this.clienteForm.value.apellidos,
        ci: this.clienteForm.value.ci,
        email: this.clienteForm.value.email,
        telefono: this.clienteForm.value.telefono,
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
    this.clienteService.modificar(this.id, this.clienteForm.value)
      .subscribe(
        (res) => {
          console.log(res);
          console.log("funciona");
        },
        (error)=>{
          console.log(error);
        }
      )
  }

}
