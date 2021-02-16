import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';

let categoria: Categoria[] = [];

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})

export class CategoriasComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Descripcion', 'Editar', 'Eliminar'];
  dataSource = new MatTableDataSource(categoria);
  id: string | undefined;
  estado: boolean = false;
   
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private categoriatoService: CategoriaService,
              private router: Router ){}

  productForm = new FormGroup({
    titulo: new FormControl('',[Validators.required]),
    descripcion: new FormControl(''),
  });

  ngOnInit(): void {
    const tok = localStorage.getItem("token");
  
    if(tok)
    {
      this.mostrar();
    }
    else
    {
      this.router.navigate([""]);
    }   
  }

  mostrar(){
    this.categoriatoService.mostrar_prod().subscribe(
      (datos:any) => {
        categoria = datos;
        this.dataSource = new MatTableDataSource(categoria);
        this.dataSource.paginator = this.paginator;
        console.log(categoria);
      },
      (error)=>{
        console.log(error);
      }
      );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  nuevo(){
    this.estado = false;
   
    this.productForm = new FormGroup({
      titulo: new FormControl(''),
      descripcion: new FormControl(''),
    });

  }

  guardar(){

    if(this.productForm.valid)
    {
      this.categoriatoService.guardar({
        titulo: this.productForm.value.titulo,
        descripcion: this.productForm.value.descripcion,
      }).subscribe(
        (datos:any) => {
          this.mostrar();
        },
        (error)=>{
          console.log(error);
        }
      );
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Revise los datos!',
      })
    }
  }
  mod_datos(data:any){

    if(data == null)
    {
      console.log("NADA");
    }else{
      console.log("Datos: "+ JSON.stringify(data));

      this.productForm = new FormGroup({
        titulo: new FormControl(data.titulo, [Validators.required]),
        descripcion: new FormControl(data.descripcion),
      });
      this.id = data._id;
      this.estado = true;
    } 
  }
  modificar(){
    
    this.categoriatoService.modificar(this.id, this.productForm.value).subscribe(
      res => {
        console.log(res);

        this.productForm = new FormGroup({
          titulo: new FormControl(''),
          descripcion: new FormControl(''),
        });
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Datos modificados',
          showConfirmButton: false,
          timer: 500
        })
        
        this.mostrar();
      },
      error => {
        console.log(error);
      }
    )
  }
  eliminar(id:any){

    Swal.fire({
      title: '¿Esta seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar'    
    }).then((result) => {
      if (result.isConfirmed) {

        this.categoriatoService.eliminar(id).subscribe(res => {
          console.log(res);
          this.mostrar();
        }, error => {
          console.log(error);
        });

        Swal.fire(
          '¡Eliminado!',
          'Categoria eliminada exitosamente',
          'success'
        )
      }
    })
  }
}
