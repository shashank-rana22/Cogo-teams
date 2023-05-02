import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';

export const INVOICE_LIST_FILTERS = [
	{
		name        : 'migrated',
		placeholder : 'Migration',
		size        : 'sm',
		type        : 'select',
		caret       : true,
		isClearable : true,
		options     : [
			{ value: 'true', label: 'True' },
			{ value: 'false', label: 'False' },
		],
	},
	{
		name        : 'status',
		placeholder : 'Payment',
		size        : 'sm',
		type        : 'select',
		caret       : true,
		isClearable : true,
		options     : [

			{ value: 'paid', label: 'Paid' },
			{ value: 'unpaid', label: 'Unpaid' },
			{ value: 'partiallyPaid', label: 'Partially paid' },

		],
	},
	{
		name        : 'invoiceStatus',
		placeholder : 'Invoice',
		size        : 'sm',
		type        : 'select',
		caret       : true,
		isClearable : true,
		options     : [
			{ label: 'Draft', value: 'DRAFT' },
			{ label: 'Finance Accepted', value: 'FINANCE_ACCEPTED' },
			{ label: 'Irn Generated', value: 'IRN_GENERATED' },
			{ label: 'Irn Failed', value: 'IRN_FAILED' },
			{ label: 'Irn Cancelled', value: 'IRN_CANCELLED' },
			{ label: 'Posted to Sage', value: 'POSTED' },
			{ label: 'Post to Sage Failed', value: 'FAILED' },
			{ label: 'Requested', value: 'REQUESTED' },
		],
	},
];

export const INVOICE_MORE_FILTERS = [
	{
		label       : 'Services',
		name        : 'services',
		type        : 'multiSelect',
		isClearable : true,
		placeholder : 'Shipment Type',
		options     : [
			{ value: 'fcl_freight', label: 'FCL' },
			{ value: 'lcl_freight', label: 'LCL' },
			{ value: 'air_freight', label: 'AIR' },
			{ value: 'trailer_freight', label: 'Container Transportation' },
			{ value: 'ftl_freight', label: 'FTL' },
			{ value: 'ltl_freight', label: 'LTL' },
			{ value: 'haulage_freight', label: 'Rail Haulage' },
			{ value: 'fcl_customs', label: 'FCL Customs' },
			{ value: 'lcl_customs', label: 'LCL Customs' },
			{ value: 'air_customs', label: 'AIR Customs' },
			{ value: 'fcl_freight_local', label: 'FCL Freight Local' },
			{ value: 'rail_domestic_freight', label: 'Rail Domestic' },
		],
		span: 6,

	},
	{
		label                 : 'Invoice Date',
		name                  : 'invoiceDate',
		type                  : 'singleDateRange',
		placeholder           : 'Invoice Date',
		isPreviousDaysAllowed : true,
		span                  : 4.5,
	},
	{

		label                 : 'Due Date',
		name                  : 'dueDate',
		type                  : 'singleDateRange',
		placeholder           : 'Due Date',
		isPreviousDaysAllowed : true,
		span                  : 6,
	},
	{
		label       : 'Currency',
		name        : 'currency',
		type        : 'select',
		placeholder : 'Currency',
		options     : [
			GLOBAL_CONSTANTS.currency_code.USD,
			GLOBAL_CONSTANTS.currency_code.INR,
			GLOBAL_CONSTANTS.currency_code.EUR,
			GLOBAL_CONSTANTS.currency_code.GBP,
			GLOBAL_CONSTANTS.currency_code.CAD,
			GLOBAL_CONSTANTS.currency_code.SGD,
			GLOBAL_CONSTANTS.currency_code.VND,
		].map((currencyCode) => ({
			label : currencyCode,
			value : currencyCode,
		})),

	},

];
