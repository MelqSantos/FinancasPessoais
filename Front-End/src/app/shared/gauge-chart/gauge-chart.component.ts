import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.css']
})
export class GaugeChartComponent implements OnChanges, OnInit {
  @Input() percentage: number = 0

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.percentage) {
      this.syncGauge()
    }
  }

  private syncGauge() {
    const perc = Number.isFinite(this.percentage) ? this.percentage : 0
    this.needleValue = perc
    this.bottomLabel = `${perc.toFixed(2)}%`
  }

  public canvasWidth = 300
  public needleValue = 0
  public centralLabel = ''
  public name = ''
  public bottomLabel = '0.00%'
  public options = {
    hasNeedle: true,
    needleColor: '#343A40',
    needleUpdateSpeed: 1000,
    arcColors: ['rgb(255,84,84)', 'rgb(239,214,19)', 'rgb(61,204,91)'],
    arcDelimiters: [30, 70],
    rangeLabel: ['0', '100'],
    needleStartValue: 50,
  }

  ngOnInit() {
    this.syncGauge()
  }

}
