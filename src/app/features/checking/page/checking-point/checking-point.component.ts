import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { CheckingService } from '../../service/checking.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppInfo } from '../../../../shared/utils/meta-data';
import { IExceptions } from '../../../../core/interfaces/exception.interface';
import { ErrorsComponent } from '../../../../shared/components/errors/errors.component'
import { IGuestAlreadyScanned, IGuestCheckingResponse } from '../../../guest/interfaces/guest.interface';
import { Router } from '@angular/router'

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from "@zxing/library"

import { Dialog } from 'primeng/dialog'
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button'
import { AvatarModule } from 'primeng/avatar'
import { ButtonBackComponent } from '../../../../shared/components/button-back/button-back.component';

@Component({
    selector: 'wlk-checking-point',
    imports: [
		ZXingScannerModule,
		ErrorsComponent,
		Dialog,
		DrawerModule,
		ButtonModule,
		AvatarModule,
		ButtonBackComponent
    ],
    templateUrl: './checking-point.component.html',
    styleUrl: './checking-point.component.css',
})
export class CheckingPointComponent {

	wlkLogo = AppInfo.logo

	private readonly destroyRef = inject(DestroyRef)
	private readonly router = inject(Router)
	private readonly checkingService = inject(CheckingService)

	protected scannerEnabled = signal<boolean>(true)
	qrResultString: string | null = null
	allowedFormat = [
		BarcodeFormat.QR_CODE
	]

	// protected isDialog: boolean = false
	protected isDialog = signal<boolean>(false)
	protected guest = signal<IGuestCheckingResponse>(<IGuestCheckingResponse>{})
	initialAvatar = computed(() => {
		if (this.guest().firstName && this.guest().lastName){
			return this.guest().firstName[0].toUpperCase() + this.guest().lastName[0].toUpperCase()
		} else if(this.guest().firstName && !this.guest().lastName){
			return this.guest().firstName[0].toUpperCase()
		} else if(!this.guest().firstName && this.guest().lastName) {
			return this.guest().lastName[0].toUpperCase()
		}
		else {
			return ''
		}
	})

	protected guestAlreadyScanned = signal<IGuestAlreadyScanned>(<IGuestAlreadyScanned>{})
	InitialGuestAlreadyScanned = computed(() => {
		if (this.guestAlreadyScanned().guest.firstName && this.guestAlreadyScanned().guest.lastName){
			return this.guestAlreadyScanned().guest.firstName[0].toUpperCase() + this.guestAlreadyScanned().guest.lastName[0].toUpperCase()
		} else if(this.guestAlreadyScanned().guest.firstName && !this.guestAlreadyScanned().guest.lastName){
			return this.guestAlreadyScanned().guest.firstName[0].toUpperCase()
		} else if(!this.guestAlreadyScanned().guest.firstName && this.guestAlreadyScanned().guest.lastName) {
			return this.guestAlreadyScanned().guest.lastName[0].toUpperCase()
		}
		else {
			return ''
		}
	})

	protected loading = signal<boolean>(false)
	protected isError = signal<boolean>(false)
	protected errorContent = signal<IExceptions>(<IExceptions>{})
	private resultScan = signal<string>('')

	constructor(){
		effect(() => {
			if (!this.isDialog()){
				this.scannerEnabled.set(true)
			}
		})
	}

	onScanSuccess(result: string): void {
		this.resultScan.set(result)
		
		this.scannerEnabled.set(false)
		this.loading.set(true)
		this.isError.set(false)
		this.isDialog.set(true)

		const token = {
			qrToken: result
		}
		
		this.checkingService.getGuestToken(token)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (res) => {
					this.guest.set(res)
					this.loading.set(false)
					console.log('guest payload : ', res)
				},
				error: (err) => {
					console.log('guest payload error', err)
					if (err.status === 409){
						const scanErrorContent = JSON.parse(err.error.message)
						const formatGuestJson: IGuestAlreadyScanned = {
							message: scanErrorContent.message,
							guest: scanErrorContent['guest']
						}
						this.guestAlreadyScanned.set(formatGuestJson)

						const errorReformatContent = {
							error: {message: 'cet invitation a déjà été scanné !'},
							name: err.name,
							status: err.status
						}
						this.errorContent.set(errorReformatContent)
					} else if (err.status === 401){
						void this.router.navigate(['/checking/auth'])
					}
					else {
						const errorContent = {
							error: {message: err.status === 500 ? 'Une erreur est survenue, veillez réessayez !' : err.error.message},
							name: err.name,
							status: err.status,
						}
						this.errorContent.set(errorContent)
					}
					this.loading.set(false)
					this.isError.set(true)
					console.log('guest payload error', err)
				}
			})
	}

	actualize(): void {
		this.onScanSuccess(this.resultScan())
	}

	closeCheckingSession(): void {
		this.checkingService.closeScanSession()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (res ) =>{
					console.log('logout session res : ', res)
				},
				error: (err ) =>{
					console.log('logout session error : ', err)
				}
			})
	}

}
