import { Component, OnInit } from '@angular/core';
import {JeuService} from '../_services/jeu.service';
import {Jeu} from '../jeu/Jeu';

@Component({
  selector: 'app-liste-jeu',
  templateUrl: './liste-jeu.component.html',
  styles: [
  ]
})
export class ListeJeuComponent implements OnInit {

  jeux: Jeu[];
  tri = 0;

  constructor(public serviceJeu: JeuService) {
    // @ts-ignore
    this.serviceJeu = this.serviceJeu.getJeu();
  }

  ngOnInit(): void {}
}
