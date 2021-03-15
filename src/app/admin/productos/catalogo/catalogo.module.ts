import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoComponent } from './catalogo.component';

@NgModule({
  declarations: [CatalogoComponent ],
  imports: [
    CommonModule
  ],exports:[CatalogoComponent ]
})
export class CatalogoModule { }
