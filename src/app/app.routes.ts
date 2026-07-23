import { Routes } from '@angular/router';

export const routes: Routes = [
    // entry ===============================
    {
        path: 'home',
        title: 'Welkom',
        loadComponent: () => import('./pages/landing/lading.component').then(m => m.LadingComponent)
    },


    // authentication routes ======================
    {
        path: 'login',
        title: 'Connexion',
        loadComponent: () => import('./pages/auth/auth.component').then(m => m.AuthComponent)
    },
    {
        path: 'register',
        title: 'Inscription',
        loadComponent: () => import('./pages/auth/auth.component').then(m => m.AuthComponent)
    },


    // redirection ==============================
    // routes provisoire
    // design system
    {
        path: 'design-system',
        title: 'design system',
        loadComponent: ()=> import('./pages/design-system/design-system.component').then(m => m.DesignSystemComponent)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    },

];
