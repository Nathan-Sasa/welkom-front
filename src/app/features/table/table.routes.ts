import { Routes } from "@angular/router";
import { roleGuard } from "../../core/guards/role/role.guard";
import { ROLES } from "../../core/auth/interfaces/role.interface";
import { dashboardGuard } from "../dashboard/dashboard.guard";

export const TableRoutes: Routes = [
    {
        path: '',
        title: 'Tables',
        canMatch: [roleGuard(ROLES.USER || ROLES.ADMIN || ROLES.SUPER_ADMIN) && dashboardGuard],
        children: [
            {
                path:':eventUuid',
                children: [
                    {
                        path: 'tables',
                        loadComponent: () => import('./page/list/tables.component').then(m => m.TablesComponent)
                    },
                    {
                        path: 'tables/:tableUuid',
                        children: [
                            {
                                path: '',
                                redirectTo: 'details',
                                pathMatch: 'prefix'
                            },
                            {
                                path: 'details',
                                loadComponent: () => import('./page/details/table-details.component').then(m => m.TableDetailsComponent)
                            }
                        ]
                    }
                ]
            }
        ]
    }
]