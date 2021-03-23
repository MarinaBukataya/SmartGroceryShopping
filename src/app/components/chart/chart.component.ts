import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input()
  doughnutChartLabels: Label[];
  @Input()
  doughnutChartData: MultiDataSet = [];

  colors: Color[] = [
    {

      backgroundColor: [
        '#1B1E35',
        '#702F43',
        '#BE9B64',
        '#9D7B54',
        '#29382E',
        '#785D3C',
        '#846954',
        '#B48659',
        '#FDB346',
        '#FE6762',
        '#76DD76',
        '#FDFE97'

      ]
    }
  ];


  public barChartOptions: any = {
    legend: { position: 'bottom' },

    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
        }
      }
    }


  }



  doughnutChartType: ChartType = 'doughnut';

  constructor() {
  }

  ngOnInit(): void {
  }

}