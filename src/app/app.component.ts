import { Component } from '@angular/core';

//import phillip_example from './shared/phillip_example.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    
      /*
    failCases_donut = phillip_example.graphs[1];
    
  
    examples = [
        {
            title: 'dashboard',
        },
    ];
    */

}



/*
    constructor(){
        
        console.log(phillip_example.graphs[1].type)
        phillip_example.graphs.map(function(graph, index) {
            let donutCharts= [];
            let barCharts= [];
            let undefinedCharts= [];
            switch(graph.type)
            {
            case "DOUGHNUT":
            donutCharts.push(graph);
            break;
            case "BAR":
            barCharts.push(graph);
            break;
            default:
            undefinedCharts.push(graph);
            }
        }
        );
    }
    */