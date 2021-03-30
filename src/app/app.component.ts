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
