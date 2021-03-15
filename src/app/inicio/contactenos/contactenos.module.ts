import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactenosComponent } from './contactenos.component';

@NgModule({
  declarations: [ContactenosComponent],
  imports: [
    CommonModule
  ],
  exports:[ContactenosComponent]
})
export class ContactenosModule { }
