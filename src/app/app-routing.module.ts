import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {LpSolverTestComponent} from './lp-solver-test/lp-solver-test.component';
import {ListeJeuComponent} from './liste-jeu/liste-jeu.component';
import {ProfilEditComponent} from './profil-edit/profil-edit.component';
import {ProfileCreateComponent} from './profile-create/profile-create.component';


const routes: Routes = [
  {path: 'jeux/list', component: ListeJeuComponent},
  {path: 'login', component: LoginComponent},
  {path: 'inscription', component: ProfileCreateComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'ro', component: LpSolverTestComponent},
  {path: 'profile/edit', component: ProfilEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
