import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/login/usuario';
import Swal from 'sweetalert2';
import { CreateUsuarioDialogComponent } from './create-usuario-dialog/create-usuario-dialog.component';
import { UsuarioService } from './usuario.service';

let usuario: Usuario[] = [];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public identidad;

  constructor(private usuarioService: UsuarioService,
              public dialog : MatDialog,
              private router: Router) 
              {
                  this.identidad = usuarioService.getIdentidad();
              }

    displayedColumns: string[] = ['Nombre', 'Correo', 'Rol', 'Estado', 'Editar', 'Eliminar'];
    dataSource = new MatTableDataSource(usuario);

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
            

  ngOnInit(): void {
    if(this.identidad.rol === 'Administrador')
      {
        this.mostrar();
      }
    if(this.identidad.rol === 'Empleado')
      {
        this.router.navigate(["admin"]);
      }
  }

  mostrar(){
    this.usuarioService.mostrar().subscribe(
      (datos:any)=>{
        usuario = datos;
        console.log(usuario);
        this.dataSource = new MatTableDataSource(usuario);
        this.dataSource.paginator = this.paginator;
      }, 
      (error)=>{
        console.log(error)
      }
    );
  }
  nuevo(datos = null){
    if(datos == null)
    {
      this.dialog.open( CreateUsuarioDialogComponent, {
        width: '380px',
      });
    }else{
      this.dialog.open( CreateUsuarioDialogComponent,{
        width: '380px',

        data:datos,
      });
    } 
    this.dialog.afterAllClosed.subscribe((result:any) =>{
      console.log('Resultado', result);
      this.mostrar();
    });
}

applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

        this.usuarioService.eliminar(id).subscribe(res => {
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
