import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

export const FILTER_CONTROLS = {
	'1D': {
		valueKey   : 'hour',
		dateFormat : GLOBAL_CONSTANTS?.formats?.time?.['hh aaa'],
	},
	'1W': {
		valueKey   : 'day',
		dateFormat : GLOBAL_CONSTANTS?.formats?.date?.['eee dd'],
	},
	'1M': {
		valueKey   : 'day',
		dateFormat : GLOBAL_CONSTANTS?.formats?.date?.['yyyy-MM-dd'],
	},
	'6M': {
		valueKey   : 'month',
		dateFormat : GLOBAL_CONSTANTS?.formats?.date?.['MMM yyyy'],
	},
	'1Y': {
		valueKey   : 'month',
		dateFormat : GLOBAL_CONSTANTS?.formats?.date?.['MMM yyyy'],
	},
};

export const GRAPH_LEGENDS = [
	{
		label : 'Search',
		color : '#F9AE64',
		key   : 'search_count',
	},
	{
		label : 'Quotation',
		color : '#ABB0DE',
		key   : 'quotation_count',
	},
	{
		label : 'Transaction',
		color : '#034AFD',
		key   : 'booked_shipments',
	},
	{
		label : 'Cancellation',
		color : '#F37166',
		key   : 'cancelled_shipments',
	},
	{
		label : 'New Accounts',
		color : '#C4DC91',
		key   : 'new_account_count',
	},
];
