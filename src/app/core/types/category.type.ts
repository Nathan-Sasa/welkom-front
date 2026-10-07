export const CATEGORY_STATUS = {
    FAMILY: 'FAMILY',
    FRIENDS: 'FRIENDS',
    COLLEAGUES: 'COLLEAGUES',
    OTHER: 'OTHER',
    ALL: '',
} as const

export type CategoriesType = (typeof CATEGORY_STATUS)[keyof typeof CATEGORY_STATUS]

export enum GuestCategory {
    FAMILY = 'FAMILY',
    FRIENDS = 'FRIENDS',
    COLLEAGUES = 'COLLEAGUES',
    OTHER = 'OTHER',
    ALL = '',
}

export const categoryLabels = {
    FAMILY: 'Famille',
    FRIENDS: 'Amis',
    COLLEAGUES: 'Collègues',
    OTHER: 'Autres',
    ALL: 'Tous',
}