import { ContactModel } from './../models/ContactModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent  {
  public map: any = { lat: 51.678418, lng: 7.809007 };
  contmodel: ContactModel;
  
  constructor(){
    this.contmodel = new ContactModel();
  }
  onSubmit() {   
    console.log(this.contmodel.first_name +' '+  this.contmodel.last_name 
    +' '+  this.contmodel.email +' '+  this.contmodel.affair
    +' '+  this.contmodel.message);
     this.contmodel = new ContactModel();
  }

  public restrictNumeric(e) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  public restrictext(e) {
    let input;
    input = String.fromCharCode(e.which);
    return !!/[\D]/.test(input);
  
  }
}
