import { Component, computed, inject, input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ThemeAppService, AppTheme } from '../../../core/theme/themeApp.service';
import { IChartData, IChartRadial } from '../../../core/interfaces/chart-data.interface';
import { ChartOptions } from '../../utils/apexType';

@Component({
	selector: 'wlk-chart-radial',
	imports: [
		NgApexchartsModule
	],
	templateUrl: './chart-radial.component.html',
	styleUrl: './chart-radial.component.css',
})
export class ChartRadialComponent {
	private themeService = inject(ThemeAppService);

	public chartRadialData = input.required<IChartRadial>()
	public loaderSize = input<string>('scale-50')
	public height = input<number>(300)


	public readonly chartOptions = computed<ChartOptions>(() => {
		const themeActuel = this.themeService['actualTheme']();
		const apexTheme = themeActuel === AppTheme.Dark ? 'dark' : 'light'; 
		const colorFore = themeActuel === AppTheme.Dark ? '#98a2b369' : '#98a2b3cf'
		const gridBorderColor = themeActuel === AppTheme.Dark ? '#29231F' : '#F6F1EA'
	
		// chart type '"line" | "area" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "violin" | "histogram" | "radar" | "polarArea" | "rangeBar"
		return {
			series: [this.chartRadialData().pending, this.chartRadialData().confirm, this.chartRadialData().declined],
			chart: {
				height: this.height(),
				type: 'donut',
				foreColor: colorFore,
				background: 'transparent'
			},
			colors: [ '#7471706a', '#65745E', '#C75C5C'],
			theme: {
				mode: apexTheme,
			},
			stroke: {
				width: 0,
			},
			plotOptions: {
				pie: {
					borderRadius: 12,
					spacing: 5,
					donut: {
						size: '68%',
						labels: {
							show: true,
							total: {
								show: true,
								label: 'Total Rsvp',
							},
						},
					},
				},
			},
			legend: {
				position: 'bottom',
			},
			labels: ['En attente', 'Confirmés', 'Déclinés']
		}
	})
}
