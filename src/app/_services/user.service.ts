import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {UserInfo} from '../_models/user-info';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

  updateProfile(users: UserInfo): Observable<UserInfo>{
    return this.http.put(this.userUrl, users, httpOptions).pipe(
      tap(_ => this.log(`updates users id=${users.id}`)),
      catchError(this.handleError<any>('updateProfile'))
    );
  }
}
