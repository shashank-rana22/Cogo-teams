declare module '*.module.css' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.css';

declare module '*.svg' {
	const content: any;
	export default content;
}

declare module '@cogoport/utils';
declare module '@cogoport/components'
declare module '@cogoport/icons-react'
declare module '@cogoport/charts'
declare module '@cogoport/charts/bar/index'
declare module '@cogoport/charts/pie/index'
declare module 'file-saver'
declare module 'number-to-words'
declare module '@cogoport/globalization/constants/globals.json';
