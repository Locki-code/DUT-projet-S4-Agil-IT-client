import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Jeu} from '../jeu/Jeu';
import { Mecanic } from '../_models/mecanic';

@Injectable({
  providedIn: 'root'
})
export class JeuService {

  constructor(private http: HttpClient) { }

  getJeux(sort?: number, nb?: number): Observable<Jeu[]>{
    let params = '';
    if (!!sort && sort === -1) {
      params = '?sort=nom';
    }else if (!!sort && sort === 1) {
      params = '?sort=note';
    }else if (!!sort && sort === 2) {
      params = '?nbJoueurs=' + nb;
    }else if (!!sort && sort === 3) {
      params = '?theme=' + nb;
    }else if (!!sort && sort === 4) {
      params = '?age=' + nb;
    }else if (!!sort && sort === 5) {
      params = '?editeur=' + nb;
    }

    const url = `http://127.0.0.1:8000/api/jeux${params}`;
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
  getJeuById(id: number): Observable<Jeu> {
    const url = 'http://localhost:8000/api/jeux/' + id;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get<any>(url, httpOptions)
      .pipe(
        map(res => res.data.item),
      );
  }

  getTheme(id?: number): Observable<Mecanic[]> {
    let params = 'themes';
    if (!!id) {
      params = 'theme/' + id;
    }

    const url = `http://127.0.0.1:8000/api/${params}`;
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
  getEditeur(id?: number): Observable<Mecanic[]> {
    let params = 'editeurs';
    if (!!id) {
      params = 'editeur/' + id;
    }

    const url = `http://127.0.0.1:8000/api/${params}`;
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
}

