import { Routes } from "@angular/router";
import { roleGuard } from "../../core/guards/role/role.guard";
import { ROLES } from "../../core/auth/interfaces/role.interface";
import { dashboardGuard } from "./dashboard.guard";

export const DashboardRoutes: Routes = [
    {
        path: '',
        canMatch: [roleGuard(ROLES.USER || ROLES.ADMIN || ROLES.SUPER_ADMIN) && dashboardGuard],
        children: [
            {
                path: ':EventUuid',
                loadComponent: () => import('./page/dashboard.component').then(m => m.DashboardComponent)
            }
        ]
    }
]