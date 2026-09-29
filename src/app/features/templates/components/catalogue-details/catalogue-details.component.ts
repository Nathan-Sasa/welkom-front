import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { CatalogueSelectionService } from '../../services/catalogues-selection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICatalogueResponse } from '../../interfaces/catalogue.interface';
import { CatalogueService } from '../../services/catalogue.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'wlk-catalogue-details',
	imports: [

	],
	templateUrl: './catalogue-details.component.html',
	styleUrl: './catalogue-details.component.css',
})
export class CatalogueDetailsComponent implements OnInit {

	private readonly destroyRef = inject(DestroyRef)
	private readonly router = inject(Router)
	private readonly catalogueService = inject(CatalogueService)
	private readonly eventSelected = inject(CatalogueSelectionService)

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

}
