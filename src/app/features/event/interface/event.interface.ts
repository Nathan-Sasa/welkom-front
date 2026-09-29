import { PaymentStatus } from "../../../core/interfaces/payment.interface"

export const EVENT_STATUS = {
    DRAFT: 'DRAFT',
    PENDING: 'PENDING',
    CANCELED: 'CANCELED',
    CONFIRMED: 'CONFIRMED'
} as const

export type EventStatus = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS]

export interface IEvent {
    title: string,
    description: string,
    dateEventStart: string 
    dateEventEnd: string
    address: string
    estimatedGuests: number
    image: string
}

export interface IEventResponse {
    uuid: string,
    title: string,
    description: string,
    dateEventStart: string,
    dateEventEnd: string,
    estimatedGuests: number,
    cover: string,
    eventStatus: EventStatus,
    paymentStatus: PaymentStatus,
    address: string  
}

