import { Component, OnInit } from '@angular/core';
import {JeuService} from '../_services/jeu.service';
import {Jeu} from '../jeu/Jeu';
import {Router} from '@angular/router';

@Component({
  selector: 'app-liste-jeu',
  templateUrl: './liste-jeu.component.html',
  styles: [
  ]
})
export class ListeJeuComponent implements OnInit {

  jeux: Jeu = null;
  cols: any[];

  constructor(private router: Router,
              private jeuService: JeuService) {
  }

  ngOnInit(): void {
    this.getJeux();
    this.cols = [
      { field: 'id', header: 'Identifiant' },
      { field: 'nom', header: 'Nom' },
      { field: 'nombre_joueurs', header: 'Nombre joueur' },
      { field: 'duree', header: 'Durée' }
    ];
  }

  getJeux(): void {
    this.jeuService.getJeux()
      .subscribe(jeux => this.jeux = jeux);
  }
}
