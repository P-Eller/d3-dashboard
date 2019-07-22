import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatMenuModule, MatSidenavModule } from '@angular/material';

import { AppComponent } from './app.component';

import { TodosComponent } from './components/todos/todos.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { ChartsComponent } from './components/charts/charts.component';
import { DonutChartItemComponent } from './components/donut-chart-item/donut-chart-item.component';
import { BarChartItemComponent } from './components/bar-chart-item/bar-chart-item.component';

const appRoutes: Routes = [];

@NgModule({
    declarations: [
        AppComponent,
        TodosComponent,
        TodoItemComponent,
        ChartsComponent,
        DonutChartItemComponent,
        BarChartItemComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        MatMenuModule,
        MatSidenavModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
