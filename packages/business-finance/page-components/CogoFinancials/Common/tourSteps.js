/* eslint-disable max-len */
export const HOME_TOUR_STEPS = [
	{
		selector : '[data-tour="main-heading"]',
		content  : 'Welcome to Cogo Financials! Click here to directly return to homepage from any other page',
	},
	{
		selector : '[data-tour="ongoing-shipments-heading"]',
		content  : 'Get details of ongoing shipments here.',
	},
	{
		selector : '[data-tour="financially-closed-heading"]',
		content  : 'Get details of financially closed shipments here.',
	},
	{
		selector : '[data-tour="operationally-closed-heading"]',
		content  : 'Get details of operationally closed shipments here.',
	},
	{
		selector : '[data-tour="ongoing-card"]',
		content  : 'Click here to get more details.',
	},
];

export const ONGOING_PARENT_SERVICES_STEPS = [
	{
		selector : '[data-tour="parent-service-main"]',
		content  : 'Combined data',
	},
	{
		selector : '[data-tour="parent-service-group"]',
		content  : 'Here are the details of all parent services of ongoing shipments. You can click on any service to get more data.',
	},
	{
		selector : '[data-tour="single-parent-service"]',
		content  : 'Click here',
	},
];

export const SINGLE_SERVICE_STEPS = [
	{
		selector : '[data-tour="single-service"]',
		content  : 'Data here',
	},
];
