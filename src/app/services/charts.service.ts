import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor() { }

  getBarCharts(){
    return[
      {
        title:"Production timming",
        type:"BAR",
        xlabel:[],
        x:[
          "On time",
          "Delayed",
          "Others"
        ],
        ylabel:[
          "Cars"
        ],
        y:[
          36231,
          8900,
          69
        ]
      },
      {
        title:"Factory process",
        type:"BAR",
        xlabel:[],
        x:[
          "Success",
          "Failure"
        ],
        ylabel:[
          "Process"
        ],
        y:[
          464778,
          2358
        ]
      }
    ]
  }





  getDonutCharts(){
    return[
      {
        title:"Fail cases",
        type:"DOUGHNUT",
        xlabel:[],
        x:[
          "Critical",
          "Low",
          "Normal",
          "High",
          "None"
        ],
        ylabel:[
          "Issues"
        ],
        y:[
          321,
          3103,
          2358,
          464,
          28965
  
        ]
      },
      
      {
        title:"Production by color",
        type:"DOUGHNUT",
        xlabel:[],
        x:[
          "Red",
          "Blue",
          "Black",
          "White",
          "Other"
        ],
        ylabel:[
          "HECTAREAS"
        ],
        y:[
          5623,
          4332,
          7943,
          8000,
          3234
        ]
      }
      
    ]
  }
}
