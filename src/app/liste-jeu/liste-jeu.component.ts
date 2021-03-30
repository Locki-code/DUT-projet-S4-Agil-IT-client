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

  constructor(private router: Router,
              private jeuService: JeuService) {
  }

  ngOnInit(): void {
    this.getJeux();
  }

  getJeux(): void {
    this.jeuService.getJeux()
      .subscribe(jeux => this.jeux = jeux);
  }
}
