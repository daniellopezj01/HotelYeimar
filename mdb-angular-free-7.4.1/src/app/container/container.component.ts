import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Login } from '../models/Login';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})

export class ContainerComponent implements OnInit {

  
  validatingForm: FormGroup;
  ModalLogin: Login;
  showPerfil: boolean;
  showmodal: boolean;
  email: string;
  password: string;

  constructor() {    
    this.ModalLogin = new Login();
    this.email = 'daniellopezj0327@gmail.com';
    this.password = '111111';
  }

  
  onSubmit() {
    if (this.ModalLogin.Loginemai == this.email && this.ModalLogin.password == this.password) {
      console.log("ingrese");
      this.showPerfil = true; 
      this.showmodal = true;
    }else{
       alert('datos incorrectos');
    }
  }

  ngOnInit() {
    this.validatingForm = new FormGroup({
      minLength: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      validateEmail: new FormControl(null, [Validators.required, Validators.email]),
      maxLength: new FormControl(null, [Validators.required, Validators.maxLength(5)]),
    });
  }

  get input() { return this.validatingForm.get('maxLength'); }
}