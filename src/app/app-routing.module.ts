import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {LpSolverTestComponent} from './lp-solver-test/lp-solver-test.component';
import {ListeJeuComponent} from './liste-jeu/liste-jeu.component';
import {MesJeuxComponent} from './mes-jeux/mes-jeux.component';
import { DetailJeuComponent } from './detail-jeu/detail-jeu.component';
import {ProfilEditComponent} from './profil-edit/profil-edit.component';
import {RegisterComponent} from './register/register.component';
import { EditCommentaireComponent } from './edit-commentaire/edit-commentaire.component';
import {AchatJeuComponent} from './achat-jeu/achat-jeu.component';

const routes: Routes = [
  {path: '', component: ListeJeuComponent},
  {path: 'login', component: LoginComponent},
  {path: 'jeux/:id', component: DetailJeuComponent},
  {path: 'jeux/edit/:id', component: EditCommentaireComponent},
  {path: 'inscription', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/jeux', component: MesJeuxComponent},
  {path: 'profile/edit', component: ProfilEditComponent},
  {path: 'profile/achat/:id', component: AchatJeuComponent},
  {path: 'ro', component: LpSolverTestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
