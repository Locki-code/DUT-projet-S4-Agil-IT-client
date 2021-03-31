import {Commentaire} from './Commentaire';
import {Editeur} from './Editeur';
import {Theme} from './Theme';
import {Mecanic} from '../_models/mecanic';

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
  age: number;
  poids: number;
  categorie: string;
  mecanic: Mecanic[];
}
