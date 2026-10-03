import { Component, signal, input } from '@angular/core';
import { ChartAreaComponent } from '../../../../shared/components/chart-area/chart-area.component';
import { IChartData } from '../../../../shared/components/chart-area/chart-data.interface';
import { simulateAreaData } from '../../../../shared/utils/simulate-data';
import { CalendarComponent } from '../../../../shared/components/calendar/calendar.component';
import { IEventDashboard } from '../../interface/dashboard.interfaces';

@Component({
    selector: 'wlk-rsvp-event-calendar',
    imports: [
		ChartAreaComponent,
        CalendarComponent
	],
    templateUrl: './rsvp-event-calendar.component.html',
    styleUrl: './rsvp-event-calendar.component.css',
})
export class RsvpEventCalendarComponent {

	protected rsvpAnalytic = signal<IChartData[]>(simulateAreaData)

    dateTime = input.required<IEventDashboard>()
}
