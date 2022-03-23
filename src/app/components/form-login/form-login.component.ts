import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCredential } from 'firebase/auth';
import { ErrorSubmit } from 'src/app/models/Error';
import { AuthServiceService } from 'src/app/services/auth-service.service';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {
  enterPhone = false;
  email = '';
  contrasena = '';
  reCaptchaVerifier: any;
  numberPhone = '';
  validateCode = false;
  codeNumberValidation = '';
  errorForm: ErrorSubmit = {
    message: '',
    status: false,
  };

  activateLoginPhone() {
    this.enterPhone = !this.enterPhone;
  }

  submit() {
    if (
      this.contrasena.trim() === '' ||
      this.email.trim() === '' ||
      !this.email.includes('@')
    ) {
      this.errorForm = {
        message: this.email.includes('@')
          ? 'todos los campos son obligatorios'
          : 'El email debe ser valido',
        status: true,
      };

      return;
    }

    this.authService
      .handleLogin({ name: this.email, password: this.contrasena })
      .then((d: UserCredential | any) => {
        console.log(d)
        if (d.user.uid) {
          console.log(d.user)
          this.authService
          .validateExistUser(d.user.uid)
          .subscribe((f) => {
            console.log(f)
            if (f !== null || f !== undefined) {
              localStorage.setItem('user', JSON.stringify(f))
              localStorage.setItem('session', 'true');
              this.router.navigate(['./home']);

            }
          });
        }
      })
      .catch((d) => {
        this.errorForm = {
          status: true,
          message: d.message,
        };
        localStorage.clear();
      });
  }

  changeStatus() {
    this.errorForm = {
      message: '',
      status: false,
    };
  }

  getOTP() {
    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'container-recaptcha',
      {
        size: 'invisible',
      }
    );

    firebase
      .auth()
      .signInWithPhoneNumber('+57' + this.numberPhone, this.reCaptchaVerifier)
      .then((confirmationResult) => {
        localStorage.setItem(
          'verificationId',
          JSON.stringify(confirmationResult.verificationId)
        );
        this.validateCode = true;
      })
      .catch((error) => {
        this.errorForm = {
          message: error,
          status: true,
        };
      });
  }

  onOtpChange(event: any) {
    this.codeNumberValidation = event;
  }
  confirmOTP() {
    if (this.codeNumberValidation.trim().length !== 6) {
      this.errorForm = {
        message: 'codigo incompleto',
        status: true,
      };
      return;
    }

    let credential = firebase.auth.PhoneAuthProvider.credential(
      JSON.parse(localStorage.getItem('verificationId') || '') || '',
      this.codeNumberValidation
    );

    firebase
      .auth()
      .signInWithCredential(credential)
      .then((response) => {
        if (response.user?.uid) {
          this.authService
            .validateExistUser(response.user.uid)
            .subscribe((d) => {
              if (d !== null || d !== undefined) {
                localStorage.setItem('user', JSON.stringify(d))
                localStorage.setItem('session', 'true');
                this.router.navigate(['./home']);

              }
            });
        }
      })
      .catch((d) => {
        this.errorForm = {
          status: true,
          message: d.message,
        };
        localStorage.clear();
      });
  }

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.statusLogin$.subscribe((respuesta) => {
      console.log(respuesta);
    });
  }
}
