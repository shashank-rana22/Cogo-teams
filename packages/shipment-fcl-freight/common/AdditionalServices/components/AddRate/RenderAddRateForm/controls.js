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

const controls = ({ serviceData = {}, source = '' }) => {
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
			show    : source === 'task' || source === 'overview',
		},
		{
			name        : 'buy_price',
			label       : 'Buy price',
			type        : 'input',
			span        : 6,
			placeholder : 'Enter Buy Price',
			rules       : { required: 'Buy Price is required' },
			show        : source !== 'task' || source === 'overview',
		},
		{
			name    : 'unit',
			label   : 'Unit',
			type    : 'select',
			span    : 6,
			options : unitOptions,
			rules   : { required: 'Unit is required' },
			show    : source === 'task' || source === 'overview',
		},
		{
			name        : 'quantity',
			label       : 'Quantity',
			type        : 'input',
			span        : 6,
			placeholder : 'Enter quantity here',
			rules       : { required: 'Quantity is required' },
			show        : source === 'task' || source === 'overview',
		},
		{
			name        : 'price',
			label       : 'Price',
			type        : 'input',
			span        : 6,
			placeholder : 'Enter Price',
			rules       : { required: 'Price is required' },
			show        : source === 'task' || source === 'overview',
		},
		{
			name        : 'alias',
			label       : 'Alias (Optional)',
			type        : 'input',
			span        : 6,
			placeholder : 'Enter Alias (Only if required)',
			show        : source === 'task' || source === 'overview',
		},
		{
			name        : 'service_provider_id',
			label       : 'Service provider',
			type        : 'async-select',
			span        : 8,
			placeholder : 'Select Service Provider',
			rules       : { required: 'Service Provider is required' },
			show        : source !== 'task' || source === 'overview',
		},
	];

	return { formControl };
};

export default controls;
