import { IcMAir, IcMFcl } from '@cogoport/icons-react';

export const STAT_CARDS_MAPPING = {
	pending   : { title: 'Today\'s Pending', color: '#FF5733', status: 'pending' },
	completed : { title: 'Today\'s Completed', color: '#728F3C', status: 'completed' },
	backlog   : { title: 'Previous Backlogs', color: '#F69E50', status: 'backlog' },
};

export const WEEKLY_BACKLOG = {
	title  : 'Weeks Backlog',
	color  : '#FF5733',
	status : 'weekly_backlog_count',
};

export const CARDS_MAPPING = {
	critical_ports: {
		title        : 'Critical Port Pairs',
		status       : 'critical_ports',
		showViewMore : true,
	},
	expiring_rates: {
		title        : 'Expiring Rates',
		status       : 'expiring_rates',
		showViewMore : true,
	},
	spot_search: {
		title        : 'Spot Searches',
		status       : 'spot_search',
		showViewMore : true,
	},
	// monitoring_dashboard: {
	// 	title        : 'Monitoring Dashboard',
	// 	status       : 'monitoring_dashboard',
	// 	showViewMore : true,
	// },
	cancelled_shipments: {
		title        : 'Cancelled Shipment',
		status       : 'cancelled_shipments',
		showViewMore : true,
	},
};
export const SERVICE_ICON_MAPPING = {
	FCL : <IcMFcl />,
	AIR : <IcMAir />,
};

export const CLOSE_REASON_OPTIONS = [
	{ label: 'Shipping/Airline not serviceable', value: 'not_serviceable' },
	{ label: 'Rate not available', value: 'rate_not_available' },
	{ label: 'No change in rate', value: 'no_change_in_rate' },
	{ label: 'Other reason', value: 'other' },
];
export const serviceOptions = [
	{
		label : 'FCL Freight',
		value : 'fcl_freight',
	},
	{
		label : 'AIR Freight',
		value : 'air_freight',
	},
];

export const taskStatusOptions = [
	{
		label : 'Pending',
		value : 'pending',
	},
	{
		label : 'Completed',
		value : 'completed',
	},
	{
		label : 'Backlogs',
		value : 'backlogs',
	},
	{
		label : 'Aborted',
		value : 'aborted',
	},
];

export const HEADINGS = {
	critical_ports       : 'Critical Port Pairs',
	expiring_rates       : 'Expiring Rates',
	spot_search          : 'Spot Searches',
	monitoring_dashboard : 'Monitoring Dashboard',
	cancelled_shipments  : 'Cancelled Shipments',
};

export const commodityOptions = [
	{ label: 'General Cargo', value: 'general' },
	{ label: 'Special Consideration', value: 'special_consideration' },
	{ label: 'Temperature Controlled/Pharma', value: 'temp_controlled' },
	{ label: 'Other Special', value: 'other_special' }];
