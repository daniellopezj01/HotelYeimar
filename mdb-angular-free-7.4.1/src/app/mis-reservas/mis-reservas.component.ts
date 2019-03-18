import { Component, OnInit } from '@angular/core';
import { CreateUserService } from '../register/register.service';
import { Router } from '@angular/router';
import { showReserve } from '../models/showReserve';
import { UserModel} from '../models/UserModel';
@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.scss']
})

 

export class MisReservasComponent implements OnInit {
 
  public showReserve: Array<showReserve>;
  private person: UserModel;
  headElements = ['numero Personas', 'Fecha entrada', 'Fecha salida', 'tipo reserva','estado reserva' , 'Precio total'];
  constructor(private createUserService: CreateUserService, private router: Router) {
    this.person =  JSON.parse(localStorage.getItem('Person'));
   }

  ngOnInit() {
    this.createUserService.showreserve(this.person.id).subscribe(res=>{
      this.showReserve = res;
      console.log(this.showReserve);
    },
      (error: any) => this.showReserve = []
    );
  }

  listshowReserve (){
    return this.showReserve
  }
}
