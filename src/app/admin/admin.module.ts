import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';


import { AdminComponent } from './admin.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { ClientesComponent } from './clientes/clientes.component';
import { CrearModificarClienteComponent } from './clientes/crear-modificar-cliente/crear-modificar-cliente.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DatosUsuarioComponent } from './usuarios/datos-usuario/datos-usuario.component';
import { CambiarPasswordComponent } from './usuarios/cambiar-password/cambiar-password.component';
import { CreateUsuarioDialogComponent } from './usuarios/create-usuario-dialog/create-usuario-dialog.component';
import { ProductosComponent } from './productos/productos.component';
import { CreateProdutoDialogComponent } from './productos/create-produto-dialog/create-produto-dialog.component';
@NgModule({
  declarations: [
    AdminComponent, 
    CategoriasComponent, 
    ClientesComponent, 
    CrearModificarClienteComponent, 
    UsuariosComponent, 
    DatosUsuarioComponent, 
    CambiarPasswordComponent, 
    CreateUsuarioDialogComponent, 
    ProductosComponent, CreateProdutoDialogComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    ReactiveFormsModule,


    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatIconModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,

    
  ]
})
export class AdminModule { }
