import { Routes } from "@angular/router";



export const UnauthorizedRoutes: Routes = [
    {
        path: '',
        title: 'Non autorisé',
        loadComponent: () => import('./pages/unauthorized.component').then(m => m.UnauthorizedComponent)
    }
]