import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ClientesComponent } from './clientes/clientes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
    {
      path:'',
      component: AdminComponent,

      children:[
        {
          path:'categoria',
          component: CategoriasComponent,
        },
        {
          path:'clientes',
          component: ClientesComponent,
        },
        {
          path:'usuarios',
          component: UsuariosComponent,
        },
      ]
    }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ],
})
export class AdminRoutingModule { }
