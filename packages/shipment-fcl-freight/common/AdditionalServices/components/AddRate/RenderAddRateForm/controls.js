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
			options : currencyOptions,
			rules   : { required: 'Currency is required' },
			size    : 'sm',
		},
		{
			name        : 'buy_price',
			label       : 'Buy price',
			type        : 'number',
			min         : 0,
			placeholder : 'Enter Buy Price',
			rules       : { required: 'Buy Price is required' },
			size        : 'sm',
		},
		{
			name    : 'unit',
			label   : 'Unit',
			type    : 'select',
			options : unitOptions,
			rules   : { required: 'Unit is required' },
			size    : 'sm',
		},
		{
			name        : 'quantity',
			label       : 'Quantity',
			type        : 'number',
			min         : 0,
			placeholder : 'Enter quantity here',
			rules       : { required: 'Quantity is required' },
			size        : 'sm',
		},
		{
			name        : 'price',
			label       : 'Sell Price',
			type        : 'number',
			min         : 0,
			placeholder : 'Enter Sell Price',
			rules       : { required: 'Price is required' },
			size        : 'sm',
		},
		{
			name        : 'alias',
			label       : 'Alias (Optional)',
			type        : 'text',
			placeholder : 'Enter Alias (Only if required)',
			size        : 'sm',
		},
		{
			name        : 'service_provider_id',
			label       : 'Service provider',
			type        : 'asyncSelect',
			placeholder : 'Select Service Provider',
			asyncKey    : 'organizations',
			rules       : { required: 'Service Provider is required' },
			params      : {
				filters: {
					account_type : 'service_provider',
					kyc_status   : 'verified',
					service:
						serviceData?.service_type === 'rail_domestic_freight_service'
							? serviceData?.service_type?.split('_', 3)?.join('_')
							: serviceData?.service_type?.split('_', 2)?.join('_'),
				},
			},
			size: 'sm',
		},
	];

	return { formControl };
};

export default controls;
