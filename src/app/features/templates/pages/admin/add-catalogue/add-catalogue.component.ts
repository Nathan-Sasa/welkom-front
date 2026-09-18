import { Component, signal, computed, inject, DestroyRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../../../core/auth/services/auth.service';
import { CatalogueService } from '../../../services/catalogue.service';
import { RouterLink } from "@angular/router";

interface DynamicField {
	keyName: string
	defaultValue: string
}

@Component({
	selector: 'wlk-add-catalogue',
	imports: [
    FormsModule,
    CommonModule,
    RouterLink
],
	templateUrl: './add-catalogue.component.html',
	styleUrl: './add-catalogue.component.css',
})
export class AddCatalogueComponent implements OnInit {

	destroyRef = inject(DestroyRef)
	catalogueService = inject(CatalogueService)

	name = signal<string>('')
	category = signal<string>('mariage')
	backgroundImgUrl =  signal<string>('')
	fontTitle = signal<string>('roboto')
	fontBody = signal<string>('poppins')
	image1 = signal<string>('')
	image2 = signal<string>('')
	image3 = signal<string>('')
	hasCadre = signal<boolean>(false)
	cadre = signal<string>('')
	colorPrimary = signal<string>('')
	colorAccent = signal<string>('')

	dynamicFields = signal<DynamicField[]>([{keyName: 'nom_maries', defaultValue: "Nathan & Inconnue"}])

	isFormInvalid = computed(() => {
		return !this.name().trim() || !this.backgroundImgUrl().trim();
	});

	addFields(): void {
		this.dynamicFields.update(fields => [...fields, {keyName: '', defaultValue: ''}])
	}

	deleteField(index: number): void {
		this.dynamicFields.update(fields => fields.filter((_, i) => i !== index))
	}

	followFieldChange(index: number, property: 'keyName' | 'defaultValue', value: string): void {
		this.dynamicFields.update(fields => {
			fields[index][property] = value;
			return [...fields];
		});
	}

	ngOnInit(): void {
		console.log('init ok')
		// this.loadTemplates()
	}

	saveTemplate(): void {
		if (this.isFormInvalid()) {
			alert("veillez remplir correctement tous les champs")
			return
		}

		const configDataJson: Record<string, string> = {}
		const validFields = this.dynamicFields().filter(field => 
			field.keyName.trim() !== '' && field.defaultValue.trim() !== ''
		);

		if (validFields.length === 0) {
			alert("Veuillez remplir au moins une paire Clé/Valeur valide.");
			return;
		}

		validFields.forEach(field => {
			configDataJson[field.keyName.trim()] = field.defaultValue.trim();
		});

		const payload = {
			name: this.name(),
			category: this.category(),
			catalogueImgUrl: this.backgroundImgUrl(),
			fontTitle: this.fontTitle(),
			fontBody: this.fontBody(),
			image1: this.image1(),
			image2: this.image2(),
			image3: this.image3(),
			hasCadre: this.hasCadre(),
			cadre: this.cadre(),
			colorPrimary: this.colorPrimary(),
			colorAccent: this.colorAccent(),
			defaultConfig: {
				texts: configDataJson
			}
		}

		console.log('template form :', payload)

		this.catalogueService.create(payload)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (res) => {
					console.log('create temple res ok : ', res)
				},
				error: (err) => {
					console.log('create template error : ', err)
				}
			})
	}

	// loadTemplates(): void { // a supprimer
	// 	this.catalogueService.getAll()
	// 	.subscribe({
	// 		next: (res) => {
	// 			console.log('list temp res ok : ', res)
	// 		},
	// 		error: (err) => {
	// 			console.log('list temp err : ', err)
	// 		}
	// 	})
	// }

}

/* 
address: "123 Main St. Downtown Metropolis"
​date: "September 25th, 2026"
​delai: "Kindly respond by September 15th"
​digital_passe: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiBCkVxY2lUl73YLFySwDCJGhc6hoGyD1MBAHdtoCVxi4hwF04li4zxEcgdEJZ71pn3iuuBJvToP-l8qW76SwB-7VOL8QEVJ1gqnck4fRCk96WpAacY7y5ikw0YcdxMBqmdNe0EJbRm7fXED1kP9a5vsMuiagc41nyAyp6FCL3v1YopIdE2aCzSzsaeRcSIs-jlcBxoDnRAL0TpoPxaodcZYzFjGjYFpWMgaSrJA6hlo5RF2RUXAvvmFp9NoZf8n182GCb_Opa5KLb"
​dinner: "7:00 PM"
​dresse_code: "Black Tie Minimalist"
​lieu: "The Loft"
​nom_maries: "Davide & Emmanuella"
​requirements: "Please present this digital pass at the entrance of The Loft. No physical printouts are required. We look forward to seeing you."
​soiree: "Reception and curated dining"
​text_2: "A day centered on the beauty of simplicity, intentionality, and the profound joy of shared history. We invite you to an evening of quiet luxury and celebration."
​text_intro: "Together with their families, Davide Mukendi and Emmanuella ... request the pleasure of your company at the celebration of their union."
​time: "Ceremony begins at 4:30 PM"
*/