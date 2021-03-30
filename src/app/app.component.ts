import { Component } from '@angular/core';
import * as moment from 'moment';
import {MessageService} from 'primeng/api';
import {AuthentificationService} from './_services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ludotheque-client';

constructor(public messageService: MessageService, public authService: AuthentificationService) {
}

  ngOnInit(): void {
    this.items = [{
      label: 'Accueil',
      icon: 'pi pi-home',
      routerLink: '/dashboard',
      routerLinkActiveOptions: { exact: true },
      command: () => {
        this.accueil();
      }
    },
      {
        label: 'Intro Observable',
        icon: 'pi pi-eye',
        routerLink: '/introObservable',
        routerLinkActiveOptions: { exact: true },
        command: () => {
          this.introObservable();
        }
      },
      {
        label: 'Intro Formulaire',
        icon: 'pi pi-pencil',
        routerLink: '/introFormulaire',
        routerLinkActiveOptions: { exact: true },
        command: () => {
          this.introFormulaire();
        }
      },
      {
        label: 'Jeux',
        icon: 'pi pi-users',
        routerLink: '/jeux',
        routerLinkActiveOptions: { exact: true },
        command: () => {
          this.jeu();
        }
      }];
  }

  accueil(): void {
    console.log('Accueil');
  }

  jeu(): void {
    console.log('Jeu');
  }

  introObservable(): void{
    console.log('Intro Observable');
  }

  introFormulaire(): void{
    console.log('Intro formulaire');
  }

  show(): void {
    const now = moment().format('LL');
    this.messageService.add({
      key: 'main',
      severity: 'info',
      detail: `${this.title}, ${now}`,
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
