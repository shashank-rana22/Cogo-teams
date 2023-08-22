import getGeoConstants from '@cogoport/globalization/constants/geo';

const geo = getGeoConstants();

const controls = ({ list }) => [
	{
		label          : 'Commodity',
		name           : 'cargo_insurance_commodity',
		labelKey       : 'commodity',
		valueKey       : 'id',
		type           : 'select',
		span           : 12,
		defaultOptions : true,
		options        : list,
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
		value          : `${geo?.country?.currency.code}`,
		validations    : [{ type: 'required', message: 'Currency is required' }],
	},
	{
		name  : 'cargo_value',
		label : 'Consignment Value',
		type  : 'number',
		span  : 8,
		rules : {
			required: {
				message: 'Consignment Value is Required',
			},
			min: {
				value   : 0,
				message : 'Consignment Value cannot be negative',
			},
		},
	},
];
export default controls;
