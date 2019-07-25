import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatMenuModule, MatSidenavModule, MatGridListModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';

import { ChartsComponent } from './components/charts/charts.component';
import { DonutChartItemComponent } from './components/donut-chart-item/donut-chart-item.component';
import { BarChartItemComponent } from './components/bar-chart-item/bar-chart-item.component';

const appRoutes: Routes = [];

@NgModule({
    declarations: [
        AppComponent,
        ChartsComponent,
        DonutChartItemComponent,
        BarChartItemComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        MatMenuModule,
        MatSidenavModule,
        MatGridListModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
