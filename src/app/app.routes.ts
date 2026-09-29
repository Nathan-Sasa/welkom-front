import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
    // entry ===============================
    {
        path: 'home',
        title: 'Welkom',
        loadComponent: () => import('./features/landing/pages/lading.component').then(m => m.LadingComponent)
    },


    // authentication routes ======================
    {
        path: 'auth',
        loadChildren: () => import('./features/authentication/auth.routes').then(m => m.AuthRoute),
        canMatch: [guestGuard]
    },

    {
        path: 'profile',
        loadChildren: () => import('./features/profile/profile.routes').then(m => m.ProfileRoutes)
    },

    {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DashboardRoutes)
    },

    // redirection ==============================
    // routes provisoire
    // design system
    {
        path: 'design-system',
        title: 'design system',
        loadComponent: ()=> import('./layout/design-system/design-system.component').then(m => m.DesignSystemComponent)
    },

    {
        path: 'catalogues',
        loadChildren: () => import('./features/templates/catalogue.routes').then(r => r.CatalogueRoutes)
    },
    {
        path: 'event',
        loadChildren: () => import('./features/event/event.routes').then(r => r.EventRoutes)
    },

    {
        path: 'unauthorized',
        loadChildren: () => import('./features/unauthorized/unauthorized.routes').then(r => r.UnauthorizedRoutes)
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
