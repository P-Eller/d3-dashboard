import { Component, ElementRef, ViewEncapsulation, OnInit, Input } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { Chart_Type1 } from '../../models/Chart_Type1';

@Component({
  selector: 'app-bar-chart-item',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-chart-item.component.html',
  styleUrls: ['./bar-chart-item.component.css']
})
export class BarChartItemComponent implements OnInit {

    
@Input() chart: Chart_Type1;

private width: number;
private height: number;
private margin = {top: 40, right: 40, bottom: 60, left: 80};

private x: any;
private y: any;
private svg: any;
private g: any;

private data_array: any[];

constructor(private container: ElementRef) {}

ngOnInit() {
    var data_array = [];
    let chart = this.chart
    chart.x.forEach(function(key, i) {
        let data_point = {x: chart.x[i],y: chart.y[i]};
    data_array[i] = data_point;});
    this.data_array = data_array;
    
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
    
}

private initSvg() {
    this.svg = d3.select(this.container.nativeElement).select('svg');
    this.width = +this.svg.attr('viewBox').split(/\s+|,/)[2]- this.margin.left - this.margin.right;
    this.height = +this.svg.attr('viewBox').split(/\s+|,/)[3]- this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
}

private initAxis() {
    
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.data_array.map((d) => d.x));
    this.y.domain([0, d3Array.max(this.data_array, (d) => d.y)]);
}

private drawAxis() {
    this.g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3Axis.axisBottom(this.x));
    this.g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3Axis.axisLeft(this.y))
        .append('text')
        .attr('class', 'axis-title')
        //.attr('transform', 'rotate(-90)')
        //.attr('y', 6)
        //.attr('dy', '0.71em')
        //.attr('text-anchor', 'end')
        .text(this.chart.ylabel);
}

private drawBars() {
    this.g.selectAll('.bar')
        .data(this.data_array)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => this.x(d.x) )
        .attr('y', (d) => this.y(d.y) )
        .attr('width', this.x.bandwidth())
        .attr('height', (d) => this.height - this.y(d.y) );
}

}
