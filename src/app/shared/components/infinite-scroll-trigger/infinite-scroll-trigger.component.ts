import { Component, output, afterNextRender } from '@angular/core';

@Component({
	selector: 'wlk-infinite-scroll-trigger',
	imports: [],
	templateUrl: './infinite-scroll-trigger.component.html',
	styleUrl: './infinite-scroll-trigger.component.css',
})
export class InfiniteScrollTriggerComponent {

	visible = output<void>()

	constructor(){
		afterNextRender(()=>{
			this.visible.emit();
		})
	}
}
