export interface Pagination<T> {
    content: T[];
    empty: boolean
    first: boolean
    last: boolean
    size: number
    numberOfElements: number
    totalPages: number;
    totalElements: number
}