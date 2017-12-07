import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, MatToolbarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ApiComponent } from './api/api.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service'


@NgModule({
  declarations: [
    AppComponent,
    ApiComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent }
    ])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
