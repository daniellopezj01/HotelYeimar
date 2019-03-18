import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/UserModel';
import { TypeDocument } from '../models/TypeDocument';
import { CreateUserService } from '../register/register.service';
import { OK } from './../models/httpStatus';
import { Router } from '@angular/router';
declare var $: any;
export interface Gender {
  nameGender: string;
  domainGender: string;
}

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  providers: [CreateUserService]
})

export class UpdateUserComponent implements OnInit {
  validatingForm: FormGroup;
  dataUser: UserModel;
  password: string;
  message: String;
  private typeDocuments: Array<TypeDocument>;
  cont: number;
  private genders: Gender[] = [
    { nameGender: 'Masculino', domainGender: 'M' },
    { nameGender: 'Femenino', domainGender: 'F' },
    { nameGender: 'Indefinido', domainGender: 'I' }
  ];

  constructor(private createUserService: CreateUserService, private router: Router) {
    this.dataUser = JSON.parse(localStorage.getItem('Person'));
    this.password = this.dataUser.password;
    this.cont = 0;
  }

  ngOnInit() {
    this.loadTypeDocument();
  }

  onSubmit() {
    if (this.cont < 1) {
      this.cont++;
      if (this.password == this.dataUser.password) {
        this.createUserService.saveOurUpdate(this.dataUser).subscribe(res => {
          if (res.responseCode === OK) {
            this.message = 'datos actualizados correctamente correctamente';
            localStorage.setItem('Person', JSON.stringify(this.dataUser));
            $("#modalAlertup").modal("show");
            this.dataUser = new UserModel;
          } else {
            this.message = res.message;
          }
        });
      } else {
        this.message = 'contraseñas no coinciden';
        this.dataUser.password = "";
        this.password = "";
      }
      $("#modalAlertup").modal("show");
      this.cont = 0;
    }
  }

  private loadTypeDocument(): void {
    this.createUserService.getTypeDocument().subscribe(res => {
      this.typeDocuments = res;
      console.log(this.typeDocuments);
      console.log('entro');
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
  get inputMin() { return this.validatingForm.get('min'); }

  get genderList() { return this.genders; }

  get mini() {
    return new FormControl(null, Validators.min(10));
  }
  get typeDocumentList() { return this.typeDocuments; }
}
