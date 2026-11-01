import { Routes } from "@angular/router";

export const TableRoutes: Routes = [
    {
        path: '',
        title: 'Tables',
        children: [
            {
                path:':eventUuid',
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./page/list/tables.component').then(m => m.TablesComponent)
                    }
                ]
            }
        ]
    }
]