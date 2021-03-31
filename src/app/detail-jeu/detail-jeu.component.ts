import { Component, OnInit } from '@angular/core';
import {JeuService} from '../_services/jeu.service';
import {Jeu} from '../jeu/Jeu';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Commentaire} from '../jeu/Commentaire';
import {TriCommentaireService} from '../_services/tri-commentaire.service';
import {Statistique} from '../jeu/Statistique';

@Component({
  selector: 'app-detail-jeu',
  templateUrl: './detail-jeu.component.html',
  styleUrls: ['./detail-jeu.component.css']
})
export class DetailJeuComponent implements OnInit {
  jeux: Jeu;
  jeu: Jeu[];
  comm: Commentaire[];
  jeux$: Observable<Jeu[]>;
  sort: number = undefined;
  statistiques : Statistique;

  displayModal: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private jeuService: JeuService,
              private triCommentaireService: TriCommentaireService) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.jeuService.getJeuById(id).subscribe(
      val => {
        this.jeux = val;
      }
    );
    this.jeux$ = this.jeuService.getJeux();
  }

  Modifier(jeux: Commentaire): void {
    const link = ['/jeux/edit', jeux.id];
    this.router.navigate(link);
  }

  TriDateComm(commentaires: Commentaire[]): void {
    if (this.sort === undefined || this.sort === -1) {
      this.sort = 1;
    } else if (this.sort === 1) {
      this.sort = undefined;
    }
    this.comm = this.triCommentaireService.getCommByDate( commentaires, this.sort);
  }

  showModalDialog(): void {
    this.displayModal = true;
  }


  /*getMoyenneNoteById(id: number): number {
    const nt = this.jeux.commentaires.find(n => n.id === id);
    let moyenne = 0;
    nt.jeux.note.forEach(j => moyenne += +j.commentaires.note);
    return moyenne;
  }*/

}
