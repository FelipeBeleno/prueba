import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateLoginGuard implements CanActivate {

  redirect(status:boolean){

    if(!status){

      this.route.navigate(['/home'])
    }

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.redirect(localStorage.getItem('session') !== 'true')

    return localStorage.getItem('session') !== 'true';
  }

  constructor(private route: Router){

  }

}
