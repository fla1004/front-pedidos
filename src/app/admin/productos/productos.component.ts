import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CreateProdutoDialogComponent } from './create-produto-dialog/create-produto-dialog.component';
import { ModificarProductoDialogComponent } from './modificar-producto-dialog/modificar-producto-dialog.component';
import { ProductoService } from './producto.service';
import { Productos } from './productos';

let productos:Productos[] = [];

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  displayedColumns: string[] = ['nombre','precio_compra','precio_venta','stock','imagen','descripcion', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource(productos);
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  urlBase: string;
 

  constructor(
    private productoService: ProductoService,
    public dialog: MatDialog,
    private router: Router
    ) 
    
    { this.urlBase = environment.servidor; }

  ngOnInit(): void {
    this.mostrar();
  }

  mostrar(){
    this.productoService.mostrar('').subscribe(
      (datos:any) => {
        productos = datos;
        this.dataSource = new MatTableDataSource(productos);
        this.dataSource.paginator = this.paginator;
      },
      (error)=>{
        console.log(error);
        localStorage.clear();
        this.router.navigate(['']);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  nuevo(datos = null){
    if(datos == null)
    {
      this.dialog.open(CreateProdutoDialogComponent, {
        width: '880px',
      });
    }else{
      this.dialog.open(ModificarProductoDialogComponent,{
        width: '880px',
        data:datos,
      });
    } 

    this.dialog.afterAllClosed.subscribe((result:any) =>{
        console.log('Resultado', result);
        this.mostrar();
    });
  
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

        this.productoService.eliminar(id).subscribe(res => {
          console.log(res);
          this.mostrar();
        }, error => {
          console.log(error);
        });
    
        Swal.fire(
          '¡Eliminado!',
          'Usuario eliminado exitosamente',
          'success'
        )
      }
    })
  }

}

