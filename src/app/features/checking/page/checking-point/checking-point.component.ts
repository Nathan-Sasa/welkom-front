import { Component, DestroyRef, inject } from '@angular/core';
import { CheckingService } from '../../service/checking.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppInfo } from '../../../../shared/utils/meta-data';
import { firstValueFrom } from 'rxjs';
import { ScannerComponent } from '../../../../shared/components/scanner/scanner.component';

@Component({
    selector: 'wlk-checking-point',
    imports: [
		ScannerComponent
    ],
    templateUrl: './checking-point.component.html',
    styleUrl: './checking-point.component.css',
})
export class CheckingPointComponent {

	private readonly destroyRef = inject(DestroyRef)
	private readonly checkingService = inject(CheckingService)

	wlkLogo = AppInfo.logo


	// constructor() {
		// this.checkingService.getCheckingAccess()
		// 	.pipe(takeUntilDestroyed(this.destroyRef))
		// 	.subscribe({
		// 		next: (res) => {
		// 			console.log('get access checking res: ', res)
		// 		},
		// 		error: (err) => {
		// 			console.log('get access checking err', err)
		// 		}
		// 	})
		// const valueAccess = function accessValue() {
		// 	return firstValueFrom(
		// 		const checkingService = inject(CheckingService)
		// 		checkingService.getCheckingAccess()
		// 			// .pipe(
		// 			//     tap(() => {return true}),
		// 			//     catchError(() => {return of(false)})
		// 			// )
		// 	)
		// }
	// }

}
