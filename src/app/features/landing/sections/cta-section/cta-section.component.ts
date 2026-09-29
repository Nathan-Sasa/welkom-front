import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router';
import { Button, ButtonDirective } from 'primeng/button'

@Component({
    selector: 'wlk-cta-section',
    imports: [
    CommonModule,
    RouterLink,
    Button,
    ButtonDirective
],
    templateUrl: './cta-section.component.html',
    styleUrl: './cta-section.component.css',
})
export class CtaSectionComponent {
	
}
