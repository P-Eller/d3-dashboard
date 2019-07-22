import { Component, OnInit } from '@angular/core';
import { Chart_Type1 } from '../../models/Chart_Type1';
import { ChartsService } from '../../services/charts.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  donut_charts:Chart_Type1[];
  bar_charts:Chart_Type1[];
  

  constructor(private chartsService:ChartsService) { }

  ngOnInit() {
    this.donut_charts = this.chartsService.getDonutCharts();
    this.bar_charts = this.chartsService.getBarCharts();
    
  }

}
