import { Component, OnInit } from '@angular/core';
import {JeuService} from '../_services/jeu.service';
import {Observable} from 'rxjs';
import {Jeu} from '../jeu/jeu';

class Jeux {
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  jeux: Jeu[] = [];
  jeux$: Observable<Jeu[]>;

  responsiveOptions;

  constructor(private jeuService: JeuService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
    let cpt = 0;
    this.jeux$ = this.jeuService.getJeux(1);
    this.jeux$.forEach( jeux => {
      jeux.map( jeu => {
        if (cpt <= 4){
          this.jeux.push(jeu);
        }
        cpt++;
      });
    });
    console.log(this.jeux);
  }


}
