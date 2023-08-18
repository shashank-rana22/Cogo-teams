export const MAPPING_CARDS_DATA = [
	{
		label : 'Estimated Revenue',
		name  : 'estimatedRevenue',
	},
	{
		label : 'Estimated Cost',
		name  : 'estimatedCost',
	},
];

export const LABEL_MAPPING = {
	Financially   : 'actual',
	Operationally : 'operational',
};

export const INFO_CONTENT = {
	ongoingShipments    : 'Shipments confirmed by suppliers',
	operationallyClosed : 'Shipments with Operational journey completed',
	financiallyClosed   : 'Shipments with Financial journey completed',
	closedShipmentsBar  : 'Profit earned against revenue',
};

export const TOUR_STEPS = [
	{
		selector : '[data-tour="first-step"]',
		content  : 'Welcome to Cogo Financials! Click here to directly return to homepage from any other page',
	},
	{
		selector : '[data-tour="second-step"]',
		content  : 'Get details of ongoing shipments here.',
	},
];
