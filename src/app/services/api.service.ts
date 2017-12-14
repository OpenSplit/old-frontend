import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../models/user';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {
  private BASE_URL: string = 'http://localhost:5000';
  private session_key: String = localStorage.getItem('session_key')
  private headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': this.session_key
  });

  constructor(private http: Http) { }

  getUserInfo(): Promise<any> {
    let url: string = `${this.BASE_URL}/user`;
    return this.http.get(url, {headers: this.headers}).toPromise();
  }
}
