import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProfileComponent} from '../profile/profile.component';
import {UserService} from '../_services/user.service';
import {UserInfo} from '../_models/user-info';

@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.component.html',
  styleUrls: ['./profil-edit.component.css']
})
export class ProfilEditComponent implements OnInit {
  @Input() profil: ProfileComponent;

  formulaire = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(2)]),
    prenom: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]),
  });
  private users: UserInfo;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }


  get nom(): AbstractControl {
    return this.formulaire.get('nom');
  }

  get prenom(): AbstractControl {
    return this.formulaire.get('prenom');
  }

  get email(): AbstractControl {
    return this.formulaire.get('email');
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    console.log(this.formulaire.value);
    this.userService.updateProfile(this.users)
      .subscribe(() => this.goBack());
  }

  goBack(): void{
    const lien = ['/profil'];
    this.router.navigate(lien);
  }
}
