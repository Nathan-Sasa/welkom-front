import { Component, input, ChangeDetectionStrategy, computed } from '@angular/core';
import { IEventDashboard } from '../../../features/dashboard/interface/dashboard.interfaces';
import { getDateParts } from '../../utils/calendar-date.util';
import { getStartOfWeek } from '../../utils/calendar-date.util';
import { DatePipe } from '@angular/common';

interface CalendarDay {
	date: Date
	dayNumber: number
	dayName: string

	isEventDay: boolean
	isStartDay: boolean
	isEndDay: boolean
}

interface CalendarWeek {
	days : CalendarDay[]
}

@Component({
    selector: 'wlk-calendar',
    imports: [
	],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {
	readonly dateTime = input.required<IEventDashboard>()

	protected readonly calendarMonthYear = computed(() => {
		const start = this.eventStartDate()

		const date = new Date(
			start.year,
			start.month - 1,
			start.day
		)

		const value = new Intl.DateTimeFormat('fr-FR', {
			month: 'long',
			year: 'numeric'
		}).format(date)

		return value.charAt(0).toUpperCase() + value.slice(1)
	})

	protected readonly calendarTimezone = computed(() => {
		const zone = this.dateTime().timezone.split('/')

		return zone[1]
	})

	protected readonly eventStartDate = computed(() => {
		const event = this.dateTime()
		return getDateParts(event.dateEventStart, event.timezone)
	})

	protected readonly eventEndDate = computed(() => {
		const event = this.dateTime()
		return getDateParts(event.dateEventEnd, event.timezone)
	})

	protected readonly week = computed<CalendarDay[]>(() => {

		const event = this.dateTime()

		const start = this.eventStartDate()
		const end = this.eventEndDate()!

		const eventDate = new Date(
			start.year,
			start.month - 1,
			start.day
		)

		const weekStart = getStartOfWeek(eventDate)

		return Array.from(
			{ length: 7 },
			(_, index) => {
				const date = new Date(weekStart)

				date.setDate(
					weekStart.getDate() + index
				)

				const isEventDay = this.isEventDay(date)

				return {
					date,
					dayNumber: date.getDate(),
					dayName: date.toLocaleDateString(
						'fr-FR',
						{ weekday: 'short' }
					),
					isEventDay,
					isStartDay: isEventDay && this.isSameDate(
						date,
						start
					),
					isEndDay: isEventDay && this.isSameDate(
						date,
						end
					)
				}
			}
		)
	})

	private isSameDate(
		date: Date,
		parts: {
			year: number
			month: number
			day: number
		}
		): boolean {

		return (
			date.getFullYear() === parts.year &&
			date.getMonth() + 1 === parts.month &&
			date.getDate() === parts.day
		)
	}

	// protected readonly week = computed(() => {
	// 	const event = this.dateTime()

	// 	const startParts = getDateParts(
	// 		event.dateEventStart,
	// 		event.timezone
	// 	)

	// 	const eventDate = new Date(
	// 		startParts.year,
	// 		startParts.month - 1,
	// 		startParts.day
	// 	)

	// 	const weekStart = getStartOfWeek(
	// 		eventDate
	// 	)

	// 	return Array.from(
	// 		{ length: 7 },
	// 		(_, index) => {
	// 			const date = new Date(
	// 				weekStart
	// 			)

	// 			date.setDate(
	// 				weekStart.getDate() + index
	// 			)
	// 			return date
	// 		}
	// 	)
	// })

	protected isEventDay(date: Date): boolean {

		const start = this.eventStartDate()
		const end = this.eventEndDate()

		const current = {
			year: date.getFullYear(),
			month: date.getMonth() + 1,
			day: date.getDate()
		}

		const currentTime = Date.UTC(
			current.year,
			current.month - 1,
			current.day
		)

		const startTime = Date.UTC(
			start.year,
			start.month - 1,
			start.day
		)

		const endTime = Date.UTC(
			end.year,
			end.month - 1,
			end.day
		)

		return (
			currentTime >= startTime &&
			currentTime <= endTime
		)
	}


	protected formatEventTime(
		dateTime: string
	): string {

		return new Intl.DateTimeFormat(
			'fr-FR',
			{
			timeZone: this.dateTime().timezone,
			hour: '2-digit',
			minute: '2-digit',
			hourCycle: 'h23'
			}
		).format(
			new Date(dateTime)
		)
	}
}
