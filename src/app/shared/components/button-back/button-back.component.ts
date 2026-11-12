import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
@Component({
	selector: 'wlk-button-back',
	imports: [
		ButtonModule
	],
	templateUrl: './button-back.component.html',
	styleUrl: './button-back.component.css',
})
export class ButtonBackComponent {

	private readonly location = inject(Location)
	private readonly router = inject(Router)

	goBack(): void {
		if (window.history.length > 1){
			this.location.back()
		}else {
			void this.router.navigate(['/home'])
		}
	}
}
