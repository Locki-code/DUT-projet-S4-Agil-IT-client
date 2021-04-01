import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import { Title } from '@angular/platform-browser';

declare var solver: any;

@Component({
  selector: 'app-lp-solver-test',
  templateUrl: './lp-solver-test.component.html',
  styleUrls: ['./lp-solver-test.component.css']
})
export class LpSolverTestComponent implements OnInit {
  readonly probleme = {
    variables: {
      s1: {
        p1: 12,
        benefice: 10
      },
      s2: {
        p1: 11,
        benefice: 10
      },
      s3: {
        p1: 7,
        benefice: 15
      },
      s4: {
        p1: 25,
        benefice: 32
      },
      s5: {
        p1: 10,
        benefice: 7
      },
      s6: {
        p1: 5,
        benefice: 7
      },
    },
    ints: {},
    binaries: {s1: 1, s2: 1, s3: 1, s4: 1, s5: 1, s6: 1},
    constraints: {
      p1: {max: 40},
    },
    opType: 'max',
    optimize: 'benefice'
  };

  constructor(public messageService: MessageService,
              private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Solver test');
  }

  resolutionProbleme(): void {
    const resultat = solver.Solve(this.probleme);
    console.log(resultat);
    let message = '';
    if (resultat.s1) { message += 'Objet 1, '; }
    if (resultat.s2) { message += 'Objet 2, '; }
    if (resultat.s3) { message += 'Objet 3, '; }
    if (resultat.s4) { message += 'Objet 4, '; }
    if (resultat.s5) { message += 'Objet 5, '; }
    if (resultat.s6) { message += 'Objet 6 '; }
    const beneficeTotal = resultat.result;
    const affiche = `Solution : Poids :  ${message}, Bénéfice: ${beneficeTotal}`;
    this.messageService.add({
      key: 'main',
      severity: 'info',
      detail: `${affiche}`,
    });
  }

}
