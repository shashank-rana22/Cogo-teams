import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { addDays } from '@cogoport/utils';

const MIN_DATE_LIMIT = 1;
const MAX_DATE_LIMIT = 31;
const MAX_CONSIGNMENT_VALUE = 400000000;

const INCO_TERMS = Object.entries(GLOBAL_CONSTANTS.options.inco_term)
	.forEach(([key, value]) => ({ label: value.label, value: key }));

export const cargoControls = ({ insuranceDetails = {} }) => [
	{
		name           : 'policyCommodityId',
		label          : 'Commodity',
		type           : 'select',
		options        : [],
		span           : 4,
		optionsListKey : 'insurance_commodities',
		placeholder    : 'Select Commodity',
		defaultOptions : true,
		rules          : { required: 'Commodity is required' },
	},
	{
		label       : 'Commodity Description',
		name        : 'cargoDescription',
		type        : 'text',
		span        : 4,
		placeholder : 'Enter Commodity Description',
		rules       : { required: 'Commodity Description is required' },
	},
	{
		label       : 'Packaging Description',
		name        : 'packaging',
		type        : 'text',
		span        : 4,
		placeholder : 'Enter Packaging Description',
		rules       : { required: 'Packaging Description is required' },
	},
	{
		label       : 'Inco Term',
		name        : 'incoterm',
		type        : 'select',
		placeholder : 'Select Inco Term',
		span        : 4,
		disabled    : true,
		options     : INCO_TERMS,
		rules       : { required: 'Inco Term is required' },
	},
	{
		name  : 'policyCountryId',
		label : insuranceDetails?.policyType === 'IMPORT' ? 'Origin' : 'Destination',
		placeholder:
			insuranceDetails?.policyType === 'IMPORT'
				? 'Select Origin'
				: 'Select Destination',
		type           : 'location-select',
		span           : 5,
		optionsListKey : 'locations',
		disabled       : true,
		params         : {
			filters: {
				type: ['country'],
			},
		},
		rules: {
			required:
				insuranceDetails?.policyType === 'IMPORT'
					? 'Origin is required'
					: 'Destination is required',
		},
	},
	{
		name        : 'locationFrom',
		label       : 'Coverage From ',
		type        : 'text',
		span        : 4,
		placeholder : 'Coverage From',
		rules       : { required: 'Coverage From is required' },
	},
	{
		name        : 'locationTo',
		label       : ' Coverage To',
		type        : 'text',
		span        : 4,
		placeholder : 'Coverage To',
		rules       : { required: 'Coverage To is required' },
	},
	{
		name    : 'riskCoverage',
		label   : 'Coverage',
		type    : 'select',
		span    : 4,
		options : [{ label: 'All Risk', value: 'ALL_RISK' }],
	},

	{
		name           : 'transitDate',
		label          : 'Transition Date',
		placeholder    : 'Select Transition Date',
		type           : 'datepicker',
		span           : 4,
		isClearable    : true,
		minDate        : addDays(new Date(), MIN_DATE_LIMIT),
		maxDate        : addDays(new Date(), MAX_DATE_LIMIT),
		rules          : { required: 'Transition Date is required' },
		showTimeSelect : true,
		dateFormat     : 'MMM dd, yyyy, hh:mm:ss aaa',
		showOptional   : false,
	},
	{
		name           : 'policyCurrency',
		label          : 'Currency',
		span           : 2,
		type           : 'select',
		placeholder    : 'INR',
		optionsListKey : 'currencies',
		rules          : { required: 'Currency is Required' },
	},
	{
		name        : 'cargoAmount',
		label       : 'Consignment Value',
		type        : 'number',
		placeholder : 'Enter Consignment Value',
		span        : 3,
		min         : {
			value   : 0,
			message : 'Consignment Value cannot be negative',
		},
		max: {
			value   : 400000000,
			message : `Consignment Value cannot be greater than ${MAX_CONSIGNMENT_VALUE}`,
		},
		rules: {
			required: 'Consignment Value is Required',
		},
	},
];
