export interface Pagination<T> {
    content: T[];
    size: number
    numberOfElements: number
    totalPages: number;
    totalElements: number
    first: boolean
    last: boolean
}