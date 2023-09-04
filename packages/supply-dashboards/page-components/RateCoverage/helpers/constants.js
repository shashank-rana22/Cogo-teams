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
	0   : '',
	5   : 'M40 4C42.5568 4 45.1063 4.27238 47.6054 4.81254',
	10  : 'M40 4C48.9507 4 57.5805 7.33438 64.2058 13.3527',
	15  : 'M40 4C48.9507 4 57.5805 7.33438 64.2058 13.3527',
	20  : 'M40 4C47.0221 4 53.8908 6.05366 59.7605 9.9081C65.6302 13.7625 70.2444 19.2495 73.0351 25.6932',
	25  : 'M40 4C44.7276 4 49.4089 4.93117 53.7766 6.74034C58.1443 8.54951 62.1129 11.2012 65.4558 14.5442C68.7988 17.8871 71.4505 21.8557 73.2597 26.2234C75.0688 30.5911 76 35.2724 76 40',
	35  : 'M40 4C45.9281 4 51.7645 5.46394 56.9908 8.26181C62.2171 11.0597 66.6716 15.1049 69.9587 20.0382C73.2458 24.9715 75.2638 30.6402 75.8334 36.5409C76.403 42.4415 75.5067 48.3916 73.2239 53.8625',
	45  : 'M40 4C47.8785 4 55.5395 6.5845 61.8079 11.3571C68.0763 16.1297 72.606 22.8268 74.7023 30.4213C76.7986 38.0158 76.3456 46.0883 73.4129 53.4006C70.4802 60.7129 65.2298 66.8613 58.4668 70.9027',
	55  : 'M40 4C45.1511 4 50.2422 5.10543 54.9294 7.24162C59.6167 9.37781 63.791 12.495 67.1703 16.3827C70.5496 20.2704 73.0552 24.838 74.518 29.777C75.9807 34.716 76.3665 39.9115 75.6494 45.0124C74.9322 50.1133 73.1286 55.0009 70.3606 59.3451C67.5926 63.6892 63.9246 67.3888 59.6043 70.1939C55.284 72.999 50.412 74.8443 45.3174 75.6051C40.2228 76.366 35.0243 76.0247 30.0729 74.6042',
	65  : 'M40 4C45.723 4 51.3635 5.36442 56.4538 7.9801C61.544 10.5958 65.9373 14.3874 69.2693 19.0403C72.6013 23.6933 74.776 29.0737 75.6129 34.7351C76.4499 40.3966 75.9251 46.176 74.0819 51.5941C72.2388 57.0121 69.1305 61.9127 65.0148 65.8893C60.8992 69.866 55.8947 72.8041 50.4165 74.4601C44.9384 76.116 39.1443 76.442 33.515 75.4111C27.8856 74.3801 22.5831 72.022 18.0473 68.5321',
	75  : 'M40 4C46.3193 4 52.5273 5.66343 58 8.82309C63.4727 11.9827 68.0173 16.5273 71.1769 22C74.3366 27.4727 76 33.6807 76 40C76 46.3193 74.3366 52.5273 71.1769 58C68.0173 63.4727 63.4727 68.0173 58 71.1769C52.5273 74.3366 46.3193 76 40 76C33.6807 76 27.4727 74.3366 22 71.1769C16.5273 68.0173 11.9827 63.4727 8.82308 58',
	95  : 'M40 4C48.9607 4 57.5993 7.34181 64.2272 13.3722C70.8551 19.4025 74.9958 27.688 75.8399 36.6088C76.684 45.5297 74.1708 54.4447 68.7916 61.6112C63.4124 68.7777 55.5539 73.6804 46.7522 75.3611C37.9505 77.0418 28.8384 75.3796 21.197 70.6993C13.5557 66.0191 7.93449 58.6574 5.43218 50.0531C2.92986 41.4489 3.72635 32.2207 7.66595 24.1725C11.6056 16.1243 18.4051 9.83458 26.7353 6.53288',
	100 : 'M40 4C44.7276 4 49.4089 4.93117 53.7766 6.74034C58.1443 8.54951 62.1129 11.2012 65.4558 14.5442C68.7988 17.8871 71.4505 21.8557 73.2597 26.2234C75.0688 30.5911 76 35.2724 76 40C76 44.7276 75.0688 49.4089 73.2597 53.7766C71.4505 58.1443 68.7987 62.1129 65.4558 65.4559C62.1129 68.7988 58.1443 71.4505 53.7766 73.2597C49.4089 75.0688 44.7276 76 40 76C35.2724 76 30.5911 75.0688 26.2234 73.2597C21.8557 71.4505 17.8871 68.7987 14.5441 65.4558C11.2012 62.1129 8.5495 58.1443 6.74033 53.7766C4.93116 49.4089 4 44.7276 4 40C4 35.2724 4.93117 30.5911 6.74034 26.2234C8.54952 21.8557 11.2013 17.887 14.5442 14.5441C17.8871 11.2012 21.8557 8.5495 26.2234 6.74033C30.5911 4.93116 35.2724 4 40 4L40 4Z',
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
		value : 'all_in',
	},
	{
		label : 'Net Net',
		value : 'net_net',
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

export const fclCommodityOptions = [
	{
		label : 'General',
		value : 'general',
	},
	{
		label : 'White Goods',
		value : 'white_goods',
	},
	{
		label : 'PTA',
		value : 'pta',
	},
	{
		label : 'Cotton and yarn',
		value : 'cotton_and_yarn',
	},
	{
		label : 'Fabric and textiles',
		value : 'fabric_and_textiles',
	},
	{
		label : 'Sugar Rice',
		value : 'sugar_rice',
	},
	{
		label : 'Gases 2.1',
		value : 'gases-2.1',
	},
	{
		label : 'Gases 2.2',
		value : 'gases-2.2',
	},
	{
		label : 'Gases 2.3',
		value : 'gases-2.3',
	},
	{
		label : 'Flammable Liquids 3',
		value : 'flammable_liquids-3',
	},
	{
		label : 'Flammable Solids 4.1',
		value : 'flammable_solids-4.1',
	},
	{
		label : 'Flammable Solids Self Heat 4.2',
		value : 'flammable_solids_self_heat-4.2',
	},
	{
		label : 'IMO Classes 5.1',
		value : 'imo_classes-5.1',
	},
	{
		label : 'Toxic Substances 6.1',
		value : 'toxic_substances-6.1',
	},
	{
		label : 'Infectious Substances 6.2',
		value : 'infectious_substances-6.2',
	},
	{
		label : 'Radioactive Material 7',
		value : 'radioactive_material-7',
	},
	{
		label : 'Corrosives 8',
		value : 'corrosives-8',
	},
	{
		label : 'Miscellaneous Dangerous Goods 9',
		value : 'miscellaneous_dangerous_goods-9',
	},
];
