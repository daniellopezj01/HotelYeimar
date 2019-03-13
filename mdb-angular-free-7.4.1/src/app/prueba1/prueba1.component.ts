import { Component } from '@angular/core';

@Component({
  selector: 'app-prueba1',
  templateUrl: './prueba1.component.html',
  styleUrls: ['./prueba1.component.scss']
})
export class Prueba1Component {
  
  showmodal: boolean;
  constructor( ) {
  }
  
  pruebaclose(){
    this.showmodal = true;
  }
}