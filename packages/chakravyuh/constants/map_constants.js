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

export const SELECT_AGGREGATE = {
	SUM: [
		'likes_count',
		'dislikes_count',
		'feedback_recieved_count',
		'dislikes_rate_reverted_count',
		'spot_search_count',
		'checkout_count',
		'containers_count',
		'applicable_origin_local_count',
		'applicable_destination_local_count',
		'shipment_completed_count',
		'shipment_cancelled_count',
		'shipment_aborted_count',
		'shipment_confirmed_by_importer_exporter_count',
		'shipment_in_progress_count',
		'shipment_received_count',
		'shipment_awaited_service_provider_confirmation_count',
		'shipment_init_count',
		'shipment_containers_gated_in_count',
		'shipment_containers_gated_out_count',
		'shipment_vessel_arrived_count',
		'shipment_is_active_count',
		'shipment_booking_rate_is_too_low_count',
		'revenue_desk_visit_count',
		'so1_visit_count',
		'booking_rate_count',
		'so1_select_count',
	],
	AVG: [
		'total_accuracy',
	],
};

export const SORT_OPTIONS = [
	{ label: 'Accuracy', value: 'total_accuracy' },
	{ label: 'Likes', value: 'likes_count' },
	{ label: 'Dislikes', value: 'dislikes_count' },
	{ label: 'Feedback Recieved', value: 'feedback_recieved_count' },
	{ label: 'Disliked rate reverted', value: 'dislikes_rate_reverted_count' },
	{ label: 'Spot Search', value: 'spot_search_count' },
	{ label: 'Checkout', value: 'checkout_count' },
	{ label: 'Containers', value: 'containers_count' },
	{ label: 'Origin Locals', value: 'applicable_origin_local_count' },
	{ label: 'Destination Locals', value: 'applicable_destination_local_count' },
	{ label: 'Shipment Completed', value: 'shipment_completed_count' },
	{ label: 'Shipment Cancelled', value: 'shipment_cancelled_count' },
	{ label: 'Shipment Aborted', value: 'shipment_aborted_count' },
	{ label: 'Confirmed by Importer Exporter', value: 'shipment_confirmed_by_importer_exporter_count' },
	{ label: 'Shipment in progress', value: 'shipment_in_progress_count' },
	{ label: 'Shipments Recieved', value: 'shipment_received_count' },
	{ label: 'Provider Confirmation Awaited', value: 'shipment_awaited_service_provider_confirmation_count' },
	{ label: 'Initialised Shipments', value: 'shipment_init_count' },
	{ label: 'Containers Gated In', value: 'shipment_containers_gated_in_count' },
	{ label: 'Containers Gated Out', value: 'shipment_containers_gated_out_count' },
	{ label: 'Vessels Arrived', value: 'shipment_vessel_arrived_count' },
	{ label: 'Active Shipments', value: 'shipment_is_active_count' },
	{ label: 'Low Booking Rate', value: 'shipment_booking_rate_is_too_low_count' },
	{ label: 'Revenue Desk Visit', value: 'revenue_desk_visit_count' },
	{ label: 'SO1 Visit', value: 'so1_visit_count' },
	{ label: 'Booking Rate', value: 'booking_rate_count' },
	{ label: 'SO1 Select', value: 'so1_select_count' },
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
