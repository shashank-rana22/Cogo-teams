/* eslint-disable max-len */
export const BASE_LAYER = [
	{
		name        : 'Cogo Maps',
		url         : `${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/cogo-tiles/{z}/{x}/{y}.png`,
		attribution : '<a href="https://www.cogoport.com/en-IN/terms-and-conditions/" target="_blank">&copy; Cogoport T&C</a> | <a href="https://www.cogoport.com/en-IN/privacy-policy/" target="_blank">Privacy & data protection</a>',
		minZoom     : 0,
		maxZoom     : 15,
	},
];
const MAX_LNG = 90;

export const SORT_OPTIONS = [
	{ label: 'Deviation', value: 'deviation' },
	{ label: 'Accuracy', value: 'accuracy' },
	{ label: 'Count', value: 'count' },
];

export const MAX_BOUNDS = [
	[-MAX_LNG, -Infinity],
	[MAX_LNG, Infinity],
];
export const LAYOUT = 408;
export const TIME_LIMIT = 110;
