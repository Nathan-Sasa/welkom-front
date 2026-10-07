import { CategoriesType, categoryLabels } from "../../core/types/category.type";

export function toFrenchCategory(category: CategoriesType): string {
    
    switch(category){
        case 'FAMILY':
            return categoryLabels.FAMILY
        case 'FRIENDS':
            return categoryLabels.FRIENDS
        case 'COLLEAGUES':
            return categoryLabels.COLLEAGUES
        case 'OTHER':
            return categoryLabels.OTHER
        default:
            return categoryLabels.OTHER
    }
}