export interface ITableName {
    uuid: string
    tableName: string,
    countSeats: number
}

export interface ITableRequest {
    tableName: string
    maxSeats: number
}

export interface ITableResponse {
    id: string
    tableName: string
    maxSeats: number
    countSeats: number
    guest: guestsTable[]
}

interface guestsTable {
    firstName: string
    lastName: string
}

export interface IAssignTableGuest {
    tableName: string,
    guestUuid: string
}