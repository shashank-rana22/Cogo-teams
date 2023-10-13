export const SOURCE_OPTIONS = {
	live_booking: {
		label : 'Live Bookings',
		value : 'live_booking',
	},
	rate_feedback: {
		label : 'Disliked Rates',
		value : 'rate_feedback',
	},
	rate_request: {
		label : 'Missing Rates',
		value : 'rate_request',
	},
	critical_ports: {
		label : 'Critical Port Pairs',
		value : 'critical_ports',
	},
	expiring_rates: {
		label : 'Expiring Rates',
		value : 'expiring_rates',
	},
	cancelled_shipments: {
		label : 'Cancelled Shipment',
		value : 'cancelled_shipments',
	},
};

export const DEFAULT_RATE_JOBS_FILTERS = {
	source  : ['live_booking'],
	service : 'fcl_freight',
};
