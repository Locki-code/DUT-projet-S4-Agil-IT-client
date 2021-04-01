import { Component, OnInit } from '@angular/core';
import {JeuService} from '../_services/jeu.service';
import {Jeu} from '../jeu/jeu';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Theme} from '../_models/theme';
import {Editeur} from '../_models/editeur';
import { Title } from '@angular/platform-browser';

interface Age{
  age: number;
}

interface NbJoueurs{
  nbJoueurs: number;
}

@Component({
  selector: 'app-liste-jeu',
  templateUrl: './liste-jeu.component.html',
  styles: [
  ]
})
export class ListeJeuComponent implements OnInit {
  ages: Age[] = [{age: 2}, {age: 4}, {age: 6}, {age: 8}, {age: 12}, {age: 14}];
  nbJoueurs: NbJoueurs[] = [{nbJoueurs: 2}, {nbJoueurs: 3}, {nbJoueurs: 4}, {nbJoueurs: 5}, {nbJoueurs: 6}, {nbJoueurs: 8}];
  themes: Theme[] = [];
  editeurs: Editeur[] = [];
  selectedTheme: Theme;
  selectedNbJoueur: NbJoueurs;
  selectedEditeur: Editeur;
  selectedAge: Age;
  jeux: Jeu[];
  jeux$: Observable<Jeu[]>;
  cols: any[];
  sort: number = undefined;
  iconTriName = '';
  iconTriNote = '';

  constructor(private router: Router,
              private jeuService: JeuService,
              private titleService: Title) {
  }

  ngOnInit(): void {
    this.jeux$ = this.jeuService.getJeux();
    this.getTheme();
    this.getEditeur();
    this.titleService.setTitle('Liste des jeux');
  }

  getTheme(): void{
    this.jeuService.getTheme()
    .subscribe(theme => {
      theme.map( mec => {
        this.themes.push(mec);
      });
    });
  }

  getEditeur(): void{
    this.jeuService.getEditeur()
      .subscribe(editeur => {
        editeur.map( edit => {
          this.editeurs.push(edit);
        });
      });
  }

  modifTriName(): void {
    if (this.sort ===  -1) {
      this.sort = undefined;
    }else {
      this.selectedEditeur = null;
      this.selectedTheme = null;
      this.selectedAge = null;
      this.selectedNbJoueur = null;
      this.sort = -1;
    }
    this.jeux$ = this.jeuService.getJeux(this.sort);
  }
  modifTriNote(): void {
    if (this.sort ===  1) {
      this.sort = undefined;
    }else {
      this.selectedEditeur = null;
      this.selectedTheme = null;
      this.selectedAge = null;
      this.selectedNbJoueur = null;
      this.sort = 1;
      }
    this.jeux$ = this.jeuService.getJeux(this.sort);
  }

  selectFilterNbJoueur(): void{
    this.sort = undefined;
    this.iconTriNote = '';
    this.iconTriName = '';
    this.selectedEditeur = null;
    this.selectedTheme = null;
    this.selectedAge = null;
    this.sort = 2;
    this.jeux$ = this.jeuService.getJeux(this.sort, this.selectedNbJoueur.nbJoueurs);
  }
  selectFilterTheme(): void{
    this.sort = undefined;
    this.iconTriNote = '';
    this.iconTriName = '';
    this.selectedEditeur = null;
    this.selectedNbJoueur = null;
    this.selectedAge = null;
    this.sort = 3;
    this.jeux$ = this.jeuService.getJeux(this.sort, this.selectedTheme.id);
  }
  selectFilterAge(): void{
    this.sort = undefined;
    this.iconTriNote = '';
    this.iconTriName = '';
    this.selectedEditeur = null;
    this.selectedTheme = null;
    this.selectedNbJoueur = null;
    this.sort = 4;
    this.jeux$ = this.jeuService.getJeux(this.sort, this.selectedAge.age);
  }
  selectFilterEditeur(): void{
    this.sort = undefined;
    this.iconTriNote = '';
    this.iconTriName = '';
    this.selectedTheme = null;
    this.selectedNbJoueur = null;
    this.selectedAge = null;
    this.sort = 5;
    this.jeux$ = this.jeuService.getJeux(this.sort, this.selectedEditeur.id);
  }
}
