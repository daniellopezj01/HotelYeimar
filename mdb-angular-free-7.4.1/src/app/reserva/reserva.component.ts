import { Component } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ReserveModel } from '../models/ReserveModel';



export interface typeReserve {
  idtipoReserva: number;
  tipoReserva: string;
}
@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})

export class ReservaComponent {
  selecttipoR: typeReserve[] = [
    { idtipoReserva: 0, tipoReserva: 'compartida' },
    { idtipoReserva: 1, tipoReserva: 'privada' }
  ]

  modeld: NgbDateStruct;
  fromDate: NgbDate;
  endDate: NgbDate;
  date1: NgbDate;
  date2: NgbDate;
  min2picker: NgbDate;
  showH: boolean;
  activebotton: boolean;
  //disabled="true"
  reserve: ReserveModel;

  constructor(calendar: NgbCalendar) {
    this.reserve = new ReserveModel();
    this.fromDate = calendar.getToday();
    this.validateEndDate();
  }

  private validateEndDate() {
    if (this.fromDate.day + 25 > 30) {
      this.endDate = new NgbDate(this.fromDate.year, this.fromDate.month + 1, 30 - 25);
    } else {
      this.endDate = new NgbDate(this.fromDate.year, this.fromDate.month + 1, this.fromDate.day + 25);
    }
  }

  get getreserve() {
    return this.reserve;
  }

  public validaDate1() {
    if( this.date1.day==31){
      this.min2picker = new NgbDate(this.date1.year, this.date1.month+1, 1);
    }else{
      this.min2picker = new NgbDate(this.date1.year, this.date1.month, this.date1.day+1);
    
    }
     this.activebotton= true;
    console.log(this.date1.year + '' + this.date1.month + '' + this.date1.day);
  }

  public validaDate2() {
    console.log(this.date1);
    if (this.date1 > this.date2) {
      console.log('fechas correctas');
    } else {
      console.log('fechas incorrectas');
    }
  }

  public typeReserve() {
    if(this.reserve.idTypeReserve==1){
      this.showH= true;
    }else{
      this.showH= false;
    }
  }

  
  public restrict(e) {
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

  public transformDate(oldDate: NgbDate) {
    return new Date(oldDate.year, oldDate.month, oldDate.day);
  }

}
