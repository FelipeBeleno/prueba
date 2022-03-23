import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  statusSession : boolean=false;

  redirect(status:boolean){

    if(!status){

      this.route.navigate(['/login'])
    }

  }




  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      this.redirect(  localStorage.getItem('session') ==='true')

      let res =  localStorage.getItem('session') ==='true'

    return res;
  }


  constructor(private route: Router,
    private fireAuthService :AngularFireAuth){

  }

}
