import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const MIN_PRICE = 0;

export const getlineItemControls = (
	CHARGE_CODE_DATA,
	unitValue,
) => {
	const codeOptions = Object.keys(CHARGE_CODE_DATA).map((charges) => ({
		label : `${charges}`,
		value : `${charges}`,
	}));

	const controls = [
		{
			name        : 'code',
			label       : 'Code',
			type        : 'select',
			placeholder : 'Code',
			options     : codeOptions,
			rules       : { required: 'This is required' },
		},
		{
			name        : 'unit',
			label       : 'Unit',
			type        : 'select',
			placeholder : 'Units',
			rules       : { required: 'This is required' },
		},
		{
			name        : 'currency',
			label       : 'Currency',
			type        : 'select',
			placeholder : 'Currency',
			rules       : { required: 'This is required' },
			options     : [
				GLOBAL_CONSTANTS.currency_code.USD,
				GLOBAL_CONSTANTS.currency_code.EUR,
				GLOBAL_CONSTANTS.currency_code.INR,
				GLOBAL_CONSTANTS.currency_code.GBP,
			].map((currencyCode) => ({
				label : currencyCode,
				value : currencyCode,
			})),
		},
		{
			name        : 'price',
			label       : 'Price',
			type        : 'number',
			placeholder : 'Price',
			rules       : {
				required : 'This is required',
				validate : (value) => (value < MIN_PRICE ? `Value should be greater than ${MIN_PRICE}` : true),
			},
		},
	];

	if (unitValue === 'per_wm') {
		controls.push({
			name        : 'cbm_weight_ratio',
			label       : 'Cbm weight ratio',
			type        : 'number',
			placeholder : 'cbm weight ratio',
			rules       : { required: 'This is required' },
			span        : 6,
		});
	}

	return controls;
};
