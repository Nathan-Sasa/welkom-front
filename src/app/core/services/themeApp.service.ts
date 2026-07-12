import { Injectable, signal, computed, PLATFORM_ID, inject, Renderer2 } from "@angular/core";
import { isPlatformBrowser, DOCUMENT } from "@angular/common";
import { BehaviorSubject } from "rxjs";
import { App } from "../../app";

export enum AppTheme {
    Light = 'light',
    Dark = 'dark',
    System = 'system'
}

@Injectable({
    providedIn: 'root'
})
export class ThemeAppService {
    private readonly localStorageKey = 'theme-preference';
    private readonly platformId = inject(PLATFORM_ID);
    private readonly document = inject(DOCUMENT);
    // private renderer: Renderer2;

    // Etat interne du thème ------------------------------------------------------------
    private _currentThemePreference = signal<AppTheme | null>(null);

    // Thème effectif appliqué (dark ou light) =====
    public readonly actualTheme = computed(() =>{
        const preference = this._currentThemePreference();
        if(preference === AppTheme.Dark) return AppTheme.Dark;
        if(preference === AppTheme.Light) return AppTheme.Light;

        //  Si System, vérifier la préférence OS =====================
        return this.prefersDarkScheme() ? AppTheme.Dark : AppTheme.Light;
    })

    // Pour l'affichage dans 'UI ----------------------------------------------------------------------
    public readonly themeDisplay = this._currentThemePreference.asReadonly();

    // map theme --------------------------------------------------------
    private dark$ = new BehaviorSubject<boolean>(false)
    readonly isDark$ = this.dark$.asObservable()

    constructor(
        
    ){
        if(isPlatformBrowser(this.platformId)){
            // logique d'initialisation (SSR safe)
            this.initializeTheme();
        }
    }

    private prefersDarkScheme(): boolean {
        if(isPlatformBrowser(this.platformId)){
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false
    }

    private initializeTheme(): void{
        const storagePreference = localStorage.getItem(this.localStorageKey) as AppTheme;

        let initializeTheme: AppTheme;
        if(storagePreference && Object.values(AppTheme).includes(storagePreference)){
            initializeTheme = storagePreference;
        }else{
            initializeTheme = AppTheme.System
        }

        this._currentThemePreference.set(initializeTheme)
        this.applyTheme(this.actualTheme())

        // Ecouter les changements système si le thème est System
        if(initializeTheme === AppTheme.System){
            this.setupSystemThemeListerner()
        }
    }

    // Applique la class 'dark' à l'élément <html> ------------------------------------
    private applyTheme(theme: AppTheme): void {
        if(!isPlatformBrowser(this.platformId)) return;

        console.log('Applying theme:', theme);
        this.appMapTheme(this.actualTheme())
        this.current

        if(theme === AppTheme.Dark){
            this.document.documentElement.classList.add('dark')
            
        }else{
            this.document.documentElement.classList.remove('dark')
        }
    }
    
    // mapTheme ------------------------------------------------------------------------------
    public appMapTheme(theme: AppTheme){
        this.dark$.next(theme === AppTheme.Dark);
        // this.mapLoad.initMap()
    }

    // Gérer l'écoute du changement de préférence OS ------------------------
    private setupSystemThemeListerner(): void{
        if(!isPlatformBrowser(this.platformId)) return;

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) =>{
            // Appliquer la nouvelle préférence OS seulement si le mode est toujours 'System'
            if(this._currentThemePreference() == AppTheme.System){
                this.applyTheme(e.matches ? AppTheme.Dark : AppTheme.Light)
            }
        })
    }

    public setLightTheme(): void{
        this.setTheme(AppTheme.Light)
    }

    public setDarkTheme(): void{
        this.setTheme(AppTheme.Dark)
    }

    public setSystemTheme(): void{
        this.setTheme(AppTheme.System)
    }

    private setTheme(preference: AppTheme): void{
        if(!isPlatformBrowser(this.platformId)) return

        this._currentThemePreference.set(preference)

        // Mettre à jour localstorage
        localStorage.setItem(this.localStorageKey, preference);

        // Aplliquer le nouveau thème (qui recalcule avec 'actualTheme')
        this.applyTheme(this.actualTheme())
    }

    get current(): boolean{
        let dark = false
        this.isDark$.subscribe(p =>{
            dark = p
        })

        return dark
    }
}