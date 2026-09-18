import { Routes } from '@angular/router'

export const CatalogueRoutes: Routes = [
    {
        path: "",
        title: 'Catalogues',
        loadComponent: ()=> import('./pages/catalogue/catalogue.component').then(m => m.CatalogueComponent)
    },
    {
        path: "admin/add",
        loadComponent: ()=> import('./pages/admin/add-catalogue/add-catalogue.component').then(m => m.AddCatalogueComponent)
    }
]