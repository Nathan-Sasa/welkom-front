import { Routes } from "@angular/router";
import { roleGuard } from "../../core/guards/role/role.guard";
import { ROLES } from "../../core/auth/interfaces/role.interface";

export const EventRoutes: Routes = [
    {
        path: "create",
        title: "Créer",
        loadComponent: () => import('./pages/create-event/create-event.component').then(m => m.CreateEventComponent),
        // canMatch: [roleGuard(ROLES.USER)]
    }
]