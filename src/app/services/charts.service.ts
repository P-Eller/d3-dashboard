import { Injectable } from '@angular/core';

import data from '../shared/phillip_example.json';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  private exampleJson;
  private graphs;

  constructor() { 
    // get data from Json FIle (later API)
    this.exampleJson = data;
    this.graphs = data.graphs;
  }

  getCharts(){
    return this.graphs
  }
  
}
