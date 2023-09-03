/* eslint-disable max-len */
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
	// { label: 'Other reason', value: 'other' },
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
	{ label: 'Other Special', value: 'other_special' },
];

export const SVG_PATH_D = {
	35 : 'M40 4C45.9281 4 51.7645 5.46394 56.9908 8.26181C62.2171 11.0597 66.6716 15.1049 69.9587 20.0382C73.2458 24.9715 75.2638 30.6402 75.8334 36.5409C76.403 42.4415 75.5067 48.3916 73.2239 53.8625',
	55 : 'M40 4C45.1511 4 50.2422 5.10543 54.9294 7.24162C59.6167 9.37781 63.791 12.495 67.1703 16.3827C70.5496 20.2704 73.0552 24.838 74.518 29.777C75.9807 34.716 76.3665 39.9115 75.6494 45.0124C74.9322 50.1133 73.1286 55.0009 70.3606 59.3451C67.5926 63.6892 63.9246 67.3888 59.6043 70.1939C55.284 72.999 50.412 74.8443 45.3174 75.6051C40.2228 76.366 35.0243 76.0247 30.0729 74.6042',
	70 : 'M40 4C46.3193 4 52.5273 5.66343 58 8.82309C63.4727 11.9827 68.0173 16.5273 71.1769 22C74.3366 27.4727 76 33.6807 76 40C76 46.3193 74.3366 52.5273 71.1769 58C68.0173 63.4727 63.4727 68.0173 58 71.1769C52.5273 74.3366 46.3193 76 40 76C33.6807 76 27.4727 74.3366 22 71.1769C16.5273 68.0173 11.9827 63.4727 8.82308 58',
	75 : 'M40 4C46.3193 4 52.5273 5.66343 58 8.82309C63.4727 11.9827 68.0173 16.5273 71.1769 22C74.3366 27.4727 76 33.6807 76 40C76 46.3193 74.3366 52.5273 71.1769 58C68.0173 63.4727 63.4727 68.0173 58 71.1769C52.5273 74.3366 46.3193 76 40 76C33.6807 76 27.4727 74.3366 22 71.1769C16.5273 68.0173 11.9827 63.4727 8.82308 58',
	90 : 'M40 4C48.9607 4 57.5993 7.34181 64.2272 13.3722C70.8551 19.4025 74.9958 27.688 75.8399 36.6088C76.684 45.5297 74.1708 54.4447 68.7916 61.6112C63.4124 68.7777 55.5539 73.6804 46.7522 75.3611C37.9505 77.0418 28.8384 75.3796 21.197 70.6993C13.5557 66.0191 7.93449 58.6574 5.43218 50.0531C2.92986 41.4489 3.72635 32.2207 7.66595 24.1725C11.6056 16.1243 18.4051 9.83458 26.7353 6.53288',
};

export const handlingtype = [
	{
		label : 'Stackable',
		value : 'stackable',
	},
	{
		label : 'Non-Stackable',
		value : 'non_stackable',
	},
];
export const PriceTypeOptions = [
	{
		label : 'All In',
		value : 'all',
	},
	{
		label : 'Net Net',
		value : 'net',
	},
];
export const PackagingTypeOptions = [
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
export const RateTypeOptions = [
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
