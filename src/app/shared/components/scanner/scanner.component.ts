import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from "@zxing/library"

@Component({
	selector: 'wlk-scanner',
	imports: [
		CommonModule,
		ZXingScannerModule
	],
	templateUrl: './scanner.component.html',
	styleUrl: './scanner.component.css',
})
export class ScannerComponent {

	scannerEnabled = true
	qrResultString: string | null = null

	allowedFormat = [
		BarcodeFormat.QR_CODE
	]

	onScanSuccess(result: string): void {
		console.log('Code détecté : ', result)

		this.scannerEnabled = false
	}
}
