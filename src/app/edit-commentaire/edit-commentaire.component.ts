import {Component, Input, OnInit} from '@angular/core';
import {Jeu} from '../jeu/jeu';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../_services/user.service';
import {AuthentificationService} from '../_services/authentification.service';
import {first} from 'rxjs/operators';
import {TriCommentaireService} from '../_services/tri-commentaire.service';

@Component({
  selector: 'app-edit-commentaire',
  templateUrl: './edit-commentaire.component.html',
  styleUrls: ['./edit-commentaire.component.css']
})
export class EditCommentaireComponent implements OnInit {
  @Input() jeux: Jeu;

  form: any = {
    note: null,
    commentaire: null,
  };
  returnUrl: string;

  formulaire = new FormGroup({
    note: new FormControl('', [Validators.required, Validators.minLength(1)]),
    commentaire: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  constructor(private userService: UserService, private router: Router, private authService: AuthentificationService, private triCommentaireService: TriCommentaireService) { }


  ngOnInit(): void {
  }

  get note(): AbstractControl {
    return this.formulaire.get('note');
  }

  get commentaire(): AbstractControl {
    return this.formulaire.get('commentaire');
  }

  // tslint:disable-next-line:typedefs typedef

}
