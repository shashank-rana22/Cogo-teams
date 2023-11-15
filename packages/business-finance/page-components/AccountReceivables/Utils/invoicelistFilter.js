import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const geo = getGeoConstants();

const USER_IDS = [
	GLOBAL_CONSTANTS.uuid.vinod_talapa_user_id,
	GLOBAL_CONSTANTS.uuid.hk_user_id,
	GLOBAL_CONSTANTS.uuid.abhishek_kumar_user_id];

export const invoiceFilter = ({ profile = {} }) => {
	const selectedOption = USER_IDS.includes(profile?.user?.id)
		? geo.options.invoice_status
		: geo.options.invoice_status_new;
	return [
		{
			name        : 'paymentStatusList',
			placeholder : 'Paid Status',
			size        : 'sm',
			isClearable : true,
			type        : 'multiSelect',
			options     : [
				{ value: 'paid', label: 'Paid' },
				{ value: 'unpaid', label: 'Unpaid' },
				{ value: 'partial_paid', label: 'Partially paid' },

			],
		},
		{
			name        : 'invoiceStatus',
			placeholder : 'Invoice Status',
			size        : 'sm',
			type        : 'select',
			caret       : true,
			isClearable : true,
			options     : selectedOption,

		},
		{
			name        : 'flag',
			placeholder : 'Defaulters',
			size        : 'sm',
			type        : 'select',
			caret       : true,
			isClearable : true,
			options     : [
				{ value: 'defaulters', label: 'Defaulters' },
				{ value: 'non_defaulters', label: 'Non Defaulters' },
			],

		},
	];
};

export const invoiceMoreFilter = () => [
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
		style                 : { width: '200px' },
	},
	{

		label                 : 'Due Date',
		name                  : 'dueDate',
		type                  : 'singleDateRange',
		placeholder           : 'Due Date',
		isPreviousDaysAllowed : true,
		span                  : 6,
		style                 : { width: '200px' },
	},
	{
		label       : 'Currency',
		name        : 'currency',
		type        : 'select',
		placeholder : 'Currency',
		isClearable : true,
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
