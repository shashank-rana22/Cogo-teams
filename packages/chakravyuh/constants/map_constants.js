/* eslint-disable max-len */
export const BASE_LAYER = [
	{
		name        : 'Cogo Maps',
		url         : `${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/{z}/{x}/{y}.png`,
		attribution : '<a href="https://www.cogoport.com/en-IN/terms-and-conditions/" target="_blank">&copy; Cogoport T&C</a> | <a href="https://www.cogoport.com/en-IN/privacy-policy/" target="_blank">Privacy & data protection</a>',
		minZoom     : 0,
		maxZoom     : 15,
	},
];
const MAX_LNG = 90;
export const LOCATION_KEYS = ['origin', 'destination'];
export const COLORS = [
	{ weight: 0.5 },
	{ fillColor: '#FDEBE9', color: '#EE3425', fillOpacity: 1, opacity: 0.8, accuracy: 'worse' },
	{ fillColor: '#FEF3E9', color: '#F68B21', fillOpacity: 1, opacity: 0.8, accuracy: 'bad' },
	{ fillColor: '#F7FAEF', color: '#849E4C', fillOpacity: 1, opacity: 0.8, accuracy: 'good' },
];

export const SORT_OPTIONS = [
	{ label: 'Accuracy', value: 'accuracy' },
	{ label: 'Count', value: 'count' },
];

export const MAX_BOUNDS = [
	[-MAX_LNG, -Infinity],
	[MAX_LNG, Infinity],
];
export const LAYOUT_WIDTH = 408;
export const TIME_LIMIT = 200;
export const PADDING_TOP = 10;
export const SECOND_IDX = 1;
export const ITEMS = [
	{ label: 'NA', spectrumStyle: { backgroundColor: '#f4f4f4', borderColor: '#828282' }, key: 'na' },
	{ label: '0-40 %', spectrumStyle: { backgroundColor: '#FDEBE9', borderColor: '#EE3425' }, key: 'green' },
	{ label: '40-80 %', spectrumStyle: { backgroundColor: '#FEF3E9', borderColor: '#F68B21' }, key: 'orange' },
	{ label: '80-100 %', spectrumStyle: { backgroundColor: '#F7FAEF', borderColor: '#849E4C' }, key: 'red' },
];
