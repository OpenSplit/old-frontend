import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { User } from '../models/user';

import { environment } from '../../environments/environment'

@Injectable()
export class UserService {
  private url: string = environment.apiUrl + '/users';
  private session_key: string = localStorage.getItem('session_key')
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', this.session_key);
  private httpOptions = { headers: this.headers };

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url, this.httpOptions)
      .pipe(
        tap(users => console.log(`Fetched ${users.length} users`)),
        catchError(this.handleError('getUsers', []))
      );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`, this.httpOptions)
      .pipe(
        tap(user => console.log(`Fetched user info`)),
        catchError(this.handleError('getUser', null))
      );
  }

  createUser(email: string, username: string): Observable<User> {
    const body = { email: email, username: username };
    return this.http.post<User>(this.url, body, this.httpOptions)
      .pipe(
        tap(user => console.log(`Created user account`)),
        catchError(this.handleError('createUser', null))
      );
  }

  updateUser(body: Object): Observable<User> {
    return this.http.put<User>(this.url, body, this.httpOptions)
      .pipe(
        tap(user => console.log(`Updated user account info`)),
        catchError(this.handleError('updateUser', null))
      );
  }

  deleteUser(): Observable<void> {
    return this.http.delete<User>(this.url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Deleted user account`)),
        catchError(this.handleError('deleteUser', null))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    // TODO: handle different error types
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      console.error(error);
      return of(result as T);
    };
  }
}
