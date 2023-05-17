import RfqEnquiries from '../Content';

const TabPanelMapping = [
	{
		name      : 'live_bookings',
		title     : 'Live Bookings',
		component : <>--</>,
	},
	{
		name      : 'trade_enquiry',
		title     : 'Missing Rates',
		component : <>--</>,
	},
	{
		name      : 'disliked_rates',
		title     : 'Disliked Rates',
		component : <>--</>,
	},
	{
		name      : 'rate_density',
		title     : 'Rate Density & Coverage',
		component : <>--</>,
	},
	{
		name      : 'manage_forecast',
		title     : 'Manage Forecast',
		component : <>--</>,
	},
	{
		name      : 'rfq_enquiries',
		title     : 'RFQ Enquiries',
		component : <RfqEnquiries />,
	},
	{
		name      : 'rates_sheets',
		title     : 'Rate Sheets',
		component : <>--</>,
	},
];

export default TabPanelMapping;
