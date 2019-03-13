import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Login } from '../models/Login';
import { AuthService } from '../core/auth.service';
declare var $: any;

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})

export class ContainerComponent implements OnInit {

  validatingForm: FormGroup;
  ModalLogin: Login;
  showPerfil: boolean;
  email: string;
  password: string;
  localshowPerfil:string;
  
  constructor(public authService: AuthService) { 
    this.ModalLogin = new Login();
    this.email = 'daniellopezj0327@gmail.com';
    this.password = '111111';
    this.validateUserLogin();
   
  }

  validateUserLogin(){
    this.localshowPerfil =  localStorage.getItem('user');
    if(this.localshowPerfil == 'loginC'){
      this.showPerfil = true;
      this.authService.login();
    }
  }

  onSubmit() {
    if (this.ModalLogin.Loginemai == this.email && this.ModalLogin.password == this.password) {
      localStorage.setItem('user', 'loginC');
      console.log("ingrese");
      alert('bienvenido señor usuario')
      this.showPerfil =  true;
      this.authService.login();
      $("#modalLoginForm").modal("hide");
    } else {
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

  clearlocalstora(){
      console.log('entre al metodo clearlocalstora')
      this.showPerfil = false;
      localStorage.clear();
      this.authService.logout();
  }
  
  get input() { return this.validatingForm.get('maxLength'); }
}