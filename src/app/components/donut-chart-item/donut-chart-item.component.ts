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

private arc: any;
private pie: any;
private color: any;

private g: any;

constructor(private container: ElementRef) {}

ngOnInit() {
    this.initSvg(); // prepare svg with one "g"-container
    
    // preparing the data from the service in the correct way 
    var data_array = [];
    let chart = this.chart
    chart.x.forEach(function(key, i) {
        let data_point = {x: chart.x[i],y: chart.y[i]};
    data_array[i] = data_point;});

    this.drawChart(data_array);
}

private initSvg() {

    this.svg = d3.select(this.container.nativeElement).select("svg");
    this.width = +this.svg.attr('width');
    this.height = +this.svg.attr('height');
    this.radius = Math.min(this.width, this.height) / 3;

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
        .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')'); // move postion of middle-point of chart inside svg
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
        .attr('transform', d => 'translate(' + this.arc.centroid(d) + ')')
        .attr('dy', '.35em')
        .text(d => d.data.x+" ("+d.data.y+")");

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
        return "translate(80,"+ (offset-10)+ ")" //overwrites the old placeholder for translate
        
    });
        
        
}





}
