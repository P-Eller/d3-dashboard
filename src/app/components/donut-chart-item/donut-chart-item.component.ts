import { Component, ElementRef, OnInit, ViewEncapsulation, Input } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';

import { Chart_Type1 } from '../../models/Chart_Type1';

@Component({
selector: 'app-donut-chart-item',
encapsulation: ViewEncapsulation.None,
templateUrl: './donut-chart-item.component.html',
styleUrls: ['./donut-chart-item.component.css']
})
export class DonutChartItemComponent implements OnInit {
@Input() chart: Chart_Type1;

private width: number;
private height: number;

private svg: any;     // TODO replace all `any` by the right type

private radius: number;
private label_radius: number;

private arc: any;
private pie: any;
private color: any;

private g: any;

private total_y: number; //used to calculate percentage

constructor(private container: ElementRef) {}

ngOnInit() {
    this.initSvg(); // prepare svg with one "g"-container
    
    // preparing the data from the service in the correct way 
    var data_array = [];
    let chart = this.chart
    let total_y_counter = 0
    chart.x.forEach(function(key, i) {
        total_y_counter += chart.y[i];
        let data_point = {x: chart.x[i],y: chart.y[i]};
        data_array[i] = data_point;});
    this.total_y = total_y_counter;

    this.drawChart(data_array);
}

private initSvg() {

    this.svg = d3.select(this.container.nativeElement).select("svg");
    this.width = +this.svg.attr('viewBox').split(/\s+|,/)[2];
    this.height = +this.svg.attr('viewBox').split(/\s+|,/)[3];
    this.radius = Math.min(this.width, this.height) / 3;
    this.label_radius = this.radius + 12;

    this.color = d3Scale.scaleOrdinal()
        .range(['#581845', '#900C3F', '#C70039', '#FF5733', '#ffc305', '#d0743c', '#ff8c00']);

    this.arc = d3Shape.arc()
        .outerRadius(this.radius - 10)
        .innerRadius(this.radius - 40);

    this.pie = d3Shape.pie()
        .sort(null) 
        .value((d: any) => d.y);

    this.svg = d3.select(this.container.nativeElement).select('svg')
        .append('g') //create g-conatiner in svg
        .attr('transform', 'translate(' + ((this.width - 100) / 2) + ',' + this.height / 2 + ')'); // move postion of middle-point of chart inside svg

    this.svg.append("text")
        .attr("x", (this.width / 2))             
        .attr("y", 0 - (10 / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Value vs Date Graph");
}

private drawChart(data: any[]) {

    let g = this.svg.selectAll('.arc')
        .data(this.pie(data))
        .enter().append('g')
        .attr('class', 'arc');
    
    g.append('path')
        .attr('d', this.arc)
        .style('fill', d => this.color(d.data.x));

    g.append('text')
        .attr('transform', d => {
            var c = this.arc.centroid(d), //gets the default position middle of the arc

            xp = c[0],
            yp = c[1],
            // pythagorean theorem for hypotenuse
            hp = Math.sqrt(xp * xp + yp * yp); //calulation to move the text more to outside/inside

            return "translate(" + (xp / hp * this.label_radius) + ',' + (yp / hp * this.label_radius) + ")";
        })
        .attr('dy', '.35em')
        .attr('fill','white')
        .text(d => {
            let percent:number;
            percent = d.data.y / this.total_y*100;
            percent = Math.round(percent * 100) / 100

            return percent+" %";
        });

    const legend = this.svg.append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate(0,0)');

    const lg = legend.selectAll('g')
        .data(data)
        .enter()
        .append('g');
    
    lg.append('rect')
        .style("fill",d => this.color(d.x))
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 20)
        .attr('height', 10);
   
    lg.append('text')
        .style('font-family', 'Georgia')
        .style('font-size', '13px')
        .attr('x', 22.5)
        .attr('y', 10)
        .text(d => d.x + " (" +d.y +")");
    
    let offset = 0;
    lg.attr('transform', function(d, i) {
        let x = offset;
        offset += 15; //distance between labels
        return "translate(100,"+ (offset-50)+ ")" //overwrites the old placeholder for translate
        
    });
        
        
}





}
