import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class CatalogueSelectionService {
    private readonly storageKey = 'wlk-template-event'

    setEventUuid(eventUuid: string): void {
        sessionStorage.setItem(this.storageKey, eventUuid)
    }

    getEventUuid(): string | null {
        return sessionStorage.getItem(this.storageKey)
    }

    clear(): void {
        sessionStorage.removeItem(this.storageKey)
    }
}