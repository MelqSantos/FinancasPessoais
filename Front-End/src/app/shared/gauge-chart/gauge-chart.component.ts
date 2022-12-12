import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.css']
})
export class GaugeChartComponent implements OnInit {

  perc = Number(sessionStorage.getItem('percentual'))

  constructor() { }

  ngOnInit() {}

  public canvasWidth = 300
  public needleValue = this.perc
  public centralLabel = ''
  public name = 'Controle financeiro'
  public bottomLabel = this.perc + '%'
  public options = {
    hasNeedle: true,
    needleColor: '#343A40',
    needleUpdateSpeed: 1000,
    arcColors: ['rgb(255,84,84)', 'rgb(239,214,19)', 'rgb(61,204,91)'],
    arcDelimiters: [30, 70],
    rangeLabel: ['0', '100'],
    needleStartValue: 50,
  }

}
