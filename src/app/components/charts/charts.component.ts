import { Component, OnInit } from '@angular/core';
import { Chart_Type1 } from '../../models/Chart_Type1';
import { ChartsService } from '../../services/charts.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  charts:Chart_Type1[];
  

  constructor(private chartsService:ChartsService) { }

  ngOnInit() {
    this.charts = this.chartsService.getCharts();
    console.log("onInit",this.charts)
    
  }

}
