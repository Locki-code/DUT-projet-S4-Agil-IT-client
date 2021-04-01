import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Jeu} from '../jeu/jeu';
import {UserService} from '../_services/user.service';
import {ActivatedRoute} from '@angular/router';
import {AuthentificationService} from '../_services/authentification.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import { Title } from '@angular/platform-browser';


declare var solver: any;

@Component({
  selector: 'app-mes-jeux',
  templateUrl: './mes-jeux.component.html',
  styleUrls: ['./mes-jeux.component.css']
})
export class MesJeuxComponent implements OnInit {
  cols: any[];
  jeux: Observable<Jeu[]>;
  selectedValues: string[] = [];
  value1: any;

  formulaire = new FormGroup({
    poids: new FormControl('', [Validators.required]),
  });
  private objets = [];

  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthentificationService, private messageService: MessageService,
              private titleService: Title) { }

  ngOnInit(): void {
    const id = this.authService.userValue.id;
    // console.log('id ' + id);
    this.jeux = this.userService.getMesJeux(id);
    this.jeux.subscribe(
      val => console.log(val)
    );
    this.titleService.setTitle('Mes jeux');

  }

  onCheckChange(event, jeu): void {
    if (event.target.checked){
      this.objets.push(jeu);
    }
    else {
      this.objets = this.objets.filter(item => item !== jeu);
    }
  }

  onSubmit(): void {
    const probleme = {
      variables: {},
      ints: {},
      binaries: {},
      constraints: {
        poids: {max: this.formulaire.get('poids').value},
      },
      opType: 'max',
      optimize: 'prix'
    };
/*
    this.jeux.subscribe(
      jeux => {
        console.log(jeux);
      }
    );
*/
    console.log(this.objets);
    this.objets.forEach(jeu => {
      probleme.variables[jeu.jeu.nom] = {
        poids: jeu.jeu.poids,
        prix: jeu.prix
      };
      probleme.binaries[jeu.jeu.nom] = 1;
    });

    const resultat = solver.Solve(probleme);
    let message = '';

    console.log(resultat);

    for (const key in resultat) {
      if (!['bounded', 'feasible', 'isIntegral', 'result'].includes(key)) {
        message += `${key} | `;
      }
    }
    message += `result: ${resultat.result}`;

    console.log(message);

    this.messageService.add({
      key: 'main',
      severity: 'info',
      detail: `${message}`,
    });
  }

}
