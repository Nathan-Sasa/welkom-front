import { IEventDashboard } from "../../features/dashboard/interface/dashboard.interfaces"

export const simulateAreaData = [
    {
        name: 'En attente',
        data: [
            {
                x: '2025-04-23',
                y: 233
            },
            {
                x: '2025-05-23',
                y: 195
            },
            {
                x: '2025-06-23',
                y: 162
            },
            {
                x: '2025-07-23',
                y: 135
            },
        ]
    },
    {
        name: 'Confirmé',
        data: [
            {
                x: '2025-04-23',
                y: 120
            },
            {
                x: '2025-05-23',
                y: 150
            },
            {
                x: '2025-06-23',
                y: 180
            },
            {
                x: '2025-07-23',
                y: 200
            },
        ]
    },
    {
        name: 'Réjeté',
        data: [
            {
                x: '2025-04-23',
                y: 0
            },
            {
                x: '2025-05-23',
                y: 0
            },
            {
                x: '2025-06-23',
                y: 0
            },
            {
                x: '2025-07-23',
                y: 0
            },
        ]
    }
]



//event date 
export const simulateDashboardDate: IEventDashboard = {
    uuid: "62f162ae-97e9-4af9-8ebf-7687af2af9ae",
    title: "Mariage test offesetDateTime",
    description: "Description test offesetDateTime",
    location: "La salle",
    dateEventStart: "2026-10-30T18:00:00+01:00",
    dateEventEnd: "2026-10-30T23:00:00+01:00",
    timezone: "Africa/Kinshasa"
}