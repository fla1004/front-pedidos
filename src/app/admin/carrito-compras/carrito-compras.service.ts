import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Productos } from '../productos/productos';
import { DetalleVenta } from './../productos/catalogo/detalleventa';

@Injectable({
  providedIn: 'root'
})
export class CarritoComprasService {

  productos:Productos[] = [];

  carrito = [];
  detalle_carrito = [];

  detalle: DetalleVenta ={
    productos : this.productos,
    total: 0,
  }

  //Para gestionr los productos con las notificaciones cuando se realian acciones como borrar
  public itemsVar = new Subject<DetalleVenta>();
  public itemsVar$ = this.itemsVar.asObservable();

  constructor() { }

  initialize(){
    /**
     * Inicializar el carrito para tner la info almacenada
    */

    const storeData = JSON.parse(localStorage.getItem('cart'));

    if(storeData !== null)
    {
      this.detalle = storeData;
    }
    return this.detalle;
  }

  public updateItemsInCart(newValue: DetalleVenta){
    this.itemsVar.next(newValue);
  }
  manageProduct(productos: Productos){
    let actionUpdateOk = false;

    const det_prod = this.detalle.productos.length;

    if(det_prod === 0)
    {
      productos.cantidad = 1;
      this.detalle.productos.push(productos);
    }
    else{
      for(let  i=0; i<det_prod ; i++)
      {
        if(productos._id === this.detalle.productos[i]._id)
        {
          if(productos.cantidad === 0)
          {
            console.log("Borrando elemento");
            this.detalle.productos.splice(i,1);
          }
          else{
            this.detalle.productos[i].cantidad +=1; 
            this.detalle.productos[i] = productos;
          }
            actionUpdateOk = true;
            i = det_prod;
        }

      }
      if(!actionUpdateOk)
      {
        productos.cantidad = 1;
        this.detalle.productos.push(productos);
      }  
    }
    this.total();
    
  }
 
  total(){
    let total = 0;

    this.detalle.productos.map((productos: Productos)=>{
      total += productos.precio_venta * productos.cantidad;
    });

    this.detalle.total = total;
    this.setInfo();
    console.log("Total: ", this.detalle);
  }

  clear(){
    this.productos = [];
    this.detalle = {
      total: 0,
      productos: this.productos,
     };

    this.setInfo();
    console.log('Borrando informacion');
    
    return this.detalle;
  }

  private setInfo(){
    localStorage.setItem('cart',JSON.stringify(this.detalle));
    this.updateItemsInCart(this.detalle);
  }

  openNav(){
    document.getElementById("mySidenav").style.width = "450px";
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('app').style.overflow = 'hidden';
  }
  closeNav(){
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('app').style.overflow = 'auto';
  }

}
