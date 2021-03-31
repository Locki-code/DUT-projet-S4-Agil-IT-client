import {Commentaire} from './Commentaire';
import {Editeur} from './Editeur';
import {Theme} from './Theme';
import {Statistique} from './Statistique';
import {Tarif} from './Tarif';

export interface Jeu {
  id: number;
  nom: string;
  description: string;
  editeur_id: Editeur;
  regles: string;
  langue: string;
  url_media: string;
  theme_id: Theme;
  nombre_joueurs: string;
  duree: string;
  commentaires: Commentaire[];
  statistiques: Statistique;
  tarif: Tarif;

}
