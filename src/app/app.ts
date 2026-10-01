import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component'

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		HeaderComponent,
	],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App{
  	protected readonly title = signal('Welkom');
	protected routeBool = signal<boolean>(true)

	getHasRoute(routeBool: boolean){
		this.routeBool.set(routeBool)
	}
}
