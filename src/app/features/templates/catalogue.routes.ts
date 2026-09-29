import { Routes } from '@angular/router'
import { roleGuard } from '../../core/guards/role/role.guard'
import { ROLES } from '../../core/auth/interfaces/role.interface'

export const CatalogueRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: "",
                title: 'Catalogues',
                loadComponent: ()=> import('./pages/catalogue/catalogue.component').then(m => m.CatalogueComponent)
            },
            {
                path: ':catalogueUuid',
                loadComponent: ()=> import('./components/catalogue-details/catalogue-details.component').then(m => m.CatalogueDetailsComponent)
            },
            {
                path: 'edit/:catalogueUuid',
                loadComponent: ()=> import('./components/catalogue-details/catalogue-details.component').then(m => m.CatalogueDetailsComponent)
            },
        ]
    },
    {
        path: "admin/add",
        canMatch: [roleGuard(ROLES.ADMIN || ROLES.SUPER_ADMIN)],
        loadComponent: ()=> import('./pages/admin/add-catalogue/add-catalogue.component').then(m => m.AddCatalogueComponent)
    }
]