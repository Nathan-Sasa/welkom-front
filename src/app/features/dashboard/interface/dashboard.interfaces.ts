import { PaymentStatus } from "../../../core/types/payment.type"
// import { RsvpStatus } from "../../../core/types/rsvp.type"
import { EventStatus } from "../../event/interface/event.interface"

export interface IDashboard {
    event: IEventDashboard
    eventStatus: IEventDashboardStatus
    rsvpStat: IRsvpDashboardStat
}

export interface IEventDashboard {
    uuid: string
    title: string
    description: string
    location: string
    dateEventStart: string
    dateEventEnd: string
    timezone: string
}

export interface IRsvpDashboardStat {
    total: number
    pending: number
    confirm: number
    declined: number
}

export interface IEventDashboardStatus {
    countGuests: number
    status: EventStatus
    paymentStatus: PaymentStatus
}