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
    this.initSvg();
    
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
    this.radius = Math.min(this.width, this.height) / 2;

    this.color = d3Scale.scaleOrdinal()
        .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

    this.arc = d3Shape.arc()
        .outerRadius(this.radius - 10)
        .innerRadius(this.radius - 70);

    this.pie = d3Shape.pie()
        .sort(null)
        .value((d: any) => d.y);

    this.svg = d3.select(this.container.nativeElement).select('svg')
        .append('g')
        .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
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
        .text(d => d.data.x);
}





}
