import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Login } from '../models/Login';
import { AuthService } from '../core/auth.service';
import { CreateUserService } from '../register/register.service';
import { Router } from '@angular/router';
import { UserModel } from '../models/UserModel';
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
  localshowPerfil: string;
  person: UserModel;
  cont: number;
  message:string;
  constructor(public authService: AuthService,
    private createUserService: CreateUserService,
    private router: Router) {
    this.person = new UserModel();
    this.ModalLogin = new Login();
    this.cont = 0;
    this.validateUserLogin();
  }

  validateUserLogin() {
    this.localshowPerfil = localStorage.getItem('user');
    if (this.localshowPerfil == 'loginC') {
      this.showPerfil = true;
      this.person = JSON.parse(localStorage.getItem('Person'));
      this.authService.login();
    }
  }

  onSubmit() {
    if (this.cont < 1) {
      this.createUserService.ValidateLogin(this.ModalLogin).subscribe(res => {
        if (res == null) {
          this.message = 'Usuario o contraseña equivocada';
         this.ModalLogin =  new Login();
        } else {
          this.person = res;
          localStorage.setItem('user', 'loginC');
          localStorage.setItem('Person', JSON.stringify(this.person));
          this.showPerfil = true;
          this.authService.login();
          this.message = 'bienvenido señor usuario';
          $("#modalLoginForm").modal("hide");
          this.ModalLogin =  new Login();
        }  
        $("#modalAlert").modal("show");
        this.cont = 0;
      });
    } this.cont++;

  }

  ngOnInit() {
    this.validatingForm = new FormGroup({
      minLength: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      validateEmail: new FormControl(null, [Validators.required, Validators.email]),
      maxLength: new FormControl(null, [Validators.required, Validators.maxLength(5)]),
    });
  }

  clearlocalstora() {
    $("#cerrar").modal("hide");
    this.showPerfil = false;
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['']);
  }

  get input() { return this.validatingForm.get('maxLength'); }
}