import { Component, OnInit } from '@angular/core';
import { Mod } from '../contracts/mod';
import { ModService } from '../services/mod.service';

@Component({
  selector: 'app-mods',
  templateUrl: './mods.component.html',
  styleUrls: ['./mods.component.css']
})
export class ModsComponent implements OnInit {
  response = null;
  error = null;
  mods: Mod[] = [];

  constructor(private _modService: ModService) { }

  ngOnInit(): void {
    this._modService.getMods().subscribe(
      response => {
        this.response = response;
        this.mods = this.response.data.mods;
      },
      error => this.error = error
    );
  }

}
