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

jeux : Jeu[];
  jeux$: Observable<Jeu[]>;
  cols: any[];
  sort: number = undefined;
  iconTriName = '';
  iconTriNote = '';

  constructor(private router: Router,
              private jeuService: JeuService) {
  }

  ngOnInit(): void {
    this.jeux$ = this.jeuService.getJeux();
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
    this.jeux$ = this.jeuService.getJeux(this.sort);
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
    this.jeux$ = this.jeuService.getJeux(this.sort);
  }
}
