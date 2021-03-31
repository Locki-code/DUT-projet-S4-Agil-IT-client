import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {JeuService} from '../_services/jeu.service';
import {Mecanique} from '../jeu/mecanique';
import {Editeur} from '../jeu/editeur';
import {Theme} from '../jeu/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {min} from 'moment';

interface Langue{
  langue: string;
}

interface Age{
  age: string;
}

interface NbJoueurs{
  nbJoueurs: number;
}

interface Duree {
  duree: string;
}


@Component({
  selector: 'app-creer-jeu',
  templateUrl: './creer-jeu.component.html',
  styles: [`
    #button{
      background-color: #f7ba2a;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 12px;
      border-radius: 5px;
    }
  `]
})

export class CreerJeuComponent implements OnInit {

  form: any = {
    nom: null,
    description: null,
    themes: null,
    editeurs: null,
    langue: null,
    age: null,
    poids: null,
    nombre_joueurs: null,
    categorie: null,
    duree: null,
    regles: null
  };

  loading = false;
  returnURL: string;
  mecaniques: Mecanique[] = [];
  selectedMecanique: number;
  editeurs: Editeur[] = [];
  selectedEditeur: number;
  themes: Theme[] = [];
  selectedTheme: number;

  langues: Langue[] = [ {langue: 'Français'}, {langue: 'Allemand'}, {langue: 'Suisse'}, {langue: 'Espagnole'}, {langue: 'Suédois'}];

  ages: Age[] = [ {age: '2'}, {age: '4'}, {age: '6'}, {age: '8'}, {age: '12'}, {age: '14'}];

  nbJoueurs: NbJoueurs[] = [ {nbJoueurs: 2}, {nbJoueurs: 3}, {nbJoueurs: 4}, {nbJoueurs: 5}, {nbJoueurs: 6}, {nbJoueurs: 8}];

  durees: Duree[] = [ {duree: '- de 10 Minutes'}, {duree: 'Entre 10 et 20 Min'}, {duree: 'Une demi heure'}, {duree: 'une heure'}, {duree: 'Plus d\'une heure'}];

  formulaire = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    regles: new FormControl('', [Validators.required, Validators.minLength(10)]),
    langue: new FormControl('', [Validators.required]),
    poids: new FormControl('', [Validators.required, Validators.min(0.1), Validators.max(5)]),
    url_media: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    nombre_joueurs: new FormControl('', [Validators.required]),
    theme: new FormControl('', [Validators.required]),
    duree: new FormControl('', [Validators.required]),
    mecanique: new FormControl('', [Validators.required]),
    editeur: new FormControl('', [Validators.required]),
});

  get nom() {
    return this.formulaire.get('nom');
  }

  get description() {
    return this.formulaire.get('description');
  }

  get regles() {
    return this.formulaire.get('regles');
  }

  get langue() {
    return this.formulaire.get('langue');
  }
  get poids() {
    return this.formulaire.get('poids');
  }

  get url_media() {
    return this.formulaire.get('url_media');
  }

  get age() {
    return this.formulaire.get('age');
  }

  get nombre_joueurs() {
    return this.formulaire.get('nombre_joueurs');
  }

  get duree() {
    return this.formulaire.get('duree');
  }

  get editeur() {
    return this.formulaire.get('editeur');
  }

  get theme() {
    return this.formulaire.get('theme');
  }

  get mecanique() {
    return this.formulaire.get('mecanique');
  }

  constructor(public serviceJeu: JeuService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getMecaniques();
    this.getEditeurs();
    this.getThemes();
    this.returnURL = this.route.snapshot.queryParams.returnUrl || '/';
  }
  onSubmit() {
    // tslint:disable-next-line:no-console
    this.form = {...this.form, ...this.formulaire.value};
    this.loading = true;
    this.serviceJeu.register(this.form.nom, this.form.description, this.selectedTheme, +this.form.editeur, this.form.langue, String(this.form.age) + '', this.form.poids, this.form.nombre_joueurs, this.selectedMecanique, this.form.duree, this.form.regles)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnURL]);
        },
        error => {
          console.log('Erreur: ', error);
          // this.error = error.error.data.values[0];
          this.loading = false;
        }
      );

  }

  getMecaniques(): void {
    this.serviceJeu.getMecaniques()
      .subscribe(mecaniques => {
        mecaniques.map( mec => {
          this.mecaniques.push(mec);
        });
      });
  }

  getEditeurs(): void {
    this.serviceJeu.getEditeurs()
      .subscribe(editeurs => {
        editeurs.map( edit => {
          this.editeurs.push(edit);
        });
      });
  }

  getThemes(): void{
    this.serviceJeu.getThemes()
      .subscribe(themes => {
        themes.map( theme => {
          this.themes.push(theme);
        });
      });
  }
}
