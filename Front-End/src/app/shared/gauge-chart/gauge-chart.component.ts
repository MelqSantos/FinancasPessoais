import { Component, OnInit } from '@angular/core';
import { MesService } from 'src/app/service/mes.service';
import { Mes } from 'src/model/Mes';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.css']
})
export class GaugeChartComponent implements OnInit {

  public mes: Mes = new Mes();
  date: Date = new Date()
  idMes = this.date.getMonth() + 1

  public somaDespesa: number = 0;
  public somaReceita: number = 0;

  perc = Number(sessionStorage.getItem('percentual'))

  constructor() { }

  ngOnInit() {
    console.log(this.perc)
  }

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
