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

interface IPieChartDetails {
    x: string,
    y: number
}
