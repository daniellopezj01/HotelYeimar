import { Component } from '@angular/core';
import { NgbDatepickerConfig, NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ReserveModel } from '../models/ReserveModel';

@Component({
  selector: 'app-prueba1',
  templateUrl: './prueba1.component.html',
  styleUrls: ['./prueba1.component.scss']
})
export class Prueba1Component {
  modeld: NgbDateStruct;
  fromDate: NgbDate;
  endDate: NgbDate;
  date1: NgbDate;
  date2: NgbDate;
  min2picker: NgbDate;
  
  private reserve: ReserveModel;

  constructor( calendar: NgbCalendar) {
    this.reserve = new ReserveModel();
    this.fromDate = calendar.getToday();
    this.validateEndDate();
  }

  private validateEndDate(){
    if (this.fromDate.day + 25 > 30) {
      this.endDate = new NgbDate(this.fromDate.year, this.fromDate.month+1, 30 -25 );
    }else{
      this.endDate = new NgbDate(this.fromDate.year, this.fromDate.month+1, this.fromDate.day+25 );
    }
  }
  get getreserve() {
    return this.reserve;
  }
  public validaDate1() {
    this.min2picker = new NgbDate(this.date1.year, this.date1.month, this.date1.day);
    console.log(this.date1.year + '' + this.date1.month + '' + this.date1.day);
  }


  public validaDate2(){
    console.log(this.date1);
    if(this.date1>this.date2){
      console.log('fechas correctas');
    }else{
      console.log('fechas incorrectas');
    }
  }

  public transformDate( oldDate:NgbDate  ){
    return  new Date(oldDate.year,oldDate.month,oldDate.day);
  }
}