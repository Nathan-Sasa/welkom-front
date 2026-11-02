export interface ITableName {
    uuid: string
    tableName: string
}

export interface ITableRequest {
    tableName: string
    maxSeats: number
}

export interface ITableCreatedResponse {
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