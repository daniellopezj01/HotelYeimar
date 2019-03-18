import { UserModel } from './../models/UserModel';
import { Component } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ReserveModel } from '../models/ReserveModel';
import { CreateUserService } from '../register/register.service';
import { OK } from './../models/httpStatus';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
declare var $: any;

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
    { idtipoReserva: 2, tipoReserva: 'compartida' },
    { idtipoReserva: 1, tipoReserva: 'privada' }
  ]

  fromDate: NgbDate;
  endDate: NgbDate;
  date1: NgbDate;
  date2: NgbDate;
  message: string;
  D1: string;
  D2: string;
  min2picker: NgbDate;
  activebotton: boolean;
  reserve: ReserveModel;
  Person: UserModel;
  cont: number;
  precio: number;
  

  constructor(calendar: NgbCalendar, private createUserService: CreateUserService, private router: Router) {
    this.reserve = new ReserveModel();
    this.fromDate = calendar.getToday();
    this.loadDateReserve();
    this.validateEndDate();
    this.cont = 0;
    this.precio =  0;
    this.message= "";
  }

  private loadDateReserve() {
    this.Person = JSON.parse(localStorage.getItem('Person'));
    this.reserve.dateReserve = new Date();
    this.reserve.idClient = this.Person.id;
  }

  private validateEndDate() {
    if (this.fromDate.day + 25 > 30) {
      this.endDate = new NgbDate(this.fromDate.year, this.fromDate.month + 1, this.fromDate.day + 25 - 30  );
    } else {
      this.endDate = new NgbDate(this.fromDate.year, this.fromDate.month + 1, this.fromDate.day + 25);
    }
  }

  public Reservar() {
    if (this.cont < 1) {
      this.cont++;
      if (this.reserve.idTypeReserve == 2) {
        this.createUserService.validateReserveshared(this.dateToString(this.date1), this.dateToString(this.date2)).subscribe(res => {
          if (res == 0) {
            this.message = 'no hay camas disponibles Para las fechas seleccionadas';
            $("#modalAlertReserva").modal("show");
          } else {
            this.createUserService.saveReserve(this.reserve).subscribe(res => {
              if (res.responseCode === OK) {
                this.D1=this.dateToString(this.date1);
                this.D2=this.dateToString(this.date2);
                this.precio =  15000 * this.reserve.numBed*this.calculatedays(this.reserve.deteInput,this.reserve.dateOutput);
                $("#showconfirReserve").modal("show");
              } else {
                this.message = res.message;
                $("#modalAlertReserva").modal("show");
              }
            });
          }
        });
      } else {
        this.createUserService.validateindividualAvailabilityRoom(this.dateToString(this.date1), this.dateToString(this.date2), this.reserve.numBed).subscribe(res => {
          if (res == 0) {
            this.message = ' no hay habitaciones disponibles';
            $("#modalAlertReserva").modal("show");
          } else {
            this.createUserService.saveReserve(this.reserve).subscribe(res => {
              if (res.responseCode === OK) {
                this.D1=this.dateToString(this.date1);
                this.D2=this.dateToString(this.date2);
                this.precio =  15000 * this.reserve.numBed*this.calculatedays(this.reserve.deteInput,this.reserve.dateOutput);
                $("#showconfirReserve").modal("show");
              } else {
                this.message = res.message;
              }
            });
          }
        });
      }
    }
    this.cont = 0;
  }

  public reload(){
    this.router.navigate(['']);
    window.location.reload();
  }

  public showtipoReserva() {
    for (var i = 0; i < this.selecttipoR.length; i++) {
      if (this.reserve.idTypeReserve == this.selecttipoR[i].idtipoReserva) {
        return this.selecttipoR[i].tipoReserva;
      }
    }
  }

  private calculatedays(date1: Date, date2: Date) {
    var oneDay = 24 * 60 * 60 * 1000
    return Math.round(Math.abs((date1.getTime() - date2.getTime()) / (oneDay)));
  }

  public dateToString(date: NgbDate) {
    return (date.year + '-' + date.month + '-' + date.day);
  }
  get getreserve() {
    return this.reserve;
  }

  public validaDate1() {
    if (this.date1.day == 31) {
      this.min2picker = new NgbDate(this.date1.year, this.date1.month + 1, 1);
    } else {
      this.min2picker = new NgbDate(this.date1.year, this.date1.month, this.date1.day + 1);
    }
    this.activebotton = true;
  }

  public changetype() {
    if (this.reserve.idTypeReserve == 0) {
      console.log("compartida");
    } else {
      console.log('privada')
    }
  }

  public validaDate2() {
    this.reserve.deteInput = this.transformDate(this.date1);
    this.reserve.dateOutput = this.transformDate(this.date2);
    if (this.reserve.deteInput < this.reserve.dateOutput) {
      console.log('fechas correctas');
    } else {
      console.log('fechas incorrectas');
    }
  }

  public transformDate(oldDate: NgbDate) {
    return new Date(oldDate.year, oldDate.month - 1, oldDate.day);
  }
}
