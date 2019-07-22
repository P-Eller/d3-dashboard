import { Component, OnInit } from '@angular/core';
import { Chart_Type1 } from '../../models/Chart_Type1';
import { ChartsService } from '../../services/charts.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  donut_chart_1:Chart_Type1[];
  donut_chart_2:Chart_Type1[];
  bar_chart_1:Chart_Type1[];
  bar_chart_2:Chart_Type1[];
  

  constructor(private chartsService:ChartsService) { }

  ngOnInit() {
    console.log(this.chartsService.getDonutCharts());
    console.log("lasdjn",this.chartsService.getDonutCharts()[0]);
    this.donut_chart_1 = [this.chartsService.getDonutCharts()[0]];
    this.donut_chart_2 = [this.chartsService.getDonutCharts()[1]];
    this.bar_chart_1 = [this.chartsService.getBarCharts()[0]];
    this.bar_chart_2 = [this.chartsService.getBarCharts()[1]];
    
  }

}
