import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ApiModule } from 'generated/api/api.module';
import { RoomComponent } from './room/room.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from './shared/data.service';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { RoomPageComponent } from './room-page/room-page.component';
import { NotificationComponent } from './notification/notification.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    LoginComponent,
    HomeComponent,
    RoomPageComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    ApiModule.forRoot({ rootUrl: environment.BACKEND_URL }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production, registrationStrategy: 'registerImmediately'
    }),
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    FormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    MatSidenavModule
  ],
  providers: [DataService, AuthGuard, AuthService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
