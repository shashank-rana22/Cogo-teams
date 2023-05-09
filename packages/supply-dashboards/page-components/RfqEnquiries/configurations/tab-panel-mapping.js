import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import RfqEnquiries from '../Content';

const TabPanelMapping = [
	{
		name            : 'live_bookings',
		title           : 'Live Bookings',
		component       : <>--</>,
		isVisibleExcept : [],
	},
	{
		name            : 'trade_enquiry',
		title           : 'Missing Rates',
		component       : <>--</>,
		isVisibleExcept : [],
	},
	{
		name            : 'disliked_rates',
		title           : 'Disliked Rates',
		component       : <>--</>,
		isVisibleExcept : [],
	},
	{
		name            : 'rate_density',
		title           : 'Rate Density & Coverage',
		component       : <>--</>,
		isVisibleExcept : [GLOBAL_CONSTANTS.country_entity_ids.VN],
	},
	{
		name            : 'manage_forecast',
		title           : 'Manage Forecast',
		component       : <>--</>,
		isVisibleExcept : [],
	},
	{
		name            : 'rfq_enquiries',
		title           : 'RFQ Enquiries',
		component       : <RfqEnquiries />,
		isVisibleExcept : [],
	},
	{
		name            : 'rates_sheets',
		title           : 'Rate Sheets',
		component       : <>--</>,
		isVisibleExcept : [],
	},
];

export default TabPanelMapping;
