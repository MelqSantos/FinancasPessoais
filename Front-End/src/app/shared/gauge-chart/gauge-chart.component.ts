import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gauge-chart',
  template: `
  <mwl-gauge
    class="three"
    [max]="100"
    [value]="gaugeValues[3]"
    [animated]="true"
    [animationDuration]="1.5"
  >
  </mwl-gauge>
<h5 style="font-weight: 600">Controle financeiro(%)</h5>
  `
})
export class GaugeChartComponent implements OnInit {
  
  percentageValue: (value: number) => string;

  gaugeValues: any = {
    1: 100,
    2: 50,
    3: 50,
    4: 50,
    5: 50,
    6: 50,
    7: 50,
  };

  interval: any;

  constructor() { }

  ngOnInit() {
    
  }
}
