import { Component } from '@angular/core';
import { NavBarComponent } from "../../layouts/nav-bar/nav-bar.component";
import { FooterComponent } from "../../layouts/footer/footer.component";
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavBarComponent, FooterComponent ,HighchartsChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  Highcharts: typeof Highcharts = Highcharts; // Highcharts object


  chartOptions: Highcharts.Options = {
    chart: {
      type: 'line', // Set the chart type globally
      backgroundColor : '#F2F2F2'
      
    },
    title: {
      text: 'Daily Money Collection'
    },
    xAxis: {
      categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'] // Example days
    },
    yAxis: {
      title: {
        text: 'Amount Collected (in $)'
      }
    },
    series: [
      {
        type: 'line', // Specify the type for each series
        name: 'Collection',
        data: [150, 200, 175, 300, 250, 400, 500] // Replace with your actual data
      }
    ],
    credits: {
      enabled: false // Removes the Highcharts branding
    }
  };

 

}
