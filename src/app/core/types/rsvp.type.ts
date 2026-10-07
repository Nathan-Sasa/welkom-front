
export const RSVP_STATUS = {
    PENDING: 'PENDING',
    CONFIRM: 'CONFIRM',
    DECLINED: 'DECLINED',
    INACTIVE: 'INACTIVE',
} as const

export type RsvpType = (typeof RSVP_STATUS)[keyof typeof RSVP_STATUS]

export enum RsvpCategory {
    PENDING = 'PENDING',
    CONFIRM = 'CONFIRM',
    DECLINED = 'DECLINED',
    INACTIVE = 'INACTIVE',
    ALL = '',
}

export const rsvpLabels = {
    PENDING: 'En attente',
    CONFIRM: 'Confirmé',
    DECLINED: 'Décliné',
    INACTIVE: 'Inactive',
    ALL: 'Tous',
}