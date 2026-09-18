import { Routes } from '@angular/router'

export const AuthRoute: Routes = [
     {
        path: 'login',
        title: 'Connexion',
        loadComponent: () => import('../authentication/pages/auth.component').then(m => m.AuthComponent)
    },
    {
        path: 'register',
        title: 'Inscription',
        loadComponent: () => import('../authentication/pages/auth.component').then(m => m.AuthComponent)
    },
]