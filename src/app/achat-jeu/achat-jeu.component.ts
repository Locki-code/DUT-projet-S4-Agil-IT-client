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
  selector: 'app-achat-jeu',
  templateUrl: './achat-jeu.component.html',
  styleUrls: ['./achat-jeu.component.css']
})
export class AchatJeuComponent implements OnInit {
  id: number;
  returnUrl: string;
  loading: boolean;
  user: UserInfo;
  error = '';

  registerForm = new FormGroup({
    date_achat: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lieu: new FormControl('', [Validators.required, Validators.minLength(2)]),
    prix: new FormControl('', [Validators.required, Validators.minLength(2)]),
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
  }

  // tslint:disable-next-line:typedefs typedef
  onSubmit() {
    this.form = {...this.form, ...this.registerForm.value};
    this.loading = true;
    console.log(this.form.prix);
    this.userService.achatJeu(this.id, this.authService.userValue.id, this.form.lieu, Number(this.form.prix), this.form.date_achat)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
          this.messageService.add({severity: 'info', summary: 'Connexion', detail: `Ajout du jeu dans vos achats`, key: 'main'});
        },
        error => {
          console.log('Erreur: ', error);
          // this.error = error.error.data.values[0];
          this.loading = false;
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: this.error, key: 'main'});
        }
      );
  }
  get date_achat(): AbstractControl {
    return this.registerForm.get('date_achat');
  }
  get lieu(): AbstractControl {
    return this.registerForm.get('lieu');
  }
  get prix(): AbstractControl {
    return this.registerForm.get('prix');
  }
  get jeux(): number {
    return this.id;
  }



}
