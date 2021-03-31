import {Component, Input, OnInit} from '@angular/core';
import {Jeu} from '../jeu/Jeu';
import {JeuService} from '../_services/jeu.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-edit-commentaire',
  templateUrl: './edit-commentaire.component.html',
  styleUrls: ['./edit-commentaire.component.css']
})
export class EditCommentaireComponent implements OnInit {
  @Input() jeux: Jeu;
  constructor(
    private jeuService: JeuService,
    private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    this.jeuService.updateCommentary(this.jeux)
      .subscribe(() => this.Back());
  }

  Back(): void {
    const link = ['/jeux/:id', this.jeux.id];
    this.router.navigate(link);
  }
}
