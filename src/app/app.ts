import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeComponent } from './shared/theme/theme.component';
import { HeaderComponent } from './layout/header/header.component'
// import { NgOptimizedImage } from "@angular/common";

@Component({
	selector: 'app-root',
	imports: [
    RouterOutlet,
	HeaderComponent
    // NgOptimizedImage
],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Yann-ndani');
}
