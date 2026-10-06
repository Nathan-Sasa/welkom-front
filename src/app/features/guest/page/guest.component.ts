import { Component, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { GuestService } from '../services/guest.service';
import { IGuest } from '../interfaces/guest.interface'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RoleDirective } from '../../../shared/directives/role/role.directive';
// import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { EntryAnimDirective } from '../../../shared/directives/entry-anim.directive';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CategoriesType, CATEGORY_STATUS, GuestCategory, categoryLabels } from '../../../core/types/category.type';
import { GuestListComponent } from '../components/guest-list/guest-list.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { GuestSkeletonListComponent } from '../components/guest-skeleton-list/guest-skeleton-list.component';

interface guestCategories {
    id: number
    name: (typeof categoryLabels)[keyof typeof categoryLabels]
    value: CategoriesType
}

@Component({
    selector: 'wlk-guest',
    imports: [
        ButtonModule,
        FormsModule,
        IconFieldModule,
        InputIcon,
        InputTextModule,
        EntryAnimDirective,
        SelectModule,
        GuestListComponent,
        GuestSkeletonListComponent,
        ProgressSpinnerModule
	],
    templateUrl: './guest.component.html',
    styleUrl: './guest.component.css',
})
export class GuestComponent implements OnInit, OnDestroy {

	private readonly eventUuid = inject(DashboardService).getEventStorage$()?.uuid

    private readonly destroyRef = inject(DestroyRef)
    private guestService = inject(GuestService)
    
    protected guests = signal<IGuest[]>([]) 

    protected page: number = 0
    private readonly size: number = 10
    protected readonly firstPage = signal<boolean>(true)
    protected lastPage= signal<boolean>(true)
    protected fetching: boolean = false
    protected guestsLoading = signal<boolean>(true)
    protected guestEmpty = signal<boolean>(false)


    private searchSubject = new Subject<string>()
	private searchSubscription!: Subscription
    protected searchFocus = signal<boolean>(false)

    category = signal<CategoriesType[]>(['FRIENDS'])
    categories = signal<guestCategories[]>([
        {id: 1, name: categoryLabels.FAMILY, value: CATEGORY_STATUS.FAMILY},
        {id: 2, name: categoryLabels.FRIENDS, value: CATEGORY_STATUS.FRIENDS},
        {id:3, name: categoryLabels.COLLEAGUES, value: CATEGORY_STATUS.COLLEAGUES},
        {id: 4, name: categoryLabels.OTHER, value: CATEGORY_STATUS.OTHER}
    ])

    private categorySubject = new Subject<CategoriesType>()
    private categorySubscription!: Subscription

    ngOnInit(): void {
        console.log('event uuid : ', this.eventUuid)
        this.loadGuestsByEvent(true)

        this.subscriptionSearch()
    }

    loadGuestsByEvent(initializer: boolean = false, search: string = '', category: string = ''): void {

        if(this.fetching) return
		if (!initializer && this.lastPage()) return

		this.fetching = true

		if(initializer) {
			this.page = 0
		}

        if (!this.eventUuid) return
        this.guestsLoading.set(true)

        this.guestService.getGuestsByEvent(
            this.eventUuid, 
            this.page, 
            this.size,
            search,
            category
            )

            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (res) => {
                    this.guestEmpty.set(res.content.length > 0 ? false : true)

                    if (initializer){
                        this.guests.set(res.content)
                    }else{
                        this.guests.set([...this.guests(), ...res.content])
                    }

                    this.firstPage.set(res.first === true)
				    this.lastPage.set(res.last === true)

                    if(!this.lastPage()){
                        this.page ++
                    }

                    this.fetching = false
                    this.guestsLoading.set(false)
                    console.log('guest guest : ', res)
                }
            })
    }


    subscriptionSearch(){
        this.searchSubscription = this.searchSubject.pipe(
			debounceTime(500),
			distinctUntilChanged()
		).subscribe({
            next: (value) => {
                if (value) {
                    this.loadGuestsByEvent(true, value, '')
                    this.searchFocus.set(true)
                }else {
                    this.loadGuestsByEvent(true, '', '')
                    this.searchFocus.set(false)
                }
            }
        })
    }


    onTape(event: Event): void {
		const element = event.target as HTMLInputElement
		this.searchSubject.next(element.value)
	}


    ngOnDestroy(): void {
		if (this.searchSubscription) {
			this.searchSubscription.unsubscribe()
		}
	}
}
