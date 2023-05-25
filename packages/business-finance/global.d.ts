declare module '@cogoport/*';
declare module 'file-saver'
declare module 'number-to-words'
declare module '*.module.css' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.css';

declare module '*.svg' {
	const content: any;
	export default content;
}

declare module '@cogoport/globalization';
