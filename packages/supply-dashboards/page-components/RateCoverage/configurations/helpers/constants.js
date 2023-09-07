import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMAir, IcMFcl } from '@cogoport/icons-react';

export const STAT_CARDS_MAPPING = {
	pending   : { title: 'Today\'s Pending', color: '#FF5733', status: 'pending' },
	completed : { title: 'Today\'s Completed', color: '#728F3C', status: 'completed' },
	backlogs  : { title: 'Previous Backlogs', color: '#F69E50', status: 'backlogs' },
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
	// 	status       : 'monitoring_dashboard',		//may introduced in future
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

export const DEFAULT_VALUE = 0;
export const FIFTY = 50;
export const SEVENTY_FIVE = 75;
