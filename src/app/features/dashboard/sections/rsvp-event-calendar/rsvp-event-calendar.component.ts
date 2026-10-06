import { Component, signal, input } from '@angular/core';
import { ChartAreaComponent } from '../../../../shared/components/chart-area/chart-area.component';
import { IChartData, IChartRadial } from '../../../../core/interfaces/chart-data.interface';
import { simulateAreaData } from '../../../../shared/utils/simulate-data';
import { CalendarComponent } from '../../../../shared/components/calendar/calendar.component';
import { IEventDashboard, IEventDashboardStatus } from '../../interface/dashboard.interfaces';
import { TagModule } from 'primeng/tag';
import { ChartRadialComponent } from '../../../../shared/components/chart-radial/chart-radial.component';
import { EntryAnimDirective } from '../../../../shared/directives/entry-anim.directive';

@Component({
    selector: 'wlk-rsvp-event-calendar',
    imports: [
		ChartAreaComponent,
        ChartRadialComponent,
        CalendarComponent,
        TagModule,
        EntryAnimDirective
	],
    templateUrl: './rsvp-event-calendar.component.html',
    styleUrl: './rsvp-event-calendar.component.css',
})
export class RsvpEventCalendarComponent {

	protected rsvpAnalytic = signal<IChartData[]>(simulateAreaData)

    rsvpStatusRadial = input.required<IChartRadial>()

    dateTime = input.required<IEventDashboard>()
    eventStatus = input.required<IEventDashboardStatus>()
}
