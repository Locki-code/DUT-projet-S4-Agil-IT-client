import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Jeu} from '../jeu/Jeu';
import {UserService} from '../_services/user.service';
import {ActivatedRoute} from '@angular/router';
import {AuthentificationService} from '../_services/authentification.service';

@Component({
  selector: 'app-mes-jeux',
  templateUrl: './mes-jeux.component.html',
  styleUrls: ['./mes-jeux.component.css']
})
export class MesJeuxComponent implements OnInit {
  cols: any[];
  jeux: Observable<Jeu[]>;

  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthentificationService) { }

  ngOnInit(): void {
    const id = this.authService.userValue.id;
    // console.log('id ' + id);
    this.jeux = this.userService.getMesJeux(id);
    this.jeux.subscribe(
      val => console.log(val)
    );
  }

}
