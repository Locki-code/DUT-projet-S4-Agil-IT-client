import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Jeu} from '../jeu/Jeu';

@Injectable({
  providedIn: 'root'
})
export class JeuService {

  constructor(private http: HttpClient) { }

  getJeux(): Observable<Jeu>{
    const url = 'http://127.0.0.1:8000/api/jeux/';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.get<any>(url, httpOptions)
      .pipe(
        map(res => res.data.item),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );
  }
}