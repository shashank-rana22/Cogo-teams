import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMAir, IcMFcl, IcCFlclCustoms, IcMFhaulage,
	IcCAirCustoms, IcMFlcl, IcMFltl, IcMFftl, IcCLclCustoms, IcMTransport, IcCFcl,
} from '@cogoport/icons-react';

export const STAT_CARDS_MAPPING = {
	pending   : { id: 1, title: 'Today\'s Pending', color: '#FF5733', status: 'pending' },
	completed : { id: 2, title: 'Today\'s Completed', color: '#728F3C', status: 'completed' },
	backlog   : { id: 3, title: 'Previous Backlogs', color: '#F69E50', status: 'backlog' },
};

export const WEEKLY_BACKLOG = {
	title  : 'Weeks Backlog',
	color  : '#FF5733',
	status : 'weekly_backlog_count',
};

export const CARDS_MAPPING = {
	live_booking: {
		title        : 'Live Bookings',
		status       : 'live_booking',
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
	expiring_rates: {
		title        : 'Expiring Rates',
		status       : 'expiring_rates',
		showViewMore : true,
	},
	cancelled_shipments: {
		title        : 'Cancelled Shipment',
		status       : 'cancelled_shipments',
		showViewMore : true,
	},
};
export const SERVICE_ICON_MAPPING = {
	fcl_freight : <IcMFcl height={20} width={20} />,
	lcl_freight : <IcMFlcl height={20} width={20} />,
	air_freight : <IcMAir height={20} width={20} />,
	ltl_freight : <IcMFltl height={20} width={20} />,
	ftl_freight : <IcMFftl height={20} width={20} />,
	air_customs : <IcCAirCustoms height={20} width={20} />,
	fcl_customs : <IcCFlclCustoms height={20} width={20} />,
	lcl_customs : <IcCLclCustoms height={20} width={20} />,
	haulage     : <IcMFhaulage height={20} width={20} />,
	trailer     : <IcMTransport height={20} width={20} />,
	fcl_cfs     : <IcCFcl height={20} width={20} />,
};

export const CLOSE_REASON_OPTIONS = [
	{ label: 'Shipping/Airline not serviceable', value: 'not_serviceable' },
	{ label: 'Rate not available', value: 'rate_not_available' },
	{ label: 'No change in rate', value: 'no_change_in_rate' },
];

export const CLOSE_REQUEST = [
	{ label: 'Request not serviceable', value: 'request_not_serviceable' },
	{ label: 'No Space With Service Provider', value: 'no_space_with_service_provider' },
	{ label: 'Wrong Request', value: 'wrong_request' },
	{ label: 'Lowest Rate Already Available in Platform', value: 'lowest_rate_already_available_on_platform' },
	{ label: 'Other Reason', value: 'other_reason' },
];

export const serviceOptions = [
	{
		label : 'FCL Freight',
		value : 'fcl_freight',
	},
	{
		label : 'LCL Freight',
		value : 'lcl_freight',
	},
	{
		label : 'AIR Freight',
		value : 'air_freight',
	},
	{
		label : 'LTL Freight',
		value : 'ltl_freight',
	},
	{
		label : 'FTL Freight',
		value : 'ftl_freight',
	},
	{
		label : 'FCL Customs',
		value : 'fcl_customs',
	},
	{
		label : 'LCL Customs',
		value : 'lcl_customs',
	},
	{
		label : 'AIR Customs',
		value : 'air_customs',
	},
	{
		label : 'Haulage Freight',
		value : 'haulage',
	},
	{
		label : 'Trailer Freight',
		value : 'trailer',
	},
	{
		label : 'FCL CFS',
		value : 'fcl_cfs',
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
	live_booking         : 'Live Booking',
	monitoring_dashboard : 'Monitoring Dashboard',
	cancelled_shipments  : 'Cancelled Shipments',
	rate_feedback        : 'Disliked Rates',
	rate_request         : 'Missing Rates',
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
		value : 'market_place',

	},
	{
		label : 'Promotional',
		value : 'promotional',
	},
	{
		label : 'Spot booking',
		value : 'spot_booking',
	},
];

export const airRateTypeOptions = [
	{ label: 'Market place', value: 'market_place' },
	{ label: 'Promotional', value: 'promotional' },
	{ label: 'Consolidation', value: 'consolidated' },
	{ label: 'Non Tariff Rate', value: 'non_tariff_rate' },
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

export const entityOptions = [
	{ name: 'all_entity', value: 'no_cogo_entity_id', label: 'All Entity' },
	{ name: 'my_entity', value: 'cogo_entity_id', label: 'My Entity' },
];

export const tradeTypeOptions = [
	{ name: 'import', value: 'import', label: 'Import' },
	{ name: 'export', value: 'export', label: 'Export' },
];

export const revertedOptions = [
	{ name: 'reverted', value: 'reverted', label: 'Reverted' },
	{ name: 'not_reverted', value: 'not_reverted', label: 'Not Reverted' },
];

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

export const filterOption = {
	fcl_freight : ['seaport'],
	lcl_freight : ['seaport'],
	air_freight : ['airport'],
	fcl_customs : ['seaport'],
	lcl_customs : ['seaport'],
	air_customs : ['airport'],
	haulage     : ['pincode', 'seaport'],
	trailer     : ['pincode', 'seaport'],
	ftl_freight : ['pincode', 'seaport'],
};

export const lineOptions = {
	fcl_freight : ['shipping_line'],
	air_freight : ['airline'],
};

export const DEFAULT_VALUE = 0;
export const FIFTY = 50;
export const SEVENTY_FIVE = 75;
export const VALUE_ONE = 1;
export const DELTA_VALUE = 0.1;
export const TWO_HUNDERD = 200;
export const LOADER_COUNT = 3;
export const LIST_CARD_LOADER_COUNT = 5;
export const VALUE_TWO = 2;
export const HUNDRED = 100;

export const USER_SERVICES = {
	'6addea60-a3de-4067-b08d-ece04be594ab' : ['fcl_freight', 'fcl_customs'],
	'f47788fe-85e8-4f86-a9d7-7c7902ea864a' : ['fcl_freight', 'fcl_customs'],
	'51641e0e-a5da-452a-81fc-ccb8fe6df343' : ['fcl_freight', 'fcl_customs', 'lcl_freight', 'lcl_customs'],
	'd7f62f2d-2b41-41ae-a9f0-200255de4d8f' : ['fcl_freight', 'fcl_customs'],
	'922b367f-0f3e-4872-91d0-68413fc7f955' : ['fcl_freight', 'fcl_customs'],
	'329fb317-f2f9-4c41-aabd-4a9befc53721' : ['fcl_freight', 'fcl_customs', 'fcl_cfs'],
	'1a0d178d-c2b9-473c-87e7-1ed0d750aff9' : ['air_freight', 'air_customs'],
	'763c56c3-4c7e-499f-9c65-1569269cbd2e' : ['air_freight', 'air_customs'],
	'038c43bf-9056-4398-8364-2241ad7ee0fa' : ['air_freight', 'air_customs'],
	'836a8d20-c273-485f-b787-c6b7bfe76f77' : ['air_freight', 'air_customs'],
	'b26629b3-49c8-4874-a758-b733045cb45d' : ['air_freight', 'air_customs'],
	'0ebebbbc-9823-43a5-b4b7-e52752f32a84' : ['ftl_freight', 'ltl_freight', 'trailer'],
	'432ddd8c-9bab-4dbd-be33-e91502ecb821' : ['haulage'],
};

export const cargoHandlingOptions	= [
	{
		label     : 'Dock stuffing',
		value     : 'stuffing_at_dock',
		tradeType : 'export',
	},
	{
		label     : 'Factory stuffing',
		value     : 'stuffing_at_factory',
		tradeType : 'export',
	},
	{
		label     : 'DPD without CFS',
		value     : 'dpd_without_cfs',
		tradeType : 'import',
	},
	{
		label     : 'DPD CFS dock stuffing',
		value     : 'dpd_cfs_dock_destuffing',
		tradeType : 'import',
	},
	{
		label     : 'DPD CFS factory destuffing',
		value     : 'dpd_cfs_factory_destuffing',
		tradeType : 'import',
	},
	{
		label     : 'Enpanelled CFS dock stuffing',
		value     : 'enpanelled_cfs_dock_destuffing',
		tradeType : 'import',
	},
	{
		label     : 'Enpanelled CFS factory destuffing',
		value     : 'enpanelled_cfs_factory_destuffing',
		tradeType : 'import',
	},
	{
		label     : 'Non enpanelled CFS dock destuffing',
		value     : 'non_enpanelled_cfs_dock_destuffing',
		tradeType : 'import',
	},
	{
		label     : 'Non enapnelled CFS factory destuffing',
		value     : 'non_enpanelled_cfs_factory_destuffing',
		tradeType : 'import',
	},
];

export const COMMODITY_TYPE_OPTIONS = {
	general: [
		{ label: 'All', value: 'all' },
	],
	special_consideration: [
		{ label: 'Dangerous Goods', value: 'dangerous' },
		{ label: 'Temperature Controlled/Pharma', value: 'temp_controlled' },
		{ label: 'Other Special Commodity Sub Type', value: 'other_special' },
	],
};
