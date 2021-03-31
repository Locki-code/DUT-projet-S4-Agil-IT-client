import { Component, OnInit } from '@angular/core';
import {JeuService} from '../_services/jeu.service';
import {Jeu} from '../jeu/Jeu';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail-jeu',
  templateUrl: './detail-jeu.component.html',
  styleUrls: ['./detail-jeu.component.css']
})
export class DetailJeuComponent implements OnInit {
  jeux: Jeu;

  constructor(private route: ActivatedRoute,
              private jeuService: JeuService) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.jeuService.getJeuById(id).subscribe(
      val => {
        this.jeux = val;
      }
    );

  }

}
