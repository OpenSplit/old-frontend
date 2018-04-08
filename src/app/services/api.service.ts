import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment'

@Injectable()
export class ApiService {
  private BASE_URL: string = environment.apiUrl;
  private session_key: string = localStorage.getItem('session_key')
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', this.session_key);
  private httpOptions = { headers: this.headers };

  constructor(private http: HttpClient) { }

  getUserInfo(): Promise<any> {
    let url: string = `${this.BASE_URL}/user`;
    return this.http.get(url, this.httpOptions).toPromise();
  }

  getGroupInfo(id): Promise<any> {
    let url: string = `${this.BASE_URL}/group/` + id;
    return this.http.get(url, this.httpOptions).toPromise();
  }

  getGroupTransactions(id): Promise<any> {
    let url: string = `${this.BASE_URL}/transactions/` + id;
    return this.http.get(url, this.httpOptions).toPromise();
  }

  addGroup(group): Promise<any> {
    let url: string = `${this.BASE_URL}/group`;
    return this.http.post(url, group, this.httpOptions).toPromise();
  }

  joinGroup(token): Promise<any> {
    let url: string = `${this.BASE_URL}/group/` + token;
    return this.http.get(url, this.httpOptions).toPromise();
  }

  addExpense(expense): Promise<any> {
    let url: string = `${this.BASE_URL}/expense`;
    return this.http.post(url, expense, this.httpOptions).toPromise();
  }
}
