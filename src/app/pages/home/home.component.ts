import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { WindowServiceService } from 'src/app/services/window-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  create = false;

  rol: string = '';

  handleCreate() {
    this.create = !this.create;
    // document.getElementById('conatiner-app1')?.scroll(10000,10000)
  }

  constructor(
    private db: AngularFireDatabase,
    private db2: AngularFirestore,
    private authService: AuthServiceService,
    private window: WindowServiceService
  ) {
    this.rol = JSON.parse(localStorage.getItem('user') || '').rol.toString();
  }

  clickLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    let col = this.db2.collection('usuarios');
    col.valueChanges().subscribe((d) => {
      console.log(d);
    });

    let ref = this.db.object('tutorial');
    ref.set({ title: 'example', description: 'hola' });
    this.db
      .list('tutorial')
      .snapshotChanges()
      .subscribe((d) => {
        console.log(d);
      });
  }
}
