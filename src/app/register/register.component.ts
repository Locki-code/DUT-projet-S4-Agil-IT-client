import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthentificationService} from '../_services/authentification.service';
import {MessageService} from 'primeng/api';
import {first} from 'rxjs/operators';
import {MesValidateurs} from '../mes-validateurs';

@Component({
  selector: 'app-profile-create',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  marked = false;
  theCheckbox = false;
  value: string;
  form: any = {
    email: null,
    password: null
  };
  loading = false;
  returnUrl: string;
  error = '';

  registerForm = new FormGroup({
    prenom: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    nom: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    pseudo: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    // password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*\\d).{8,}')]),
    password: new FormGroup({
      pwd : new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*\\d).{8,}')]),
      confirmPwd : new FormControl(''),
    }, [MesValidateurs.passwordConfirming])

  });

  constructor(private messageService: MessageService, private authService: AuthentificationService, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  toggleVisibility(e): void {
    this.marked = e.target.checked;
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

  get pwd(): AbstractControl {
    return this.registerForm.get('password').get('pwd');
  }

  get confirmPwd(): AbstractControl {
    return this.registerForm.get('password').get('confirmPwd');
  }

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }


  onSubmit(): void {
    this.form = {...this.form, ...this.registerForm.value};
    this.loading = true;
    this.authService.register(this.form.prenom, this.form.nom, this.form.pseudo, this.form.email, this.form.password.confirmPwd)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
          this.messageService.add({severity: 'info', summary: 'Connexion', detail: `Bienvenue sur votre session`, key: 'main'});
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
