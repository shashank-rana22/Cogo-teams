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

export const FILTER_OPTIONS = [
	{ label: 'Spot Search', value: 'spot_search' },
	{ label: 'Avg Accuracy', value: 'bas_standard_price_accuracy' },
	{ label: 'Avg Standard Price', value: 'average_standard_price' },
	{ label: 'Likes', value: 'liked' },
	{ label: 'Dislikes', value: 'disliked' },
	{ label: 'Checkout', value: 'checkout' },
	{ label: 'Shipment Completed', value: 'shipment_completed' },
	{ label: 'Shipment Cancelled', value: 'shipment_cancelled' },
	{ label: 'Shipment Aborted', value: 'shipment_aborted' },
	{ label: 'Confirmed by Importer Exporter', value: 'shipment_confirmed_by_importer_exporter' },
	{ label: 'Shipment in progress', value: 'shipment_in_progress' },
	{ label: 'Shipments Recieved', value: 'shipment_received' },
	{ label: 'Revenue Desk Visit', value: 'revenue_desk_visit' },
	{ label: 'SO1 Visit', value: 'so1_visit' },
	{ label: 'SO1 Select', value: 'so1_select' },
	{ label: 'Rate requests created', value: 'rate_requests_created' },
	{ label: 'Rate requests reverted', value: 'rate_requests_reverted' },
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
	{ label: '<=40 %', spectrumStyle: { backgroundColor: '#FDEBE9', borderColor: '#EE3425' }, key: 'green' },
	{ label: '40-80 %', spectrumStyle: { backgroundColor: '#FEF3E9', borderColor: '#F68B21' }, key: 'orange' },
	{ label: '80-100 %', spectrumStyle: { backgroundColor: '#F7FAEF', borderColor: '#849E4C' }, key: 'red' },
];
