import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {JeuService} from '../_services/jeu.service';
import {Mecanique} from '../jeu/Mecanique';
import {Editeur} from '../jeu/Editeur';
import {Themes} from '../jeu/Themes';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

interface Langue{
  langue: string;
}

interface Age{
  age: number;
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
  styles: [
  ]
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
  selectedMecanique: Mecanique = null;
  editeurs: Editeur[] = [];
  selectedEditeur: Editeur = null;
  themes: Themes[] = [];
  selectedTheme: Themes = null;

  langues: Langue[] = [ {langue: ''}, {langue: 'Français'}, {langue: 'Allemand'}, {langue: 'Suisse'}, {langue: 'Espagnole'}, {langue: 'Suédois'}];

  ages: Age[] = [ {age: null}, {age: 2}, {age: 4}, {age: 6}, {age: 8}, {age: 12}, {age: 14}];

  nbJoueurs: NbJoueurs[] = [ {nbJoueurs: null}, {nbJoueurs: 2}, {nbJoueurs: 3}, {nbJoueurs: 4}, {nbJoueurs: 5}, {nbJoueurs: 6}, {nbJoueurs: 8}];

  durees: Duree[] = [ {duree: ''}, {duree: '- de 10 Minutes'}, {duree: 'Entre 10 et 20 Min'}, {duree: 'Une demi heure'}, {duree: 'une heure'}, {duree: 'Plus d\'une heure'}];

  formulaire = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    regles: new FormControl('', [Validators.required, Validators.minLength(10)]),
    langue: new FormControl('', [Validators.required]),
    poids: new FormControl('', [Validators.required, Validators.pattern('\\d.\\d\\d')]),
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
    console.info(this.formulaire.value);
    this.form = {...this.form, ...this.formulaire.value};
    this.loading = true;
    this.serviceJeu.register(this.form.nom, this.form.description, this.selectedTheme.id, this.selectedEditeur.id, this.form.langue, this.form.age, this.form.poids, this.form.nombre_joueurs, this.selectedMecanique.nom, this.form.duree, this.form.regles)
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
