import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../models/user';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment'

@Injectable()
export class AuthService {
  private BASE_URL: string = environment.apiUrl;
  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  login(user): Promise<any> {
    let url: string = `${this.BASE_URL}/login/` + user.email;
    return this.http.get(url).toPromise();
  }

  tokenLogin(token): Promise<any> {
    let url: string = `${this.BASE_URL}/session/` + token;
    return this.http.get(url).toPromise();
  }

  register(user): Promise<any> {
    let url: string = `${this.BASE_URL}/user`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }

  ensureAuthenticated(session_key): Promise<any> {
    let url: string = `${this.BASE_URL}/user`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `${session_key}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }

}
