export interface IDashboard {
    event: IEventDashboard
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