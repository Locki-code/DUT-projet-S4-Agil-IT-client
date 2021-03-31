import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProfileComponent} from '../profile/profile.component';
import {UserService} from '../_services/user.service';
import {first} from 'rxjs/operators';
import {AuthentificationService} from '../_services/authentification.service';

@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.component.html',
  styleUrls: ['./profil-edit.component.css']
})
export class ProfilEditComponent implements OnInit {
  @Input() profil: ProfileComponent;

  form: any = {
    prenom: null,
    nom: null,
    pseudo: null,
    email: null,
  };
  returnUrl: string;

  formulaire = new FormGroup({
    prenom: new FormControl('', [Validators.required, Validators.minLength(2)]),
    nom: new FormControl('', [Validators.required, Validators.minLength(2)]),
    pseudo: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private userService: UserService, private router: Router, private authService: AuthentificationService) { }

  ngOnInit(): void {
  }


  get nom(): AbstractControl {
    return this.formulaire.get('nom');
  }

  get prenom(): AbstractControl {
    return this.formulaire.get('prenom');
  }

  get pseudo(): AbstractControl {
    return this.formulaire.get('pseudo');
  }

  get email(): AbstractControl {
    return this.formulaire.get('email');
  }


  // tslint:disable-next-line:typedef
  onSubmit() {
    this.form = {...this.form, ...this.formulaire.value};
    this.authService.refreshToken()
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log('Erreur: ', error);
        }
      );
    console.log(this.formulaire.value);
  }

  goBack(): void{
    const lien = ['/profil'];
    this.router.navigate(lien);
  }
}
