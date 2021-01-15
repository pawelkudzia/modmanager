import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  gameId: string;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.gameId = params['id']
    });
  }

}
