import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClientesService } from './clientes.service';
import { CrearModificarClienteComponent } from './crear-modificar-cliente/crear-modificar-cliente.component';

let cliente: Cliente[] = [];

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'CI', 'Email', 'Telefono', 'Pedido', 'Editar', 'Eliminar'];
  dataSource = new MatTableDataSource(cliente);
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  constructor(private clienteService: ClientesService,
              public dialog : MatDialog) { }

  ngOnInit(): void {
    this.mostrar();
  }
  mostrar(){
    this.clienteService.mostrar().subscribe(
      (datos:any)=>{
        cliente = datos;
        console.log(cliente);
        this.dataSource = new MatTableDataSource(cliente);
        this.dataSource.paginator = this.paginator;
      }, 
      (error)=>{
        console.log(error)
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
      this.dialog.open(CrearModificarClienteComponent, {
        width: '350px',
      });
    }else{
      this.dialog.open(CrearModificarClienteComponent,{
        width: '350px',
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

        this.clienteService.eliminar(id).subscribe(res => {
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
