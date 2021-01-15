import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-mod',
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.css']
})
export class ModComponent implements OnInit {
  modId: string;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.modId = params['id']
    });
  }

}
