import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Transaction } from '../models/transaction';

import { environment } from '../../environments/environment';

@Injectable()
export class TransactionService {
  private baseUrl = environment.apiUrl + '/groups';
  private urlPart2 = '/transaction';
  private session_key: string = localStorage.getItem('session_key')
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', this.session_key);
  private httpOptions = { headers: this.headers };

  constructor(private http: HttpClient) { }

  private buildUrl(groupId: number): string {
    return `${this.baseUrl}/${groupId}/${this.urlPart2}`;
  }

  getTransactions(groupId: number): Observable<Transaction[]> {
    const url = this.buildUrl(groupId);
    return this.http.get<Transaction[]>(url, this.httpOptions)
      .pipe(
        tap(transactions => console.log(`Fetched ${transactions.length} transactions`)),
        catchError(this.handleError('getTransactions', []))
      );
  }

  getTransaction(groupId: number, transactionId: number): Observable<Transaction> {
    const url = `${this.buildUrl(groupId)}/${transactionId}`;
    return this.http.get<Transaction>(url, this.httpOptions)
      .pipe(
        tap(transaction => console.log(`Fetched transaction ${transaction.id}`)),
        catchError(this.handleError('getTransaction', null))
      );
  }

  createTransaction(groupId: number, description: string, amount: string): Observable<Transaction> {
    const url = this.buildUrl(groupId);
    const body = { description: description, amount: amount };
    return this.http.post<Transaction>(url, body, this.httpOptions)
      .pipe(
        tap(transaction => console.log(`Created transaction: ${description}`)),
        catchError(this.handleError('createTransaction', null))
      );
  }

  updateTransaction(groupId: number, transactionId: number, body: Object): Observable<Transaction> {
    const url = `${this.buildUrl(groupId)}/${transactionId}`;
    return this.http.put<Transaction>(url, body, this.httpOptions)
      .pipe(
        tap(transaction => console.log(`Updated transaction: ${transaction.description}`)),
        catchError(this.handleError('updateTransaction', null))
      );
  }

  deleteTransaction(groupId: number, transactionId: number): Observable<void> {
    const url = `${this.buildUrl(groupId)}/${transactionId}`;
    return this.http.delete<Transaction>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Deleted transaction`)),
        catchError(this.handleError('deleteTransaction', null))
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
