import { Routes } from "@angular/router";
import { checkingGuard } from "./checking.guard";


export const CheckingRoutes: Routes = [
    {
        path: 'point',
        title: 'checking',
        loadComponent: () => import('./page/checking-point/checking-point.component').then(m => m.CheckingPointComponent),
        canMatch: [checkingGuard]
    },
    {
        path: 'auth',
        title: 'checking-auth',
        loadComponent: () => import('./page/event-auth/event-auth.component').then(m => m.EventAuthComponent)
    },
    {
        path: '',
        redirectTo: 'point',
        pathMatch: 'prefix'
    }
]