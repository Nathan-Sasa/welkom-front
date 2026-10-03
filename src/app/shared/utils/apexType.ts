import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexNonAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexYAxis,
    ApexTitleSubtitle,
    ApexDataLabels,
    ApexStroke,
    ApexFill,
    ApexLegend,
    ApexTooltip,
    ApexMarkers,
    ApexPlotOptions,
    ApexResponsive,
    ApexGrid,
    ApexAnnotations,
    ApexStates,
    ApexTheme,
    NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
    series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
    chart?: ApexChart;
    xaxis?: ApexXAxis;
    yaxis?: ApexYAxis | ApexYAxis[];
    title?: ApexTitleSubtitle;
    subtitle?: ApexTitleSubtitle;
    dataLabels?: ApexDataLabels;
    stroke?: ApexStroke;
    fill?: ApexFill;
    legend?: ApexLegend;
    tooltip?: ApexTooltip;
    markers?: ApexMarkers;
    plotOptions?: ApexPlotOptions;
    responsive?: ApexResponsive[];
    grid?: ApexGrid;
    annotations?: ApexAnnotations;
    states?: ApexStates;
    theme?: ApexTheme;
    colors?: string[];
    labels?: any;
};