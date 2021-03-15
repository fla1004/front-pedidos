import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { TodoComponent } from './inicio/todo/todo.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,

    children:[
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'todo',
        component: TodoComponent
      }
    ]
  },
  {
    path:'admin',
    loadChildren:() => import('./admin/admin.module')
      .then((m) => m.AdminModule),
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
