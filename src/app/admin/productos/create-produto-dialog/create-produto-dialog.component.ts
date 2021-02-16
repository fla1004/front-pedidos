import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductoService } from '../producto.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-create-produto-dialog',
  templateUrl: './create-produto-dialog.component.html',
  styleUrls: ['./create-produto-dialog.component.css']
})
export class CreateProdutoDialogComponent implements OnInit {

  public file :File;
  public imgSelect : String | ArrayBuffer;

  id: string | undefined;
  estado: boolean = false;

  public categorias;
  public urlBase;

  productForm = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    precio_compra: new FormControl('',[Validators.required]),
    precio_venta: new FormControl('',[Validators.required]),
    stock: new FormControl('' ),
    descripcion: new FormControl(''),
    imagen: new FormControl(''),
    idCategoria : new FormControl(''),
  });

  
  constructor( private router: Router,
    private productoService: ProductoService)
      {
        this.urlBase = environment.servidor;
      }

  ngOnInit(): void {
    this.get_categoria();
  }

  get_categoria(){
     this.productoService.mostrar_categoria().subscribe(
       (res:any) =>{
        this.categorias = res.Categoria;

       }
     )
  }

  imgSelected(event: HtmlInputEvent){
    if(event.target.files  && event.target.files[0]){
        this.file = <File>event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        reader.readAsDataURL(this.file);
    }
  }

  guardarProducto(productForm) {
   
    this.productoService.guardar({
     nombre: this.productForm.value.nombre,
      precio_compra: this.productForm.value.precio_compra,
      precio_venta: this.productForm.value.precio_venta,
      stock: this.productForm.value.stock,
      descripcion: this.productForm.value.descripcion,
      imagen: this.file,
      idCategoria: this.productForm.value.idCategoria,
    }).subscribe(
      (res) => { 
        console.log("Se registro el producto",res);
          this.imgSelect = '../../../assets/img/images.png';
      },
      (error) => {
          console.log(JSON.stringify(error));
      }
    );
  }
}
