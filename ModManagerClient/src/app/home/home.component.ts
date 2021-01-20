import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { GameService } from '../services/game.service';
import { ModService } from '../services/mod.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  response = null;
  error = null;
  gamesCount: number = 0;
  modsCount: number = 0;

  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  pieChartLabels: Label[] = ['Games', 'Mods'];
  pieChartData: number[] = [1, 1]; // default values set to 1, because with 0 chart seems to be not working properly
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];
  pieChartColors = [
    {
      backgroundColor: ['rgba(0, 123, 255, 0.5)', 'rgba(108, 117, 125, 0.5)'],
    },
  ];

  constructor(
    private _gameService: GameService,
    private _modService: ModService
  ) { }

  ngOnInit(): void {
    this._gameService.getGames().subscribe(
      response => {
        this.response = response;
        this.gamesCount = this.response.results;
        this.pieChartData[0] = this.gamesCount;
      },
      error => this.error = error
    );

    this._modService.getMods().subscribe(
      response => {
        this.response = response;
        this.modsCount = this.response.results;
        this.pieChartData[1] = this.modsCount;
      },
      error => this.error = error
    );
  }

  closeErrorAlert() {
    this.error = null;
  }

}
