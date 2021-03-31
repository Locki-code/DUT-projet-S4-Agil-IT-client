import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import {Jeu} from '../jeu/jeu';
import {Mecanique} from '../jeu/mecanique';
import {Editeur} from '../jeu/editeur';
import {Theme} from '../jeu/theme';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})



export class JeuService {


  constructor(private http: HttpClient, private router: Router) { }

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
  getMecaniques(): Observable<Mecanique[]>{
    const url = 'http://127.0.0.1:8000/api/mecanics/';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.get<any>(url, httpOptions)
      .pipe(
        map(res => res.data.items),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );
  }

  getEditeurs(): Observable<Editeur[]>{
    const url = 'http://127.0.0.1:8000/api/editeurs/';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.get<any>(url, httpOptions)
      .pipe(
        map(res => res.data.items),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );
  }

  getThemes(): Observable<Theme[]>{
    const url = 'http://127.0.0.1:8000/api/themes/';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.get<any>(url, httpOptions)
      .pipe(
        map(res => res.data.items),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );
  }

  // tslint:disable-next-line:variable-name
  register(nom: string, description: string, theme: number, editeur: number, langue: string, age: string, poids: number, nombre_joueurs: number, categorie: string, duree: string, regles: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<any>(`${environment.apiUrl}/jeux`, {nom, description, theme, editeur, langue, age, poids, nombre_joueurs, duree, regles, categorie}, httpOptions)
      .pipe(
        tap(rep => console.log(rep)),
        map(rep => {
          const jeu = {...rep.data.jeu, jwtToken: rep.data.token};
          console.log('Jeu créé : ', jeu);
          return jeu;
        }),
        shareReplay(),
        catchError(err => {
          return throwError(console.log(err));
          // return of('');
        }));

  }


  /*postData() {
    this.http.post(environment.apiUrl + '/jeux', {
      data: "data",
      to: "to",
      send: "send"
    }, httpOptions).subscribe(rep => {
      console.log(rep);
    });
  }*/
}
