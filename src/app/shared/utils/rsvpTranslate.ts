import { RsvpCategory, rsvpLabels, RsvpType } from "../../core/types/rsvp.type";

export function toFrenchRsvp (rsvp: RsvpType): string {
    switch(rsvp) {
        case 'PENDING':
            return rsvpLabels.PENDING
        case 'CONFIRM':
            return rsvpLabels.CONFIRM
        case 'DECLINED':
            return rsvpLabels.DECLINED
        case 'INACTIVE':
            return rsvpLabels.INACTIVE
        default:
            return rsvpLabels.PENDING
    }
}

export function toColorRsvp(rsvp: RsvpType): string {
    switch(rsvp){
        case 'PENDING':
            return 'text-wlk-content-secondary'
        case 'CONFIRM':
            return 'text-wlk-sage'
        case 'DECLINED':
            return 'text-wlk-danger'
        case 'INACTIVE':
            return 'text-wlk-content-muted/70'
        default:
            return 'text-wlk-content-secondary'
    }
}

export function toBackgroundRsvp(rsvp: RsvpType): string {
    switch(rsvp){
        case 'PENDING':
            return 'bg-wlk-content-secondary/10!'
        case 'CONFIRM':
            return 'bg-wlk-sage/20!'
        case 'DECLINED':
            return 'bg-wlk-danger/20!'
        case 'INACTIVE':
            return 'bg-wlk-content-muted/20!'
        default:
            return 'bg-content-secondary/20!'
    }
}