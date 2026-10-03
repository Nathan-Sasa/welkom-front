import { Component, input } from '@angular/core';
import { ICatalogue, ICatalogueResponse } from '../../interfaces/catalogue.interface';
import { RouterLink } from '@angular/router';

import { Button } from 'primeng/button'
import { EntryAnimDirective } from '../../../../shared/directives/entry-anim.directive';

@Component({
	selector: 'wlk-catalogue-list',
	imports: [
		RouterLink,
		EntryAnimDirective
	],
	templateUrl: './catalogue-list.component.html',
	styleUrl: './catalogue-list.component.css',
})
export class CatalogueListComponent {

	public catalogues = input<ICatalogueResponse[]>()
}
