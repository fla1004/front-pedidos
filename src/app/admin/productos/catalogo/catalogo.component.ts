import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarritoComprasService } from '../../carrito-compras/carrito-compras.service';
import { ProductoService } from '../producto.service';
import { CatalogoService } from './catalogo.service';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  public productos;
  urlBase: String;
  carrito = [];
  signoMonetario = "Bs";

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
        

        console.log("Productos: ",this.productos)
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
