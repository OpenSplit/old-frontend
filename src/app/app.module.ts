import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
import { MaterialModule } from './material.module';
import { UserService } from './services/user.service';
import { GroupService } from './services/group.service';
import { MessageService } from './services/message.service';
import { TransactionService } from './services/transaction.service';

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
    HttpClientModule,
    HttpModule,
    MaterialModule,
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
    LoginRedirect,
    UserService,
    GroupService,
    MessageService,
    TransactionService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
