import { addDays } from '@cogoport/utils';

const MIN_DATE_LIMIT = 1;
const MAX_DATE_LIMIT = 31;

export const cargoControls = ({
	insuranceDetails = {},
	shipmentData = {},
	policyDetails = {},
}) => [
	{
		name           : 'policyCommodityId',
		label          : 'Commodity',
		type           : 'select',
		options        : [],
		span           : 4,
		optionsListKey : 'insurance_commodities',
		value:
			insuranceDetails?.policyCommodityId
			|| policyDetails?.cargo_insurance_commodity_id,
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
		value:
			insuranceDetails?.cargoDescription
			|| policyDetails?.cargo_insurance_commodity_description,
		rules: { required: 'Commodity Description is required' },
	},
	{
		label       : 'Packaging Description',
		name        : 'packaging',
		type        : 'text',
		span        : 4,
		placeholder : 'Enter Packaging Description',
		value       : insuranceDetails?.packaging,
		rules       : { required: 'Packaging Description is required' },
	},
	{
		label       : 'Inco Term',
		name        : 'incoterm',
		type        : 'select',
		placeholder : 'Select Inco Term',
		span        : 4,
		value       : (
			insuranceDetails?.incoterm || shipmentData?.inco_term
		)?.toUpperCase(),
		disabled : true,
		options  : [
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
		value:
			insuranceDetails?.policyCountryId
			|| (insuranceDetails?.policyType === 'IMPORT'
				? policyDetails?.origin_country_id
				: policyDetails?.destination_country_id),
		disabled : true,
		params   : {
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
		value       : insuranceDetails?.locationFrom,
		rules       : { required: 'Coverage From is required' },
	},
	{
		name        : 'locationTo',
		label       : ' Coverage To',
		type        : 'text',
		span        : 4,
		placeholder : 'Coverage To',
		value       : insuranceDetails?.locationTo,
		rules       : { required: 'Coverage To is required' },
	},
	{
		name    : 'riskCoverage',
		label   : 'Coverage',
		type    : 'select',
		span    : 4,
		value   : insuranceDetails?.riskCoverage || 'ALL_RISK',
		options : [{ label: 'All Risk', value: 'ALL_RISK' }],
	},

	{
		name        : 'transitDate',
		label       : 'Transition Date',
		placeholder : 'Select Transition Date',
		type        : 'datepicker',
		span        : 4,
		isClearable : true,
		value       : insuranceDetails?.transitDate
			? new Date(insuranceDetails?.transitDate)
			: addDays(new Date(), MIN_DATE_LIMIT),
		minDate      : addDays(new Date(), MIN_DATE_LIMIT),
		maxDate      : addDays(new Date(), MAX_DATE_LIMIT),
		rules        : { required: 'Transition Date is required' },
		showOptional : false,
	},
	{
		name           : 'policyCurrency',
		label          : 'Currency',
		span           : 2,
		type           : 'select',
		placeholder    : 'INR',
		optionsListKey : 'currencies',
		value:
			insuranceDetails?.policyCurrency || policyDetails?.cargo_value_currency,
		rules: { required: 'Required' },
	},
	{
		name        : 'cargoAmount',
		label       : 'Consignment Value',
		type        : 'number',
		placeholder : 'Enter Consignment Value',
		span        : 3,
		value       : insuranceDetails?.cargoAmount || policyDetails?.cargo_value,
		rules       : {
			required: {
				message : 'Required',
				max     : 400000000,
			},
		},
	},
];
