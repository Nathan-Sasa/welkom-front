import { CategoriesType } from "../../../core/types/category.type"
import { RsvpType } from "../../../core/types/rsvp.type"

export interface IGuest{
    uuid: string
    firstName: string
    lastName: string
    email: string
    telephone: string
    category: CategoriesType
    tableName: string
    rsvpStatus: RsvpType
    sendInvitationStatus: string
    addedAt: string
}

export interface IGuestDetails{
    firstName: string //
    lastName: string
    telephone: string //
    email: string //
    category: CategoriesType
    tableName: string
    rsvp: RsvpType
    sendInvitationStatus: string
    scanInvitationStatus: string
    scannedAt: string
    addedAt: string //
}

export interface IUpdateGuestDetails{
    firstName?: string
    lastName?: string
    telephone?: string
    email?: string
    category?: CategoriesType
    // tableName?: string
    // rsvpStatus?: RsvpType
}