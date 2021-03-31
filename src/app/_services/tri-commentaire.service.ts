import { Injectable } from '@angular/core';
import {Commentaire} from '../jeu/commentaire';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import {ANONYMOUS_USER} from './authentification.service';
import {User} from '../_models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TriCommentaireService {
  private refreshTokenTimeout;
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(ANONYMOUS_USER);
  private userUrl = 'api/users/id';

  constructor(private http: HttpClient) {
  }


  // tslint:disable-next-line:typedef
  private handleError<T>(operation= 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  getCommByDate(commentaires: Commentaire[], sort?: number): Commentaire[] {
    if (!!sort && sort === 1) {
      commentaires = commentaires.sort(this.TriCommCroissant);
    } else {
      commentaires = commentaires.sort(this.TriCommDecroissant);
    }
    return commentaires;
  }

  TriCommCroissant(a: Commentaire, b: Commentaire): number {
    if (a.date_com > b.date_com) {
      return 1;
    }
    return -1;
  }
  TriCommDecroissant(a: Commentaire, b: Commentaire): number {
    if (a.date_com > b.date_com) {
      return -1;
    }
    return 1;
  }

  // tslint:disable-next-line:variable-name
  ajouterComm(note: number, commentaire: string, jeu_id: number, date_com: Date): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/commentaires`, {note, commentaire, jeu_id, date_com}, httpOptions)
      .pipe(
        tap(rep => console.log(rep)),
        map(rep => {
          const user = {...rep.data.user, jwtToken: rep.data.token};
          console.log('User connected : ', user);
          return user;
        }),
        shareReplay(),
        catchError(err => {
          console.log('erreur mec');
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
