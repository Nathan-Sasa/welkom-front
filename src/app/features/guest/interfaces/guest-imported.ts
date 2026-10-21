import { CategoriesType } from "../../../core/types/category.type"

export interface IGuestContactImported {
    firstName: string
    lastName: string
    email: string
    telephone: string
    category: CategoriesType
}