import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment'

@Injectable()
export class ApiService {
  private BASE_URL: string = environment.apiUrl;
  private session_key: String = localStorage.getItem('session_key')
  private headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': this.session_key
  });

  constructor(private http: Http) { }

  getUserInfo(): Promise<any> {
    let url: string = `${this.BASE_URL}/users`;
    return this.http.get(url, {headers: this.headers}).toPromise();
  }

  getGroupInfo(id): Promise<any> {
    let url: string = `${this.BASE_URL}/groups/` + id ;
    return this.http.get(url, {headers: this.headers}).toPromise();
  }

  getGroups(): Promise<any> {
    let url: string = `${this.BASE_URL}/groups`;
    return this.http.get(url, {headers: this.headers}).toPromise();
  }

  getGroupTransactions(id): Promise<any> {
    let url: string = `${this.BASE_URL}/groups/` + id + '/transactions';
    return this.http.get(url, {headers: this.headers}).toPromise();
  }

  addGroup(group): Promise<any> {
    let url: string = `${this.BASE_URL}/groups`;
    return this.http.post(url, group, {headers: this.headers}).toPromise();
  }

  joinGroup(token): Promise<any> {
    let url: string = `${this.BASE_URL}/groups/` + token;
    return this.http.get(url, {headers: this.headers}).toPromise();
  }

  addExpense(expense, group_id): Promise<any> {
    console.log(expense);
    let url: string = `${this.BASE_URL}/groups/` + group_id + '/transactions';
    return this.http.post(url, expense, {headers: this.headers}).toPromise();
  }
}
