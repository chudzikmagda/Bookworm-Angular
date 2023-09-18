import { ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class DialogService {
	private componentRef!: ComponentRef<unknown>;

	public openDialog(viewContainerRef: ViewContainerRef, componentType: Type<unknown>): void {
		this.componentRef = viewContainerRef.createComponent(componentType);
	}

	public closeDialog(): void {
		this.componentRef.destroy();
	}
}
