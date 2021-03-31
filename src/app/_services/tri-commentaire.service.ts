import { Injectable } from '@angular/core';
import {Commentaire} from '../jeu/Commentaire';

@Injectable({
  providedIn: 'root'
})
export class TriCommentaireService {

  constructor() { }

  getCommByDate(commentaires: Commentaire[], sort?: number): Commentaire[] {
    if (!!sort && sort === 1) {
      commentaires = commentaires.sort(this.TriCommCroissant);
    } else {
      commentaires = commentaires.sort(this.TriCommDecroissant);
    }
    return commentaires;
  }

  TriCommCroissant(a: Commentaire, b: Commentaire): number {
    if (a.date_com > b.date_com) {
      return 1;
    }
    return -1;
  }
  TriCommDecroissant(a: Commentaire, b: Commentaire): number {
    if (a.date_com > b.date_com) {
      return -1;
    }
    return 1;
  }
}
