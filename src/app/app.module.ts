import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';

import { MatSliderModule } from '@angular/material/slider';
import { FooterComponent } from './inicio/footer/footer.component';
import { HeaderComponent } from './inicio/header/header.component';​
import { PortadaComponent } from './inicio/portada/portada.component';
import { ServiciosComponent } from './inicio/servicios/servicios.component';
import { NosotrosComponent } from './inicio/nosotros/nosotros.component';
import { ContactenosComponent } from './inicio/contactenos/contactenos.component';
import { TodoComponent } from './inicio/todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    PortadaComponent,
    ServiciosComponent,
    NosotrosComponent,
    ContactenosComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatSliderModule,

    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,

    MatCardModule,
    MatButtonModule,
    MatTableModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
