import { Directive, effect, inject, input, signal, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Role } from '../../../core/auth/interfaces/role.interface';

type RoleInput = Role | 'GUEST' | (Role | 'GUEST')[]; 

@Directive({
  selector: '[wlkRole]',
})
export class RoleDirective {

	private readonly auth = inject(AuthService)
	private readonly templateRef = inject(TemplateRef<HTMLElement>)
	private readonly viewContainer = inject(ViewContainerRef)

	public readonly wlkRole = input.required<RoleInput>()
	public readonly wlkRoleElse = input<TemplateRef<unknown>>()

	private hasView = signal(false)
	private hasElseView = signal(false)

	constructor() {
		effect(
			() => {
				const user = this.auth.currentUser();
				const value = this.wlkRole()
				const roles = Array.isArray(value) ? value : [value]
				const elseTemplateRef = this.wlkRoleElse()
				const matches = roles.some((role) => {
					if (role === 'GUEST') {
						return user === null
					}
					return user?.role === role
				})

				if (matches && !this.hasView()) {
					this.viewContainer.clear()
					this.viewContainer.createEmbeddedView(this.templateRef)
					this.hasView.set(false)
					this.hasElseView.set(false)
				} else if (!matches && !this.hasElseView()) {
					this.viewContainer.clear()
					if (elseTemplateRef) {
						this.viewContainer.createEmbeddedView(elseTemplateRef)
						this.hasElseView.set(true)
					}
					this.hasView.set(false)
				}
			},
			{injector: this.viewContainer.injector},
		)
	}

}
