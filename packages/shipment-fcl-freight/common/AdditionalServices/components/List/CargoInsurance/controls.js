import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const controls = [
	{
		label          : 'Commodity',
		name           : 'cargo_insurance_commodity',
		type           : 'select',
		span           : 12,
		optionsListKey : 'insurance_commodities',
		defaultOptions : true,
		options        : [],
		placeholder    : 'Select Commodity',
		rules          : { required: 'Commodity is required' },
	},
	{
		name  : 'cargo_insurance_commodity_description',
		label : 'Commodity Description',
		type  : 'text',
		span  : 12,
		rules : { required: 'Commodity Description is required' },
	},
	{
		name           : 'cargo_value_currency',
		label          : 'Currency',
		type           : 'select',
		span           : 4,
		optionsListKey : 'currencies',
		value          : `${GLOBAL_CONSTANTS.currency_code.USD}`,
		validations    : [{ type: 'required', message: 'Currency is required' }],
	},
	{
		name  : 'cargo_value',
		label : 'Consignment Value',
		type  : 'number',
		span  : 8,
		rules : { required: 'Consignment Value is required' },
	},
];
export default controls;
