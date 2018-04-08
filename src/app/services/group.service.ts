import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Group } from '../models/group';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable()
export class GroupService {
  private url = environment.apiUrl + '/groups';
  private session_key: string = localStorage.getItem('session_key')
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', this.session_key);
  private httpOptions = { headers: this.headers };

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.url, this.httpOptions)
      .pipe(
        tap(groups => console.log(`Fetched ${groups.length} groups`)),
        catchError(this.handleError('getGroups', []))
      );
  }

  getGroup(groupId: number): Observable<Group> {
    const url = `${this.url}/${groupId}`;
    return this.http.get<Group>(url, this.httpOptions)
      .pipe(
        tap(group => console.log(`Fetched group ${group.id}`)),
        catchError(this.handleError('getGroup', null))
      );
  }

  getGroupsUsers(groupId: number): Observable<User[]> {
    const url = `${this.url}/${groupId}/users`;
    return this.http.get<User[]>(url, this.httpOptions)
      .pipe(
        tap(users => console.log(`Fetched ${users.length} users of group ${groupId}`)),
        catchError(this.handleError('getGroupsUsers', []))
      );
  }

  generateGroupToken(groupId: number): Observable<string> {
    const url = `${this.url}/${groupId}/generateToken`;
    return this.http.get<string>(url, this.httpOptions)
      .pipe(
        tap(token => console.log(`Generated token for group ${groupId}`)),
        catchError(this.handleError('generateGroupToken', null))
      );
  }

  joinGroup(groupId: number, token: string): Observable<void> {
    const url = `${this.url}/${groupId}/join/${token}`;
    return this.http.post(url, {}, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Joined group ${groupId}`)),
        catchError(this.handleError('joinGroup', null))
      );
  }

  leaveGroup(groupId: number): Observable<void> {
    const url = `${this.url}/${groupId}/leave`;
    return this.http.post(url, {}, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Left group ${groupId}`)),
        catchError(this.handleError('leaveGroup', null))
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
