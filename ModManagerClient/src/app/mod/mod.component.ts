import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Mod } from '../contracts/mod';
import { ModService } from '../services/mod.service';

@Component({
  selector: 'app-mod',
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.css']
})
export class ModComponent implements OnInit {
  modId: string;
  response = null;
  error = null;
  mod: Mod;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _modService: ModService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => this.modId = params['id']);

    this._modService.getMod(this.modId).subscribe(
      response => {
        this.response = response;
        this.mod = this.response.data.mod;
      },
      error => {
        this.error = error;
        this._router.navigate(['/404']);
      }
    );
  }

}
