export interface IChartData {
    name: string | undefined
    data:IChartDataDetails[]
}

export interface IChartDataDetails {
    x: string,
    y: number
}

export interface IPieChartData {
    name: string | undefined
    data: IPieChartDetails[]
}

export interface IChartRadial {
    confirm: number
    declined: number
    pending: number
    total: number
}

interface IPieChartDetails {
    x: string,
    y: number
}
