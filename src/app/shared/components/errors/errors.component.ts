import { Component, input } from '@angular/core';
import { IExceptions } from '../../../core/interfaces/exception.interface';
import { TagModule } from 'primeng/tag'
import { EntryAnimDirective } from '../../directives/entry-anim.directive';

@Component({
	selector: 'wlk-errors',
	imports: [
		EntryAnimDirective,
		TagModule
	],
	templateUrl: './errors.component.html',
	styleUrl: './errors.component.css',
})
export class ErrorsComponent {
	wlkError = input.required<IExceptions>()
}
