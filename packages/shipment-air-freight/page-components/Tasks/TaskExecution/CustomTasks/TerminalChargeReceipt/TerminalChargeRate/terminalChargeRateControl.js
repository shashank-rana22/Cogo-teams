import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const CURRENCY_OPTIONS = Object.keys(GLOBAL_CONSTANTS.currency_code).map((currencyCode) => ({
	label : currencyCode,
	value : currencyCode,
}));

const ENTITY_CODES = Object.keys(ENTITY_FEATURE_MAPPING).filter(
	(key) => ENTITY_FEATURE_MAPPING[key].feature_supported.includes('terminal_charge'),
);

const getTerminalChargeRateControl = ({ setEntityData = () => {} }) => {
	const TERMINAL_CHARGE_RATE_CONTROL = [
		{
			name     : 'cogo_entity_id',
			label    : 'Select Cogo Entity',
			type     : 'async-select',
			asyncKey : 'list_cogo_entity',
			params   : {
				filters: {
					entity_code: ENTITY_CODES,
				},
			},
			placeholder    : 'Select Cogo Entity',
			rules          : { required: 'This is required' },
			span           : 6,
			defaultOptions : true,
			onChange       : (_, val) => { setEntityData({ ...val }); },
		},
		{
			name    : 'currency',
			label   : 'Currency',
			type    : 'select',
			rules   : { required: 'Currency is required' },
			span    : 6,
			options : CURRENCY_OPTIONS,
		},

		{
			name        : 'price',
			label       : 'Price',
			type        : 'number',
			placeholder : 'Enter Sell Price',
			rules       : { required: 'Price is required', min: 0 },
			span        : 6,
		},
		{
			name        : 'tax_price',
			label       : 'Tax Price',
			type        : 'number',
			placeholder : 'Enter Tax Price',
			rules       : { required: 'Price is required', min: 0 },
			span        : 6,
		},
		{
			name        : 'total_tax_price',
			label       : 'Total Tax Price',
			type        : 'number',
			placeholder : 'Enter Total Tax Price',
			rules       : { required: 'Price is required', min: 0 },
			span        : 6,
		},
		{
			name        : 'alias',
			label       : 'Alias (Optional)',
			type        : 'text',
			placeholder : 'Enter Alias (Only if required)',
			span        : 6,
		},
	];
	return TERMINAL_CHARGE_RATE_CONTROL;
};

export default getTerminalChargeRateControl;
