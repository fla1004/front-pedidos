import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortadaComponent } from './portada.component';

@NgModule({
  declarations: [PortadaComponent],
  imports: [
    CommonModule
  ],
  exports:[PortadaComponent]
})
export class PortadaModule { }
