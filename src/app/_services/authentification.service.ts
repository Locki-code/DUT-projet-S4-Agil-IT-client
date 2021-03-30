import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../_models/user';
import {environment} from '../../environments/environment';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import * as moment from 'moment';
import {MessageService} from 'primeng/api';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

export const ANONYMOUS_USER: User = {
  id: 0,
  email: undefined,
  nom: '',
  prenom: '',
  pseudo: '',
};

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private refreshTokenTimeout;
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(ANONYMOUS_USER);
  public user$: Observable<User> = this.userSubject.asObservable();

  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => {
    console.log('isLoggedIn$ ? ', user.id, ' ', (!!user.id ? 'Oui' : 'Non'));
    return !!user.id;
  }));
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

  constructor(private router: Router, private http: HttpClient, private messageService: MessageService) {
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, {email, password}, httpOptions)
      .pipe(
        tap(rep => console.log(rep)),
        map(rep => {
          const user = {...rep.data.user, jwtToken: rep.data.token};
          console.log('User connected : ', user);
          this.userSubject.next(user);
          this.startRefreshTokenTimer();
          return user;
        }),
        shareReplay(),
        catchError(err => {
          this.stopRefreshTokenTimer();
          this.userSubject.next(ANONYMOUS_USER);
          return throwError('bug');
          // return of('');
        }));
  }

  register(prenom: string, nom: string, pseudo: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, {prenom, nom, pseudo, email, password}, httpOptions)
      .pipe(
        tap(rep => console.log(rep)),
        map(rep => {
          const user = {...rep.data.user, jwtToken: rep.data.token};
          console.log('User connected : ', user);
          return user;
        }),
        shareReplay(),
        catchError(err => {
          this.stopRefreshTokenTimer();
          this.userSubject.next(ANONYMOUS_USER);
          return throwError('bug');
          // return of('');
        }));
  }

  logout(): void {
    const oldUser = this.userValue;
    this.http.post<any>(`${environment.apiUrl}/auth/logout`, {}, httpOptions).subscribe(
      () => this.messageService.add({
        severity: 'info',
        summary: 'Déconnexion',
        detail: `A bientôt, ${oldUser.prenom} ${oldUser.nom}`,
        key: 'main'
      })
    );
    this.stopRefreshTokenTimer();
    this.userSubject.next(ANONYMOUS_USER);

    this.router.navigate(['/login']);
  }


  refreshToken(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/refresh`, {}, httpOptions)
      .pipe(map((rep) => {
        const user = {...rep.data.user, jwtToken: rep.data.token};
        this.userSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  private startRefreshTokenTimer(): void {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));
    const expires = moment(+jwtToken.exp * 1000);
    const nbf = moment(+jwtToken.nbf * 1000);
    console.log('date expires : ', expires.format('LLL'));
    console.log('date nbf : ', nbf.format('LLL'));
    const timeout = expires.subtract(1, 'minute');
    console.log('date refresh : ', moment(timeout).format('LLL'));
    const delai = moment.duration(moment(timeout).diff(nbf)).asMilliseconds();
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), delai);
  }

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout);
  }
}
