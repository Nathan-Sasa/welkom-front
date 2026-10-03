import { Component, computed, inject, input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ThemeAppService, AppTheme } from '../../../core/theme/themeApp.service';
import { IChartData } from './chart-data.interface';
import { ChartOptions } from '../../utils/apexType';

@Component({
    selector: 'wlk-chart-area',
    imports: [
		NgApexchartsModule
    ],
    templateUrl: './chart-area.component.html',
    styleUrl: './chart-area.component.css',
})
export class ChartAreaComponent {
	private themeService = inject(ThemeAppService);

	public chartData = input<IChartData[]>([])
	public loaderSize = input<string>('scale-50')
	public height = input<number>(300)

	public readonly chartOptions = computed<ChartOptions>(() => {
		const themeActuel = this.themeService['actualTheme']();
		const apexTheme = themeActuel === AppTheme.Dark ? 'dark' : 'light'; 
		const colorFore = themeActuel === AppTheme.Dark ? '#98a2b369' : '#98a2b3cf'
		const gridBorderColor = themeActuel === AppTheme.Dark ? '#9ca3af42' : '#9ca3af7b'
	
		// chart type '"line" | "area" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "violin" | "histogram" | "radar" | "polarArea" | "rangeBar"
		return {
			series: this.chartData(),
			chart: {
				height: this.height(),
				type: 'area',
				foreColor: colorFore,
				background: 'transparent'
			},
			dataLabels: {
				enabled: false,
			},
			colors: [ '#7471706a', '#65745E', '#C75C5C'],
			theme: {
				mode: apexTheme,
			},
			stroke: {
				curve: 'smooth',
				width: 3
			},
			xaxis: {
				type: 'datetime'
			},
			tooltip: {
				x: {
					format: 'MMMM yyyy',
				},
			},
			grid: {
				show: true,
				borderColor: gridBorderColor,
				strokeDashArray: 1,
				opacity: 0.1,
				xaxis: {
					lines: {
						show: false
					}
				},
				yaxis: {
					lines: {
						show: true
					}
				}
			}
		}
	})
}
