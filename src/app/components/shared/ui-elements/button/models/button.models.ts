export type ButtonClasses = {
	btn: boolean;
	'btn--primary': boolean;
	'btn--secondary': boolean;
	'btn--primary-outline': boolean;
	'btn--secondary-outline': boolean;
	'btn--icon': boolean;
	'btn--disabled': boolean;
	'btn--large': boolean;
	'btn--small': boolean;
};

export enum ButtonVariant {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
	PRIMARY_OUTLINE = 'primary-outline',
	SECONDARY_OUTLINE = 'secondary-outline',
	ICON = 'icon',
}

export enum ButtonSize {
	LARGE = 'large',
	SMALL = 'small',
}
