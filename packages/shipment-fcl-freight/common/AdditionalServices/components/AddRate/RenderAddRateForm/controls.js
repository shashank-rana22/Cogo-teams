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
			options : currencyOptions,
			rules   : { required: 'Currency is required' },
			show    : source === 'task' || source === 'overview',
			size    : 'sm',
		},
		{
			name        : 'buy_price',
			label       : 'Buy price',
			type        : 'number',
			placeholder : 'Enter Buy Price',
			rules       : { required: 'Buy Price is required' },
			show        : source !== 'task' || source === 'overview'
			|| serviceData?.state === 'amendment_requested_by_importer_exporter',
			disabled : serviceData?.state === 'amendment_requested_by_importer_exporter',
			size     : 'sm',
		},
		{
			name     : 'unit',
			label    : 'Unit',
			type     : 'select',
			span     : 6,
			options  : unitOptions,
			rules    : { required: 'Unit is required' },
			show     : source === 'task' || source === 'overview',
			disabled : serviceData?.state === 'amendment_requested_by_importer_exporter',
			size     : 'sm',
		},
		{
			name        : 'quantity',
			label       : 'Quantity',
			type        : 'number',
			placeholder : 'Enter quantity here',
			rules       : { required: 'Quantity is required' },
			show        : source === 'task' || source === 'overview',
			size        : 'sm',
		},
		{
			name        : 'price',
			label       : 'Price',
			type        : 'input',
			span        : 6,
			placeholder : 'Enter Price',
			rules       : { required: 'Price is required' },
			show        : source === 'task' || source === 'overview',
			size        : 'sm',
		},
		{
			name        : 'alias',
			label       : 'Alias (Optional)',
			type        : 'input',
			placeholder : 'Enter Alias (Only if required)',
			show        : source === 'task' || source === 'overview',
			size        : 'sm',
		},
		{
			name        : 'service_provider_id',
			label       : 'Service provider',
			type        : 'async-select',
			placeholder : 'Select Service Provider',
			rules       : { required: 'Service Provider is required' },
			show        : source !== 'task' && source !== 'overview',
			size        : 'sm',
		},
	];

	return { formControl };
};

export default controls;
