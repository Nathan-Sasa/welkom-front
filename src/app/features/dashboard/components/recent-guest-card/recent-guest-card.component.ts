import { Component, input } from '@angular/core';
import { IRecentGuest } from '../../interface/dashboard.interfaces';
import { AvatarModule } from 'primeng/avatar';
import { CategoriesType } from '../../../../core/types/category.type';
import { toFrenchCategory } from '../../../../shared/utils/guestCategoriesTranslate';
import { RsvpCategory, RsvpType } from '../../../../core/types/rsvp.type';
import { toBackgroundRsvp, toColorRsvp, toFrenchRsvp } from '../../../../shared/utils/rsvpTranslate';
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

    frenchCategory(category: CategoriesType): string {
        return toFrenchCategory(category)
    }

    frenchRsvp(rsvp: RsvpType): string {
        return toFrenchRsvp(rsvp)
    }

    colorRsvp(rsvp: RsvpType): string {
        return toColorRsvp(rsvp)
    }

    backgroundRsvp(rsvp: RsvpType): string{
        return toBackgroundRsvp(rsvp)
    }

    
}
