import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthentificationService} from '../_services/authentification.service';
import {MessageService} from 'primeng/api';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile-create.component.html',
  styleUrls: ['./profile-create.component.css']
})
export class ProfileCreateComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  loading = false;
  returnUrl: string;
  error = '';

  registerForm = new FormGroup({
    prenom: new FormControl('', [Validators.required, Validators.minLength(2)]),
    nom: new FormControl('', [Validators.required, Validators.minLength(2)]),
    pseudo: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private messageService: MessageService, private authService: AuthentificationService, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get prenom(): AbstractControl {
    return this.registerForm.get('prenom');
  }

  get nom(): AbstractControl {
    return this.registerForm.get('nom');
  }

  get pseudo(): AbstractControl {
    return this.registerForm.get('pseudo');
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }


  onSubmit(): void {
    this.form = {...this.form, ...this.registerForm.value};
    this.loading = true;
    this.authService.register(this.form.prenom, this.form.nom, this.form.pseudo, this.form.email, this.form.password)
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
