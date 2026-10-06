import { Component, input } from '@angular/core';
import { IRecentGuest } from '../../interface/dashboard.interfaces';
import { AvatarModule } from 'primeng/avatar';
// import {}

@Component({
    selector: 'wlk-recent-guest-card',
    imports: [
		AvatarModule
	],
    templateUrl: './recent-guest-card.component.html',
    styleUrl: './recent-guest-card.component.css',
})
export class RecentGuestCardComponent {
	guest = input.required<IRecentGuest>()
}
