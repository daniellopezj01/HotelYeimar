import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { ContainerComponent } from './container/container.component';
import { Prueba1Component } from './prueba1/prueba1.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HabitacionComponent } from './habitacion/habitacion.component';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { ReservaComponent } from './reserva/reserva.component';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    Prueba1Component,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ContactoComponent,
    HabitacionComponent,
    ConocenosComponent,
    ReservaComponent,
    UpdateUserComponent,
  ],

  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    RouterModule,
    NgbDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
