import { Component, OnInit } from '@angular/core';
import {JeuService} from '../_services/jeu.service';
import {Jeu} from '../jeu/Jeu';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-liste-jeu',
  templateUrl: './liste-jeu.component.html',
  styles: [
  ]
})
export class ListeJeuComponent implements OnInit {

  jeux: Jeu = null;
  cols: any[];
  sort: number = undefined;
  iconTriName = '';
  iconTriNote = '';

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
    this.jeuService.getJeux(this.sort)
      .subscribe(jeux => this.jeux = jeux);
  }

  modifTriName(): void {
    if (this.sort === undefined || this.sort === -1) {
      this.sort = 1;
      this.iconTriName = 'pi-sort-alpha-down';
      this.iconTriNote = '';
    } else if (this.sort === 1) {
      this.sort = undefined;
      this.iconTriName = '';
    }
    this.getJeux();
  }
  modifTriNote(): void {
    if (this.sort === undefined || this.sort === 1) {
      this.sort = -1;
      this.iconTriNote = 'pi-sort-numeric-down';
      this.iconTriName = '';
    } else if (this.sort === -1) {
      this.sort = undefined;
      this.iconTriNote = '';
    }
    this.getJeux();
  }
}
