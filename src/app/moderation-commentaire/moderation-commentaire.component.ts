import { Component, OnInit } from '@angular/core';
import {UserInfo} from '../_models/user-info';
import {UserService} from '../_services/user.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {AuthentificationService} from '../_services/authentification.service';


@Component({
  selector: 'app-moderation-commentaire',
  templateUrl: './moderation-commentaire.component.html',
  styleUrls: ['./moderation-commentaire.component.css']
})
export class ModerationCommentaireComponent implements OnInit {
  displayModal: boolean;
  id: number;
  returnUrl: string;
  loading: boolean;
  user: UserInfo;
  error = '';

  registerForm = new FormGroup({
  });
  form: any = {
  };

  constructor(private route: ActivatedRoute, private userService: UserService, private messageService: MessageService, private router: Router, private authService: AuthentificationService) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.id = +this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.userService.getProfile().subscribe(
      user => {
        this.user = {...this.user, ...user};
        this.loading = false;
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'impossible d\'obtenir le profil de l\'utilisateur' , key: 'main'});
        this.loading = false;
        this.router.navigateByUrl('/');
      }
    );
    this.showModalDialog();
  }

  // tslint:disable-next-line:typedefs typedef
  onSubmit() {
    this.form = {...this.form, ...this.registerForm.value};
    this.loading = true;
    this.userService.suppressionCommentaire(this.id)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
          this.messageService.add({severity: 'info', summary: 'Connexion', detail: `Suppresion d'un jeu dans vos achats`, key: 'main'});
        },
        error => {
          console.log('Erreur: ', error);
          // this.error = error.error.data.values[0];
          this.loading = false;
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: this.error, key: 'main'});
        }
      );
  }

  showModalDialog(): void {
    this.displayModal = true;
  }



}

