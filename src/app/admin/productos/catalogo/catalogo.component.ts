import { coerceStringArray } from '@angular/cdk/coercion';
import { ContentObserver } from '@angular/cdk/observers';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarritoComprasService } from '../../carrito-compras/carrito-compras.service';
import { ProductoService } from '../producto.service';
import { Productos } from '../productos';
import { CatalogoService } from './catalogo.service';
import {DetalleVenta} from './detalleventa';

let productos:Productos[] = [];

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  public productos;
  urlBase: String;
  
  cart: DetalleVenta;

  signoMonetario = "Bs";

  detalle: DetalleVenta ={
    productos : productos,
    total: 0,
  }

  constructor(private productoService: ProductoService,
              private catalogoService: CatalogoService,
              private carritoService: CarritoComprasService) 
  { this.urlBase = environment.servidor; }

  ngOnInit(): void {
      this.mostrar();
  }

  mostrar(){
    this.productoService.mostrar('').subscribe(
      (datos:any) => {
        this.productos = datos;
       
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  add_carrito(productos){
    this.carritoService.manageProduct(productos);
  }
   
}
