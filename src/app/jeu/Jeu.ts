import {Commentaire} from './Commentaire';

export interface Jeu {
  id: number;
  nom: string;
  description: string;
  editeur_id: string[];
  regles: string;
  langue: string;
  url_media: string;
  theme_id: string[];
  nombre_joueurs: string;
  duree: string;
  commentaires: Commentaire[];
}
