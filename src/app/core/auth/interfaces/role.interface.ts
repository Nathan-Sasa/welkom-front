export const ROLES = {
    USER: 'WLK_USER',
    ADMIN: 'WLK_ADMIN',
    SUPER_ADMIN: 'WLK_SUPER_ADMIN'
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]
