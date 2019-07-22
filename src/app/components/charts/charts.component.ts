import { Component, OnInit } from '@angular/core';
import { DonutChart } from '../../models/DonutChart';
import { ChartsService } from '../../services/charts.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  charts:DonutChart[];
  

  constructor(private chartsService:ChartsService) { }

  ngOnInit() {
    this.charts = this.chartsService.getCharts();
    console.log(this.charts);
    
  }

}
