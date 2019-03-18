import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/UserModel';
import { TypeDocument } from '../models/TypeDocument';
import { CreateUserService } from './register.service';
import { OK } from './../models/httpStatus';
import { Router } from '@angular/router';
declare var $: any;
export interface Gender {
  nameGender: string;
  domainGender: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [CreateUserService]
})

export class RegisterComponent implements OnInit {
  validatingForm: FormGroup;
  dataUser: UserModel;
  password: string;
  message: string;
  private typeDocuments: Array<TypeDocument>;
  private genders: Gender[] = [
    { nameGender: 'MASCULINO', domainGender: 'M' },
    { nameGender: 'FEMENINO', domainGender: 'F' },
    { nameGender: 'INDEFINIDO', domainGender: 'I' }
  ];
  cont: number;

  constructor(private createUserService: CreateUserService, private router: Router) {
    this.dataUser = new UserModel();
    this.cont = 0;
  }

  ngOnInit() {
    this.loadTypeDocument();
  }

  //Metodo de registrar usuario
  onSubmit() {
    if (this.cont < 1) {
      this.cont++;
      if (this.password == this.dataUser.password) {
        this.createUserService.saveOurUpdate(this.dataUser).subscribe(res => {
          if (res.responseCode === OK) {
            this.message = 'datos almacenados correctamente';
            this.password = "";
            this.dataUser = new UserModel();
          } else {
            this.message = res.message;
          }
        });
        console.log(this.message);
        $("#modalAlertR").modal("show");
      } else {
        this.message = 'contraseñas no coinciden';
        $("#modalAlertR").modal("show");
        this.dataUser.password = "";
        this.password = "";
      }
    }
    this.cont = 0;
  }

  private loadTypeDocument(): void {
    this.createUserService.getTypeDocument().subscribe(res => {
      this.typeDocuments = res;
      console.log(this.typeDocuments);
    },
      (error: any) => this.typeDocuments = []
    );
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

  get inputemail() { return this.validatingForm.get('email'); }
  get inputMax() { return this.validatingForm.get('maxLength'); }
  get inputMin() { console.log("entre a inputmin"); return this.validatingForm.get('min'); }

  get genderList() { return this.genders; }
  get typeDocumentList() { return this.typeDocuments; }

}