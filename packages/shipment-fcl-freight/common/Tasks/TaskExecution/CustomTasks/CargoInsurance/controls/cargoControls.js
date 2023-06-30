import { addDays } from '@cogoport/utils';

const MIN_DATE_LIMIT = 1;
const MAX_DATE_LIMIT = 31;
const MIN_CONSIGNMENT_VALUE = 0;

export const cargoControls = ({ insuranceDetails = {} }) => [
	{
		name           : 'policyCommodityId',
		label          : 'Commodity',
		type           : 'select',
		options        : [],
		span           : 4,
		optionsListKey : 'insurance_commodities',
		placeholder    : 'select Commodity',
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
		options     : [
			{ label: 'FOB - Free On Board', value: 'FOB' },
			{ label: 'EXW - Ex Works', value: 'EXW' },
			{ label: 'FCA - Free Carrier', value: 'FCA' },
			{ label: 'FAS - Free Alongside Ship', value: 'FAS' },
			{ label: 'CIF - Cost, Insurance and Freight', value: 'CIF' },
			{ label: 'CFR - Cost and Freight', value: 'CFR' },
			{ label: 'CPT - Carriage Paid To', value: 'CPT' },
			{ label: 'CIP - Carriage and Insurance Paid to', value: 'CIP' },
			{ label: 'DAT - Delivered At Terminal', value: 'DAT' },
			{ label: 'DAP - Delivered At Place', value: 'DAP' },
			{ label: 'DDP - Delivered Duty Paid', value: 'DDP' },
		],
		rules: { required: 'Inco Term is required' },
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

		rules: { required: 'Required' },
	},
	{
		name        : 'cargoAmount',
		label       : 'Consignment Value',
		type        : 'number',
		placeholder : 'Enter Consignment Value',
		span        : 3,
		rules       : {
			required: {
				message : 'Required',
				max     : 400000000,
				min     : 0,
			},
			validate: (v) => {
				if (v < MIN_CONSIGNMENT_VALUE) {
					return 'Consignment Value should not in negative';
				}
				return '';
			},
		},
	},
];
