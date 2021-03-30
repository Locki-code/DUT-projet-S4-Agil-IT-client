import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {JeuService} from '../_services/jeu.service';
import {Mecanique} from '../jeu/Mecanique';
import {Editeur} from '../jeu/Editeur';
import {Themes} from '../jeu/Themes';
import {Router} from '@angular/router';
import {ThemeService} from '../_services/theme.service';
import {noop, Observable, of} from 'rxjs';

interface Langue{
  langue: string;
}

interface Age{
  age : number;
}

interface NbJoueurs{
  nbJoueurs : number;
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

  /*mecaniques: Mecanique[];
  mecanique$: Observable<Mecanique[]>;

  editeurs: Editeur[];
  editeur$: Observable<Editeur[]>;

  themes: Themes[];
  theme$: Observable<Themes[]>;*/

  themes: Themes[] = [ {"id": 0, "nom": ""}, {"id":1,"nom":"Abstrait, lettres \u0026 mots"},{"id":2,"nom":"Animaux \u0026 Nature"},{"id":3,"nom":"Autres"},{"id":4,"nom":"Cartoon \u0026 Dessin"},
    {"id":5,"nom":"Enfance \u0026 Contes"},{"id":6,"nom":"Fantastique \u0026 Héroïc Fantasy"},{"id":7,"nom":"Histoire \u0026 Antiquité"},{"id":8,"nom":"Horreur \u0026 Post-Apocalytique"},
    {"id":9,"nom":"Loisirs \u0026 Voyage"},{"id":10,"nom":"Moderne \u0026 Réaliste"},{"id":11,"nom":"Pirates \u0026 Cow-boys"},{"id":12,"nom":"Science Fiction \u0026 Future"}];

  editeurs: Editeur[] = [ {"id": 0, "nom": ""}, {"id":1,"nom":"1-2-3-Games"},{"id":2,"nom":"ADG"},{"id":3,"nom":"Arkhane Asylum Publishing"},{"id":4,"nom":"Bayard Jeux"},{"id":5,"nom":"Blue Orange"},
    {"id":6,"nom":"Catch Up Games"},{"id":7,"nom":"Critical Hit"},{"id":8,"nom":"Diptic Games"},{"id":9,"nom":"Edge Entertainment"},{"id":10,"nom":"Fantasy Flight games"},{
    "id":11,"nom":"France Cartes"},{"id":12,"nom":"Gen-X Games"},{"id":13,"nom":"GRRRE Games"},{"id":14,"nom":"Histoire \u0026amp; Collections"},{"id":15,"nom":"ilopeli"},
    {"id":16,"nom":"Kolossal Games"},{"id":17,"nom":"Lapin Marteau"},{"id":18,"nom":"Les écuries d\u0027Augias"},{"id":19,"nom":"Ludifolie editions"},{"id":20,"nom":"MATTEL"},
    {"id":21,"nom":"Multi-Man Publishing"},{"id":22,"nom":"Oka Luda"},{"id":23,"nom":"OYA"},{"id":24,"nom":"Petit Joueur"},{"id":25,"nom":"Pleasant Company Games"},
    {"id":26,"nom":"Raise Dead Editions"},{"id":27,"nom":"Scriptarium"},{"id":28,"nom":"Sphere Games"},{"id":29,"nom":"Sweet November"},{"id":30,"nom":"Think Fun"},
    {"id":31,"nom":"UGG"},{"id":32,"nom":"What\u0027s Your Game ?"},{"id":33,"nom":"XII Singes"}];

  mecaniques: Mecanique[] = [{"id": 0, "nom": ""}, {"id":1,"nom":"Abstrait"},{"id":2,"nom":"Humour"},{"id":3,"nom":"Jeu de plateau"},{"id":4,"nom":"Enquêtes \u0026 Mystères"},{"id":5,"nom":"Antiquité"},
    {"id":6,"nom":"Western"},{"id":7,"nom":"Jeu de Cartes"},{"id":8,"nom":"Connaissances"},{"id":9,"nom":"jeu de tuiles"},{"id":10,"nom":"Lettres"},{"id":11,"nom":"Politique"},
    {"id":12,"nom":"Dessin"},{"id":13,"nom":"Mime"},{"id":14,"nom":"Zombies"},{"id":15,"nom":"Contes"},{"id":16,"nom":"Observation"},{"id":17,"nom":"Bande dessinée"},
    {"id":18,"nom":"Animaux"},{"id":19,"nom":"Affrontement"},{"id":20,"nom":"Commerce"},{"id":21,"nom":"Jeu de rôle"},{"id":22,"nom":"Chance \u0026 Hasard"},{"id":23,"nom":"Cuisine"},
    {"id":24,"nom":"Bourse \u0026 finances"},{"id":25,"nom":"Divers"},{"id":26,"nom":"Histoire"},{"id":27,"nom":"choix multiples"},{"id":28,"nom":"Jeu d\u0027Ambiance"},
    {"id":29,"nom":"Chiffres"},{"id":30,"nom":"Lettres \u0026 chiffres"}];

  langues: Langue[] = [ {langue: ''}, {langue: 'Français'}, {langue: 'Allemand'}, {langue: 'Suisse'}, {langue: 'Espagnole'}, {langue: 'Suédois'}]

  ages: Age[] = [ {age: null}, {age: 2}, {age: 4}, {age: 6}, {age: 8}, {age: 12}, {age: 14}]

  nbJoueurs: NbJoueurs[] = [ {nbJoueurs: null}, {nbJoueurs: 2}, {nbJoueurs: 3}, {nbJoueurs: 4}, {nbJoueurs: 5}, {nbJoueurs: 6}, {nbJoueurs: 8}]

  durees: Duree[] = [ {duree: ''}, {duree: '- de 10 Minutes'}, {duree: 'Entre 10 et 20 Min'}, {duree: 'Une demi heure'}, {duree: 'une heure'}, {duree: 'Plus d\'une heure'}]

  formulaire = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    regles: new FormControl('', [Validators.required, Validators.minLength(10)]),
    langue: new FormControl('', [Validators.required]),
    poids: new FormControl('', [Validators.required, Validators.pattern('\\d\\d.\\d\\d')]),
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

  constructor(public serviceJeu: JeuService, private serviceTheme: ThemeService) {
  }

  ngOnInit(): void {
    /*this.mecanique$ = this.serviceJeu.getMecaniques();
    this.editeur$ = this.serviceJeu.getEditeurs();
    this.theme$ = this.serviceJeu.getThemes();
    this.mecanique$.subscribe(val => this.mecaniques.push(val), noop, () => this.mecanique$ = of(this.mecaniques))*/
  }

  onSubmit() {
    // tslint:disable-next-line:no-console
    console.info(this.formulaire.value);
    //this.serviceJeu.setJeu(this.formulaire.value);
  }

  /*getMecaniques(): void {
    this.mecanique$.subscribe(val => {this.mecaniques; });
  }

  getEditeurs(): void {
    this.editeur$.subscribe(val => {this.editeurs; });
  }

  getThemes(): void{
    this.theme$.subscribe(val => {this.themes; });
  }*/

}
