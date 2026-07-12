import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeComponent } from './shared/theme/theme.component';

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		// ThemeComponent
	],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Yann-ndani');
}
