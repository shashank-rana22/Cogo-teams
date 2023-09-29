import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
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
	live_bookings: {
		title        : 'Live Bookings',
		status       : 'live_bookings',
		showViewMore : true,
	},
	rate_feedback: {
		title        : 'Disliked Rates',
		status       : 'rate_feedback',
		showViewMore : true,
	},
	rate_request: {
		title        : 'Missing Rates',
		status       : 'rate_request',
		showViewMore : true,
	},
	critical_ports: {
		title        : 'Critical Port Pairs',
		status       : 'critical_ports',
		showViewMore : true,
	},
	spot_search: {
		title        : 'Spot Searches',
		status       : 'spot_search',
		showViewMore : true,
	},
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
	{
		label : 'Haulage',
		value : 'haulage_freight',
	},
	{
		label : 'FCL Customs',
		value : 'fcl_customs',
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
		value : 'backlog',
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
	{ label: 'Other Special', value: 'other_special' },
];

export const handlingtypeOptions = [
	{
		label : 'Stackable',
		value : 'stackable',
	},
	{
		label : 'Non-Stackable',
		value : 'non_stackable',
	},
];
export const priceTypeOptions = [
	{
		label : 'All In',
		value : 'all_in',
	},
	{
		label : 'Net Net',
		value : 'net_net',
	},
];
export const packagingTypeOptions = [
	{
		label : 'Pallet',
		value : 'pallet',
	},
	{
		label : 'Box',
		value : 'box',
	},
	{
		label : 'Crate',
		value : 'crate',
	},
	{
		label : 'Loose',
		value : 'loose',
	},
];
export const rateTypeOptions = [
	{
		label : 'Market place',
		value : 'market_pace',
	},
	{
		label : 'Promotional Rate',
		value : 'promotional_rate',
	},
	{
		label : 'Consollidation Rate',
		value : 'consollidation_rate',
	},
];
export const flighOperationTypeOptions = [
	{
		label : 'Passenger',
		value : 'passenger',
	},
	{
		label : 'Freighter',
		value : 'freighter',
	},
	{
		label : 'Charter',
		value : 'charter',
	},
];
export const currencyOptions = Object.values(GLOBAL_CONSTANTS.currency_code).map((item) => ({
	label : item,
	value : item,
}));
export const densityCargoOptions = [
	{
		label : 'High Density',
		value : 'high_density',
	},
];
export const densityRatioOptions = [
	{
		label : '1:500',
		value : '1_500',
	},
];

export const filterOptions = [
	{ name: 'running', value: 'running', label: 'Running' }, { name: 'closed', value: 'closed', label: 'Closed' },
];

export const entityOptions = [
	{
		name  : 'all_entity',
		value : 'all_entity',
		label : 'All Entity',
	}, { name: 'my_entity', value: 'my_entity', label: 'My Entity' },
];

export const revertedOptions = [
	{
		name  : 'reverted',
		value : 'reverted',
		label : 'Reverted',
	}, { name: 'not_reverted', value: 'not_reverted', label: 'Not Reverted' },
];

export const delayedOptions = [
	{
		name  : 'delayed',
		value : 'delayed',
		label : 'Delayed',
	}, { name: 'in_time', value: 'in_time', label: 'In Time' },
];

export const DEFAULT_VALUE = 0;
export const FIFTY = 50;
export const SEVENTY_FIVE = 75;
export const VALUE_ONE = 1;
export const DELTA_VALUE = 0.1;
