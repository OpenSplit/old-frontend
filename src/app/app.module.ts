import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Material Design Imports
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
} from '@angular/material';

// Component Imports
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component'

// Service Imports
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { EnsureAuthenticated } from './services/ensure-authenticated.service';
import { LoginRedirect } from './services/login-redirect.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    RouterModule.forRoot([
      { path: '', component: MainComponent, canActivate: [EnsureAuthenticated] },
      { path: 'login', component: LoginComponent, canActivate: [LoginRedirect] },
      { path: 'login/:token', component: LoginComponent },
      { path: 'register', component: RegisterComponent, canActivate: [LoginRedirect] }
    ])
  ],
  providers: [
    AuthService,
    ApiService,
    EnsureAuthenticated,
    LoginRedirect
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
