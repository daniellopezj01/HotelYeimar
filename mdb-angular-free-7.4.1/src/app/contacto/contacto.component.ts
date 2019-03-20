import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MailboxModel } from '../models/MailboxModel ';
import { HTTP_URL } from '../models/httpStatus';
import { RestResponse } from '../models/RestResponse.model';
import { OK } from './../models/httpStatus';
declare var $: any;
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class ContactoComponent  {
  public map: any = { lat: 51.678418, lng: 7.809007 };
  contmodel: MailboxModel;
  message: string;

  constructor(private http: HttpClient){
    this.contmodel = new MailboxModel();
  }

  onSubmit() {   
     this.saveOurUpdate(this.contmodel).subscribe(res => {
      if (res.responseCode === OK) {
        this.message = 'Mensaje enviado.  tu opinión  es muy importante para nosotros, gracias por dejarnos tu mensaje';
      } else {
        this.message = res.message;
      }
    });
    $("#modalAlertcontact").modal("show");
    this.contmodel = new MailboxModel();
  }

  public saveOurUpdate(mailbox: MailboxModel): Observable<RestResponse> {
    return this.http.post<RestResponse>(HTTP_URL+'listMailbox', mailbox);
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
