import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { AuthService } from './auth.service';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isLoggedIn) {
        /*
      return this.router.createUrlTree(
        ['/notauth', { message: 'you do not have the permission to enter' }]
        // { skipLocationChange: true }
      );*/
   $("#modalLoginForm").modal("show");
    } else {
      return true;
    }
  }
}
