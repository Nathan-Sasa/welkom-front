import { Component, input } from '@angular/core';
import { IExceptions } from '../../../core/interfaces/exception.interface';

@Component({
	selector: 'wlk-errors',
	imports: [

	],
	templateUrl: './errors.component.html',
	styleUrl: './errors.component.css',
})
export class ErrorsComponent {
	wlkError = input.required<IExceptions>()
}
