import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { startCase } from '@cogoport/utils';

const currencyOptions = [
	GLOBAL_CONSTANTS.currency_code.INR,
	GLOBAL_CONSTANTS.currency_code.USD,
	GLOBAL_CONSTANTS.currency_code.EUR,
	GLOBAL_CONSTANTS.currency_code.GBP,
].map((currency) => ({
	label : currency,
	value : currency,
}));

const controls = ({ serviceData }) => {
	const unitOptions = [];
	if (serviceData?.units) {
		serviceData?.units?.forEach((unit) => { unitOptions.push({ label: startCase(unit), value: unit }); });
	} else unitOptions.push({ label: startCase(serviceData?.unit), value: serviceData?.unit });

	const formControl = [
		{
			name    : 'currency',
			label   : 'Currency',
			type    : 'select',
			span    : 6,
			options : currencyOptions,
			rules   : { required: 'Currency is required' },
		},
		{
			name        : 'buy_price',
			label       : 'Buy price',
			type        : 'input',
			span        : 6,
			placeholder : 'Enter Buy Price',
			rules       : { required: 'Buy Price is required' },
		},
		{
			name    : 'unit',
			label   : 'Unit',
			type    : 'select',
			span    : 6,
			options : unitOptions,
			rules   : { required: 'Unit is required' },
		},
		{
			name        : 'quantity',
			label       : 'Quantity',
			type        : 'input',
			span        : 6,
			placeholder : 'Enter quantity here',
			rules       : { required: 'Quantity is required' },
		},
		{
			name        : 'price',
			label       : 'Sell Price',
			type        : 'input',
			span        : 6,
			placeholder : 'Enter Sell Price',
			rules       : { required: 'Price is required' },
		},
		{
			name        : 'alias',
			label       : 'Alias (Optional)',
			type        : 'input',
			span        : 6,
			placeholder : 'Enter Alias (Only if required)',
		},
		{
			name        : 'service_provider_id',
			label       : 'Service provider',
			type        : 'async-select',
			span        : 8,
			placeholder : 'Select Service Provider',
			rules       : { required: 'Service Provider is required' },
		},
	];

	return { formControl };
};

export default controls;
