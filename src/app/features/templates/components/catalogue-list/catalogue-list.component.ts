import { Component, input } from '@angular/core';
import { ICatalogue } from '../../interfaces/catalogue.interface';

@Component({
	selector: 'wlk-catalogue-list',
	imports: [

	],
	templateUrl: './catalogue-list.component.html',
	styleUrl: './catalogue-list.component.css',
})
export class CatalogueListComponent {

	public catalogues = input<ICatalogue[]>()
}
