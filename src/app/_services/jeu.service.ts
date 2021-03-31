import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Jeu} from '../jeu/jeu';
import { Mecanic } from '../_models/mecanic';
import {Commentaire} from '../jeu/commentaire';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
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
    console.log(url);
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

  updateCommentary(jeux: Jeu): Observable<any> {
    const url = 'http://localhost:8000/api/jeux/edit';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(url, jeux, httpOptions).pipe(
      tap(_ => this.log(`updated comm id=${jeux.id}`))
    );
  }

  // tslint:disable-next-line:typedef
  private log(log: string) {
    // tslint:disable-next-line:no-console
      console.info(log);
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
  register(nom: string, description: string, theme: number, editeur: number, langue: string, age: string, poids: number, nombre_joueurs: number, categorie: number, duree: string, regles: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<any>(`${environment.apiUrl}/jeux`, {nom, description, theme, editeur, langue, age, poids, nombre_joueurs, categorie, duree, regles}, httpOptions)
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
