import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {MenuItem, MessageService} from 'primeng/api';
import {AuthentificationService} from './_services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ludotheque-client';
  items: MenuItem[];

  constructor(public messageService: MessageService, public authService: AuthentificationService) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'RO',
            icon: 'pi pi-chart-line',
            routerLink: ['/ro']
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash'
          },
          {
            separator: true
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link'
          }
        ]
      },
      {
        label: 'Utilisateur',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Profil',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/profile']
          },
          {
            label: 'Mes jeux',
            icon: 'pi pi-fw pi-heart',
          },
        ]
      },
      {
        label: 'Connexion',
        icon: 'pi pi-fw pi-sign-in',
        routerLink: ['/login']
      },
      {
        label: 'Déconnexion',
        icon: 'pi pi-fw pi-power-off',
        command: event => this.logout(),
      }
    ];
  }

  accueil(): void {
    console.log('Accueil');
  }

  jeu(): void {
    console.log('Jeu');
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
