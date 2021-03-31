import {Commentaire} from './commentaire';
import {Statistique} from './statistique';
import {Tarif} from './tarif';
import {Mecanic} from '../_models/mecanic';

export interface Jeu {
  id: number;
  nom: string;
  description: string;
  editeur_id: number;
  regles: string;
  langue: string;
  url_media: string;
  theme_id: number;
  nombre_joueurs: string;
  duree: string;
  commentaires: Commentaire[];
  statistiques: Statistique;
  tarif: Tarif;

  age: number;
  poids: number;
  categorie: string;
  mecanic: Mecanic[];
}
