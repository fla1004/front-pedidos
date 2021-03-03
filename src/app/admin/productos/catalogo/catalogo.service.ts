import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  carrito = [];

  constructor() { }

  add_carrito(productos){
     
   /* let id = productos._id;

    let p = this.carrito.push(id);
    console.log("carrito: ", p);*/
  }
}
