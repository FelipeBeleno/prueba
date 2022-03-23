import { Injectable } from '@angular/core';
import { Usuario, UsuarioDB } from '../models/Usuario';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, updateProfile } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  statusLogin = new BehaviorSubject<boolean>(false);
  statusLogin$ = this.statusLogin.asObservable();

  async checkLogin() {
    return this.angularFireService.authState;
  }

  async handleLogin(user: Usuario) {
    try {
      return this.angularFireService.signInWithEmailAndPassword(
        user.name,
        user.password
      );
    } catch (error) {
      return error;
    }
  }

  validateExistUser(uid: String) {
    return this.httpClient.get(environment.urlBackend + '/api/usuarios/' + uid);
  }

  logout() {
    this.angularFireService
      .signOut()
      .then(() => {
        localStorage.clear();
        this.router.navigate(['/login']);
      })
      .catch((e) => {
        console.log(e, 'error');
      });
  }

  updateUser(user: UsuarioDB) {
    //    updateProfile(auth, {});

    return this.httpClient.put<UsuarioDB | unknown>(
      environment.urlBackend + '/api/usuarios/' + user.idFirebase,
      user
    );
  }

  async createUser(user: UsuarioDB, password: string) {
    try {
      let respuesta =
        await this.angularFireService.createUserWithEmailAndPassword(
          user.email.toString(),
          password
        );

      user = {
        ...user,
        idFirebase: respuesta.user?.uid.toString() || '',
        password,
      };

      this.httpClient
        .post(environment.urlBackend + '/api/usuarios/create', user)
        .subscribe((d) => {
          console.log(d);
        });
      return true;
    } catch (error) {
      return false;
    }
  }

  constructor(
    private angularFireService: AngularFireAuth,
    private httpClient: HttpClient,
    private router: Router
  ) {}
}
