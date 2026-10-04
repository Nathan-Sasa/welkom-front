
export const RSVP_STATUS = {
    PENDING: 'PENDING',
    CONFIRM: 'CONFIRM',
    DECLINED: 'DECLINED',
    INACTIVE: 'INACTIVE',
} as const

export type RsvpStatus = (typeof RSVP_STATUS)[keyof typeof RSVP_STATUS]