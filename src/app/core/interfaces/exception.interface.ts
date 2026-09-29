export interface IExceptions {
    error : errorMessage
    name: string
    // redirected: string | undefined
    // responseType: string | undefined
    status: number
}

interface errorMessage {
    message: string
}