import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { EventService } from '../../service/event.service';
import { IEventResponse } from '../../interface/event.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EventCardComponent } from '../event-card/event-card.component';
import { EventSkeletonCardComponent } from '../event-skeleton-card/event-skeleton-card.component';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ActivatedRoute } from '@angular/router';
import { RoleDirective } from '../../../../shared/directives/role/role.directive';

@Component({
	selector: 'wlk-event-list',
	imports: [
		EventCardComponent,
		ProgressSpinnerModule,
		EventSkeletonCardComponent
	],
	templateUrl: './event-list.component.html',
	styleUrl: './event-list.component.css',
})
export class EventListComponent implements OnInit {
	private readonly destroyRef = inject(DestroyRef)
	private readonly event = inject(EventService)
	private readonly route = inject(ActivatedRoute)

	protected role = this.route.snapshot.data['roles'] || []

	protected readonly events = signal<IEventResponse[]>([])

	protected page: number = 0
	private readonly size: number = 10
	protected readonly firstPage = signal<boolean>(true)
	protected lastPage= signal<boolean>(true)
	protected fetching: boolean = false

	eventsLoading = signal<boolean>(true)

	ngOnInit(): void {
		this.loadEvents(true)
		console.log('Role user data : ', this.role)
	}

	loadEvents(initialLoad: boolean = false): void {
		if(this.fetching) return
		if (!initialLoad && this.lastPage()) return

		this.fetching = true
		if(initialLoad) {
			this.page = 0
		}

		// this.eventsLoading.set(true)
		
		this.event.list(this.page, this.size)
		.pipe(takeUntilDestroyed(this.destroyRef))
		.subscribe({
			next: (response) => {
				if(initialLoad){
					this.events.set(response.content)
				}else{
					this.events.set([...this.events(), ...response.content])
				}
				
				this.firstPage.set(response.first === true)
				this.lastPage.set(response.last === true)

				if(!this.lastPage()){
					this.page ++
				}

				this.fetching = false
				this.eventsLoading.set(false)
			},
			error: (error) => {
				console.error('Error fetching events:', error);
				this.eventsLoading.set(false)
				this.fetching = false
			}
		})
	}
}
