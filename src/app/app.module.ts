import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import {
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgOtpInputModule } from 'ng-otp-input';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './components/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FormLoginComponent,
    TableUsersComponent,
    NotFoundComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgOtpInputModule,
    InfiniteScrollModule,
    MatSliderModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
  ],
  providers: [ScreenTrackingService, UserTrackingService, AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule {}
