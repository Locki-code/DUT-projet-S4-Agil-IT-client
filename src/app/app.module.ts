import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import localeFr from '@angular/common/locales/fr';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthentificationService} from './_services/authentification.service';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {registerLocaleData} from '@angular/common';
import {MomentModule} from 'ngx-moment';
import 'moment/locale/fr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtInterceptorService} from './_services/jwt-interceptor.service';
import { ProfileComponent } from './profile/profile.component';
import {UserService} from './_services/user.service';
import { LpSolverTestComponent } from './lp-solver-test/lp-solver-test.component';
import {MarkdownModule} from 'ngx-markdown';
import { ListeJeuComponent } from './liste-jeu/liste-jeu.component';
import {CardModule} from 'primeng/card';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import { MesJeuxComponent } from './mes-jeux/mes-jeux.component';
import { DetailJeuComponent } from './detail-jeu/detail-jeu.component';
import {ButtonModule} from 'primeng/button';
import { EditCommentaireComponent } from './edit-commentaire/edit-commentaire.component';


registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    LpSolverTestComponent,
    ListeJeuComponent,
    MesJeuxComponent,
    DetailJeuComponent,
    EditCommentaireComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot(),
    AppRoutingModule,
    MomentModule,
    MessagesModule,
    ToastModule,
    HttpClientModule,
    ReactiveFormsModule,
    CardModule,
    MenubarModule,
    TableModule,
    ButtonModule,
  ],
  providers: [AuthentificationService, MessageService,
    {provide: LOCALE_ID, useValue: 'fr-FR'},
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
