import { Component, OnInit } from '@angular/core';
import {JeuService} from '../_services/jeu.service';
import {Observable} from 'rxjs';

class Jeux {
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  jeux: Jeux[];
  jeux$: Observable<Jeux[]>;

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
    this.jeux$ = this.jeuService.getJeux(1)
  }


}
