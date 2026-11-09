import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { CheckingService } from '../../service/checking.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppInfo } from '../../../../shared/utils/meta-data';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from "@zxing/library"

import { IExceptions } from '../../../../core/interfaces/exception.interface';
import { ErrorsComponent } from '../../../../shared/components/errors/errors.component'

import { Dialog } from 'primeng/dialog'
import { ButtonModule } from 'primeng/button'

@Component({
    selector: 'wlk-checking-point',
    imports: [
		ZXingScannerModule,
		ErrorsComponent,
		Dialog,
		ButtonModule
    ],
    templateUrl: './checking-point.component.html',
    styleUrl: './checking-point.component.css',
})
export class CheckingPointComponent {

	wlkLogo = AppInfo.logo

	private readonly destroyRef = inject(DestroyRef)
	private readonly checkingService = inject(CheckingService)


	protected scannerEnabled = signal<boolean>(true)
	qrResultString: string | null = null

	allowedFormat = [
		BarcodeFormat.QR_CODE
	]

	// protected isDialog: boolean = false
	protected isDialog = signal<boolean>(false)
	protected guest = signal<any>({})

	protected loading = signal<boolean>(false)

	protected isError = signal<boolean>(false)
	protected errorContent = signal<IExceptions>(<IExceptions>{})

	constructor(){
		effect(() => {
			if (!this.isDialog()){
				this.scannerEnabled.set(true)
			}
		})
	}


	onScanSuccess(result: string): void {
		console.log('Code détecté : ', result)
		
		this.scannerEnabled.set(false)
		this.loading.set(true)
		this.isError.set(false)

		const token = {
			qrToken: result
		}
		
		this.checkingService.getGuestToken(token)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (res) => {
					this.isDialog.set(true)
					this.loading.set(false)
					console.log('guest payload : ', res)
				},
				error: (err) => {
					this.isError.set(true)
					this.isDialog.set(true)
					console.log('guest payload error', err)
					
					const errorContent = {
						error: {message: err.status === 500 ? 'Une erreur est survenue, veillez réessayez plus tard !' : err.error.message},
						name: err.name,
						status: err.status,
					}

					this.errorContent.set(errorContent)
					this.loading.set(false)
				}
			})
	}

}
