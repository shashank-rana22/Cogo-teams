import { isEmpty } from '@cogoport/utils';

import defaultRatesLocalStorageValue from '../helpers/defaultRatesLocalStorageValue';

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
export const ADMIN_VIEW_REQUIRED_FOR = ['cogoone_admin', 'supply_admin'];

export const defaultRateJobFilters = ({ viewType = '' }) => {
	const { localStorageFilterValue, localStorageSourceValue } = defaultRatesLocalStorageValue();

	const defaultStartDate = isEmpty(localStorageFilterValue?.startDate) ? new Date()
		: localStorageFilterValue?.startDate;

	const defaultEndDate = isEmpty(localStorageFilterValue?.endDate) ? new Date()
		: localStorageFilterValue?.endDate;

	return {
		source    : !isEmpty(localStorageSourceValue?.source) ? localStorageSourceValue?.source : [],
		service   : 'fcl_freight' || localStorageFilterValue?.service,
		dateRange : {
			startDate : new Date((new Date(defaultStartDate)).setHours(0, 0, 0, 0)),
			endDate   : new Date((new Date(defaultEndDate)).setHours(23, 59, 59, 59)),
		},
		shipment_id         : localStorageFilterValue?.shipment_serial_id,
		serial_id           : '',
		relevant_to         : ADMIN_VIEW_REQUIRED_FOR.includes(viewType) ? 'all' : '',
		service_provider_id : localStorageFilterValue?.service_provider_id,
	};
};

export const INCO_TERM_MAPPING = {
	cif : 'export',
	cfr : 'export',
	cpt : 'export',
	cip : 'export',
	dat : 'export',
	dap : 'export',
	ddp : 'export',
	fob : 'import',
	exw : 'import',
	fca : 'import',
	fas : 'import',
};
