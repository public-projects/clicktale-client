// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UsersService {

//   constructor() { }

// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../classes/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class UsersService {

  private url = 'http://localhost:3000/users/users-list';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET heroes from the server */
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users/users-list')
      .pipe(
        catchError(this.handleError<User[]>('getUseres', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getUserNo404<Data>(id: number): Observable<User> {
    const url = `${this.url}/?id=${id}`;
    return this.http.get<User[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.url}/${id}`;
    console.log('get user');
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchUsers(term: string, isDetailed: boolean): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    console.log('searchUsers');

    return this.http.get<User[]>(`${this.url}/?name=${term}&&isDetailed=${isDetailed}`).pipe(
      map(res => res),
      catchError(this.handleError<User[]>('searchUseres', []))
        // return this.http.get<User[]>(`${this.url}/?name.first=${term}`).pipe(
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
