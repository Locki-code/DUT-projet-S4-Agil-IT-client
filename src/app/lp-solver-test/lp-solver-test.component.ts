import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';

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
        p2: 11,
        p3: 7,
        p4: 25,
        p5: 10,
        p6: 5
      },
      s2: {
        p1: 10,
        p2: 10,
        p3: 15,
        p4: 32,
        p5: 7,
        p6: 7
      },
    },
    ints: {s1: 1, s2: 1},
    binaries: {},
    constraints: {
      s1: {max: 40},
      s2: {max: 6},
    },
    opType: 'max',
    optimize: 'o1'
  };

  constructor(public messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  resolutionProbleme(): void {
    const resultat = solver.Solve(this.probleme);
    console.log(resultat);
    const nbS1 = resultat.s1;
    const nbS2 = resultat.s2;
    const beneficeTotal = resultat.result;
    const affiche = `Solution : Poids :  ${nbS1}, Prix total : ${nbS2}`;
    this.messageService.add({
      key: 'main',
      severity: 'info',
      detail: `${affiche}`,
    });
  }

}
