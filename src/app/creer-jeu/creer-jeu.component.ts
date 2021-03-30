import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {JeuService} from '../_services/jeu.service';
import {Mecanique} from '../jeu/Mecanique';
import {Editeur} from '../jeu/Editeur';
import {Themes} from '../jeu/Themes';
import {Router} from '@angular/router';

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

  mecaniques: Mecanique;

  editeurs: Editeur;

  langues: Langue[] = [ {langue: 'Français'}, {langue: 'Allemand'}, {langue: 'Suisse'}, {langue: 'Espagnole'}, {langue: 'Suédois'}]

  ages: Age[] = [ {age: 2}, {age: 4}, {age: 6}, {age: 8}, {age: 12}, {age: 14}]

  nbJoueurs: NbJoueurs[] = [ {nbJoueurs: 2}, {nbJoueurs: 3}, {nbJoueurs: 4}, {nbJoueurs: 5}, {nbJoueurs: 6}, {nbJoueurs: 8}]

  themes: Themes;

  durees: Duree[] = [ {duree: '- de 10 Minutes'}, {duree: 'Entre 10 et 20 Min'}, {duree: 'Une demi heure'}, {duree: 'une heure'}, {duree: 'Plus d\'une heure'}]

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

  constructor(public serviceJeu: JeuService, private router: Router) {
  }

  ngOnInit(): void {
    this.getMecaniques();
    this.getEditeurs();
    this.getThemes();
  }

  onSubmit() {
    // tslint:disable-next-line:no-console
    console.info(this.formulaire.value);
    //this.serviceJeu.setJeu(this.formulaire.value);
  }

  getMecaniques(): void {
    this.serviceJeu.getMecaniques()
      .subscribe(mecanique => console.log("Mécanique : " + mecanique));
  }

  getEditeurs(): void {
    this.serviceJeu.getEditeurs()
      .subscribe(editeur => this.editeurs = editeur);
  }

  getThemes(): void{
    this.serviceJeu.getThemes()
      .subscribe(theme => this.themes = theme);
  }

}
