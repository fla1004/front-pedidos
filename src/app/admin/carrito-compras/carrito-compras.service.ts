import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Productos } from '../productos/productos';
import { CarritoCompras } from './carrito-compras';


let productos:Productos[] = [];

@Injectable({
  providedIn: 'root'
})
export class CarritoComprasService {

  cart: CarritoCompras = {
    total: 0,
    subtotal:0,
    productos: productos
  };

  constructor() { }

  initialize(){
    /**
     * Inicializar el carrito para tner la info almacenada
    */

    const storeData = JSON.parse(localStorage.getItem('cart'));

    if(storeData !== null)
    {
      this.cart = storeData;
    }
    return this.cart;
  }
  manageProduct(productos: Productos){

    //Obtener cantidad de productos en el carrito
    const productTotal = this.cart.productos.length;
    productos.qty = 1;
    //Comprobamos si tenemos productos
    if(productTotal === 0){
      console.log('Añadiendo el primer producto');  
      this.cart.productos.push(productos);
    }
    else{//Si tenemos productos
      let actionUpdateOk = false;
      for(let i=0; i < productTotal; i++)
      {
        //Comprobar que el producto coincide con alguno de la lista
        if(productos._id === this.cart.productos[i]._id){
          console.log("Producto existe");
         // productos.qty += 1;

          if(productos.qty === 0){
            console.log('Borrar item seleccionado');
            this.cart.productos.splice(i,1);
            productos.qty +=1;
          }
          else{ //Actualizar con la nueva informacion
            productos.qty +=1;
            this.cart.productos[i]=productos;
          }
          actionUpdateOk = true;
          i = productTotal;
        }
      }
      if(!actionUpdateOk){
        this.cart.productos.push(productos);
      }
    }

    this.total();
  }

  total(){
    let subtotal =  0;
    let total = 0 ;
    this.cart.productos.map((productos: Productos)=>{
      total += productos.qty;
      subtotal += (productos.qty * productos.precio_venta );
    })
    this.cart.total = total;
    this.cart.subtotal = subtotal;
    console.log('calculado: ', this.cart);
    localStorage.setItem('cart',JSON.stringify(this.cart));
  }

  openNav(){
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('app').style.overflow = 'hidden';
  }
  closeNav(){
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('app').style.overflow = 'auto';
  }

}
