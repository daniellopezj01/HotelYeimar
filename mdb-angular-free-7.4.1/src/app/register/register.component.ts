import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/UserModel';


export interface Gender {
  nameGender: string;
  domainGender: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {
  validatingForm: FormGroup;
  dataUser: UserModel;
  password: string;
  private genders: Gender[] = [
    {nameGender: 'Masculino', domainGender: 'M'},
    {nameGender: 'Femenino', domainGender: 'F'},
    {nameGender: 'Indefinido', domainGender: 'I'}
  ];


  constructor() {
    this.dataUser = new UserModel();
  }

  onSubmit() {
    if (this.password == this.dataUser.password) {
      console.log(this.dataUser.gender)
      alert('datos almacenados correctamente');
    } else {
      alert('contraseña no coinciden');
      this.dataUser.password = "";
      this.password = "";
    }
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

  ngOnInit() {
    this.validatingForm = new FormGroup({
      min: new FormControl(null, Validators.min(10))
    });

  }

  get inputemail() { return this.validatingForm.get('email'); }
  get inputMax() { return this.validatingForm.get('maxLength'); }
  get inputMin() { console.log("entre a inputmin"); return this.validatingForm.get('min'); }
  
  get genderList(){return this.genders; }
  
  get mini() {
    console.log('entre a mini')
    return new FormControl(null, Validators.min(10));
  }
}