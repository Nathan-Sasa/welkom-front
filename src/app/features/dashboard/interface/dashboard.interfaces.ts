import { CategoriesType } from "../../../core/types/category.type"
import { PaymentStatus } from "../../../core/types/payment.type"
import { RsvpCategory, RsvpType } from "../../../core/types/rsvp.type"
// import { RsvpStatus } from "../../../core/types/rsvp.type"
import { EventStatus } from "../../event/interface/event.interface"

export interface IDashboard {
    event: IEventDashboard
    eventStatus: IEventDashboardStatus
    rsvpStat: IRsvpDashboardStat
    recentGuest: IRecentGuest[]
    tables: ITableDashboard[]
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

export interface IRecentGuest {
    uuid: string
    firstName: string
    lastName: string
    category: CategoriesType
    email: string
    telephone: string
    rsvpStatus: RsvpType
}

export interface ITableDashboard {
    tableName: string
    maxSeats: number
    countSeats: number
}