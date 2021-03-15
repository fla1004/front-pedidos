import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DetalleVenta } from '../productos/catalogo/detalleventa';
import { Productos } from '../productos/productos';
import { CarritoComprasService } from './carrito-compras.service';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {
  urlBase: String;
  
  cart : DetalleVenta;

  constructor(
    private carritoComprasService: CarritoComprasService) 
  {this.urlBase = environment.servidor; 
  this.carritoComprasService.itemsVar$.subscribe(
    (data: DetalleVenta)=>{
        if(data !== undefined && data !== null)
        {
            this.cart = data;
        }
    })}

  ngOnInit(): void {

    this.cart = this.carritoComprasService.initialize();

    console.log("Info carrito",this.cart);
  }

  clear(){
    this.carritoComprasService.clear();


    
  }
  clearItem(producto: Productos){
    producto.cantidad = 0;
    this.carritoComprasService.manageProduct(producto);
  }
  openNav(){
    this.carritoComprasService.openNav();
  }
  closeNav(){
    this.carritoComprasService.closeNav();
  }
 
}
