import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { CatalogueSelectionService } from '../../services/catalogues-selection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICatalogueResponse, ICustomCatalogue } from '../../interfaces/catalogue.interface';
import { CatalogueService } from '../../services/catalogue.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoFocusModule } from 'primeng/autofocus';
import { DashboardService } from '../../../dashboard/services/dashboard.service';

@Component({
	selector: 'wlk-catalogue-details',
	imports: [
		ButtonModule
	],
	templateUrl: './catalogue-details.component.html',
	styleUrl: './catalogue-details.component.css',
})
export class CatalogueDetailsComponent implements OnInit {

	private readonly destroyRef = inject(DestroyRef)
	private readonly router = inject(Router)
	private readonly catalogueService = inject(CatalogueService)
	private readonly eventSelectedService = inject(CatalogueSelectionService)
	private readonly eventStorage = inject(DashboardService).getEventStorage$()

	protected eventSession = signal<string | null>(this.eventSelectedService.getEventUuid())

	catalogueUuid = input<string>()

	protected catalogue = signal<ICatalogueResponse>(<ICatalogueResponse>{})

	ngOnInit(): void {
		this.loadCatalogue(this.catalogueUuid())
	}

	loadCatalogue(uuid: string | undefined){

		if (!uuid){
			return void this.router.navigate(['/catalogues'])
		}

		this.catalogueService.getByUuid(uuid)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (res) => {
					this.catalogue.set(res)
					console.log('catalogue : ', this.catalogue())
				}
			})
	}


	mockCustom(catalogue: ICatalogueResponse = this.catalogue()){
		if (!catalogue) {
			console.log('catalogue custom : ', catalogue); 
			return
		}
		if (!this.eventSession()) { 
			console.log('event session : ', this.eventSession()); return
		}

		const payload: ICustomCatalogue = {
			templateUuid: catalogue.uuid,
			name: catalogue.name,
			customImage1: catalogue.image1,
			customImage2: catalogue.image2,
			customImage3: catalogue.image3,
			customHasCadre: catalogue.hasCadre,
			customCadreUrl: catalogue.cadre,
			customFontTitle: catalogue.fontTitle,
			customFontBody: catalogue.fontBody,
			customColorPrimary: catalogue.colorPrimary,
			customColorAccent: catalogue.colorAccent,
			defaultConfig: catalogue.defaultConfig
		}

		this.catalogueService.customCatalogueEvent(this.eventSession() !== null ? this.eventSession() as string : '', payload)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (res) => {
					console.log('custom ok : ', res)
					void this.router.navigate(['/dashboard', this.eventStorage?.uuid])
				},
				error : (err) => {
					console.log('error : ', err)
				}
			})
	}

}
