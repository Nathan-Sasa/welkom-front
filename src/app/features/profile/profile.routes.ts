import { Routes, ResolveFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { roleGuard } from '../../core/guards/role/role.guard';
import { ROLES } from '../../core/auth/interfaces/role.interface';
import { AuthService } from '../../core/auth/services/auth.service';
import { inject } from '@angular/core';

// const auth = inject(AuthService);

const userRoleResolver: ResolveFn<string | null> = async () => {
    const authService = inject(AuthService);
    try {
        const user = await firstValueFrom(authService.getCurrentUser());
        return user?.role || ROLES.USER;
    } catch {
        return ROLES.USER;
    }
};

export const ProfileRoutes: Routes = [
    {
        path: '',
        canMatch: [roleGuard(ROLES.USER || ROLES.ADMIN || ROLES.SUPER_ADMIN)],
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/profile.component').then(m => m.ProfileComponent),
                resolve: {
                    role: userRoleResolver
                }
            },
            {
                path: 'events',
                loadComponent: () => import('../event/components/event-list/event-list.component').then(m => m.EventListComponent),
                resolve: {
                    role: userRoleResolver
                }
            }
        ]
    },

    // canMatch: [roleGuard(ROLES.USER || ROLES.ADMIN || ROLES.SUPER_ADMIN)],
    // {
    //     path: 'events',
    //     loadComponent: () => import('../event/components/event-list/event-list.component').then(m => m.EventListComponent),
    //     canMatch: [roleGuard(ROLES.USER || ROLES.ADMIN || ROLES.SUPER_ADMIN)],
    //     data: {
    //         roles: [ROLES.USER]
    //     }
    // }
];