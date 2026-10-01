import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';
import { HeaderComponent } from '../../../../layout/header/header.component';
import { RoleDirective } from '../../../../shared/directives/role/role.directive';
import { CatalogueService } from '../../services/catalogue.service';
import { ICatalogue, ICatalogueResponse } from '../../interfaces/catalogue.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CatalogueListComponent } from '../../components/catalogue-list/catalogue-list.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-template.component',
    imports: [
		RoleDirective,
		HeaderComponent,
		CatalogueListComponent,
		RouterLink
	],
    templateUrl: './catalogue.component.html',
    styleUrl: './catalogue.component.css',
})
export class CatalogueComponent implements OnInit {

	private readonly catalogueService = inject(CatalogueService)
	private readonly destroyRef = inject(DestroyRef)
  	protected readonly list = signal<ICatalogueResponse[]>([])


	ngOnInit(): void {
		this.loadCatalogues()
	}

	loadCatalogues(): void {
		this.catalogueService.getAll()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (values) => {
					if (!values) return
					this.list.set(values)
					console.log('load catalogue ok :', values)
				},
				error: (err) => console.log('load catalogues error : ', err)
			})
	}
}
