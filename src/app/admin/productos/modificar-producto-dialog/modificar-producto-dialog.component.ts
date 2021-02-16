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
  selector: 'app-modificar-producto-dialog',
  templateUrl: './modificar-producto-dialog.component.html',
  styleUrls: ['./modificar-producto-dialog.component.css']
})
export class ModificarProductoDialogComponent implements OnInit {

  public urlBase;
  public categorias;
  public file :File;
  public imgSelect : String | ArrayBuffer;

  productForm: any;
  id: string | undefined;


  constructor( private router: Router,
    private productoService: ProductoService,
    @Inject(MAT_DIALOG_DATA) public data:any)
      {
        this.urlBase = environment.servidor;

        if(data!=null)
        {
          this.productForm = new FormGroup({
            nombre: new FormControl(data.nombre, [Validators.required]),
            precio_compra: new FormControl(data.precio_compra, [Validators.required]),
            precio_venta: new FormControl(data.precio_venta, [Validators.required]),
            stock: new FormControl(data.stock),
            descripcion: new FormControl(data.descripcion),
            imagen: new FormControl(data.imagen),
            idCategoria: new FormControl(data.idCategoria),
            
          });
          this.id = data._id;
        }
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

  modificar(productForm){
    this.productoService.modificar({
      _id: this.id,
      nombre: productForm.value.nombre,
      precio_compra: productForm.value.precio_compra,
      precio_venta: productForm.value.precio_venta,
      descripcion: productForm.value.descripcion,
      stock: productForm.value.stock,
      imagen: this.file,
      idCategoria: productForm.value.idCategoria,
      img_name : productForm.value.imagen,
    }).subscribe(
      response=>{
        console.log(response);
      },
      error=>{
        
      }
    );
  }
}
