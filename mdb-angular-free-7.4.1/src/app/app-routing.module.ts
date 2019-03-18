import { MisReservasComponent } from './mis-reservas/mis-reservas.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Prueba1Component } from './prueba1/prueba1.component';
import { HomeComponent } from './home/home.component';
import { ContainerComponent } from './container/container.component';
import { Routes, RouterModule } from '@angular/router';
import { ContactoComponent } from './contacto/contacto.component';
import { HabitacionComponent } from './habitacion/habitacion.component';
import { ReservaComponent } from './reserva/reserva.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: 'container', component: ContainerComponent },
  { path: 'prueba', component: Prueba1Component },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'habitacion', component: HabitacionComponent },
  { path: 'conocenos', component: ConocenosComponent },
  { path: 'reserva', component: ReservaComponent ,   canActivate: [AuthGuard]},
  { path: 'updateUser', component: UpdateUserComponent },
  { path: 'MisReservas', component: MisReservasComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset:[0,53]
    }
  )
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
