import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {UserInfo} from '../_models/user-info';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Jeu} from '../jeu/Jeu';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import {ANONYMOUS_USER} from "./authentification.service";
import {User} from "../_models/user";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private refreshTokenTimeout;
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(ANONYMOUS_USER);
  private userUrl = 'api/users/id';

  // tslint:disable-next-line:typedef
  private log(log: string){
    console.info(log);
  }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation= 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {
  }

  getProfile(): Observable<UserInfo> {
    return this.http.get<any>(environment.apiUrl + '/auth/user-profile', httpOptions)
      .pipe(
        map(rep => rep.data.item),
        catchError(err => throwError(err))
      );
  }

  getMesJeux(id: number): Observable<Jeu[]> {
    const url = 'http://localhost:8000/api/users/' + id;
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get<any>(url, httpOptions)
      .pipe(
        map(res => res.data.item.jeux),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );
  }
  /*
  updateProfile(nom: string, prenom: string, pseudo: string, email: string) {
    return this.http.put(this.userUrl, users, httpOptions).pipe(
      tap(_ => this.log(`updates users id=${users.id}`)),
      catchError(this.handleError<any>('updateProfile'))
    );
  }
  */

  updateProfile(nom: string, prenom: string, pseudo: string, email: string): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/auth/login`, {nom, prenom, pseudo, email}, httpOptions)
      .pipe(
        tap(rep => console.log(rep)),
        catchError(this.handleError<any>('updateProfile')),
        map(rep => {
          const user = {...rep.data.user, jwtToken: rep.data.token};
          console.log('User connected : ', user);
          return user;
        }),
        shareReplay(),
        catchError(err => {
          this.stopRefreshTokenTimer();
          this.userSubject.next(ANONYMOUS_USER);
          return throwError(console.log(err));
          // return of('');
        }));
  }

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout);
  }
}
