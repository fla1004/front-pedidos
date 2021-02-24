import { Component, OnInit } from '@angular/core';
import { CarritoCompras } from './carrito-compras';
import { CarritoComprasService } from './carrito-compras.service';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {

  cart : CarritoCompras;

  constructor(private carritoComprasService: CarritoComprasService) { }

  ngOnInit(): void {

    this.cart = this.carritoComprasService.initialize();

    console.log("Info carrito",this.cart);
  }

  clear(){
    this.carritoComprasService.clear();
  }
  openNav(){
    this.carritoComprasService.openNav();
  }
  closeNav(){
    this.carritoComprasService.closeNav();
  }
 
}
