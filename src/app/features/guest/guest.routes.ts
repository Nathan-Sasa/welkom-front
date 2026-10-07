import { inject } from '@angular/core'
import { Routes } from '@angular/router'
import { roleGuard } from '../../core/guards/role/role.guard'
import { ROLES } from '../../core/auth/interfaces/role.interface'
import { dashboardGuard } from '../dashboard/dashboard.guard'
import { DashboardService } from '../dashboard/services/dashboard.service'

const eventUuid = (dashboard = inject(DashboardService)) =>{ 
    const uuid = dashboard.getEventStorage$()?.uuid
    return uuid
}

export const GuestRoutes: Routes = [
    {
        path: '',
        title: 'Invités',
        canMatch: [roleGuard(ROLES.USER || ROLES.ADMIN || ROLES.SUPER_ADMIN) && dashboardGuard],
        children: [
            {
                path:':eventUuid',
                // loadComponent: ()=> import('./page/list/guest.component').then(m=> m.GuestComponent),
                children: [
                    {
                        path: '',
                        loadComponent: ()=> import('./page/list/guest.component').then(m=> m.GuestComponent),
                    },
                    {
                        path: 'details/:guestUuid',
                        loadComponent: () => import('./page/details/guest-details.component').then(m => m.GuestDetailsComponent)
                    }
                ]
            },
            // {
            //     path: 'details/:guestUuid',
            //     loadComponent: () => import('./page/details/guest-details.component').then(m => m.GuestDetailsComponent)
            // }
        ]
    },
    // {
    //     path: '',
    //     redirectTo: `guest/${eventUuid()}`,
    //     pathMatch: 'full'
    // }
]