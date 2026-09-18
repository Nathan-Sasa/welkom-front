import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router';

@Component({
    selector: 'wlk-cta-section',
    imports: [
		CommonModule,
		RouterLink
    ],
    templateUrl: './cta-section.component.html',
    styleUrl: './cta-section.component.css',
})
export class CtaSectionComponent {
	
}
