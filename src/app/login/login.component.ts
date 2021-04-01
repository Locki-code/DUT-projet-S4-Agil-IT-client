import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthentificationService} from '../_services/authentification.service';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  loading = false;
  returnUrl: string;
  error = '';

  formulaire = new FormGroup({
    email: new FormControl('robert.duchmol@domain.fr', [Validators.required]),
    password: new FormControl('secret00', [Validators.required])
  });

  constructor(private messageService: MessageService, private authService: AuthentificationService, private router: Router,
              private route: ActivatedRoute,
              private titleService: Title) {
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.titleService.setTitle('Connexion');
  }

  get email(): AbstractControl {
    return this.formulaire.get('email');
  }

  get password(): AbstractControl {
    return this.formulaire.get('password');
  }

  onSubmit(): void {
    this.form = {...this.form, ...this.formulaire.value};
    this.loading = true;
    this.authService.login(this.form.email, this.form.password)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
          this.messageService.add({severity: 'info', summary: 'Connexion', detail: `Bienvenue, ${this.authService.userValue.prenom} ${this.authService.userValue.nom}`, key: 'main'});
        },
        error => {
          console.log('Erreur: ', error);
          // this.error = error.error.data.values[0];
          this.loading = false;
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: this.error, key: 'main'});
        }
      );

    /*
        this.authService.login(this.email.value, this.password.value).subscribe(
          data => {
            this.tokenStorage.saveToken(data.access_token);
            this.tokenStorage.saveUser(data.user$);

            this.roles = this.tokenStorage.getUser().roles;
            this.router.navigate(['/']);
          },
          err => {
            this.formulaire.reset();
            this.formulaire.patchValue({email: this.form.email});
            this.tokenStorage.signOut();
            this.messageService.add({severity: 'error', summary: 'Erreur', detail: err.error.data.values[0], key: 'main'});
          }
        );
    */

  }
}
