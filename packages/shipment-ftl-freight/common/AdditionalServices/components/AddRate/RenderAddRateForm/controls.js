import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
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
	const UNITOPTIONS = [];

	if (serviceData?.units) {
		serviceData?.units?.forEach((unit) => { UNITOPTIONS.push({ label: startCase(unit), value: unit }); });
	} else UNITOPTIONS.push({ label: startCase(serviceData?.unit), value: serviceData?.unit });

	const formControl = [
		{
			name    : 'currency',
			label   : 'Currency',
			type    : 'select',
			options : currencyOptions,
			rules   : { required: 'Currency is required' },
			show    : ['task', 'overview', 'purchase'].includes(source),
			size    : 'sm',

		},
		{
			name        : 'buy_price',
			label       : 'Buy price',
			type        : 'number',
			placeholder : 'Enter Buy Price',
			rules       : { required: 'Buy Price is required', min: 0 },
			show        : source !== 'task' || source === 'overview' || source === 'purchase'
			|| serviceData?.state === 'amendment_requested_by_importer_exporter',
			disabled : serviceData?.state === 'amendment_requested_by_importer_exporter' || source === 'add_sell_price',
			size     : 'sm',
		},
		{
			name     : 'unit',
			label    : 'Unit',
			type     : 'select',
			span     : 6,
			options  : UNITOPTIONS,
			rules    : { required: 'Unit is required' },
			show     : ['task', 'overview', 'purchase'].includes(source),
			disabled : serviceData?.state === 'amendment_requested_by_importer_exporter' || source === 'add_sell_price',
			size     : 'sm',
		},
		{
			name        : 'quantity',
			label       : 'Quantity',
			type        : 'number',
			placeholder : 'Enter quantity here',
			rules       : { required: 'Quantity is required', min: 0 },
			show        : ['task', 'overview', 'purchase'].includes(source),
			size        : 'sm',
		},
		{
			name        : 'price',
			label       : 'Price',
			type        : 'number',
			placeholder : 'Enter Sell Price',
			rules       : { required: 'Price is required', min: 0 },
			show        : ['task', 'purchase'].includes(source),
			size        : 'sm',
		},
		{
			name        : 'service_provider_id',
			label       : 'Service provider',
			type        : 'asyncSelect',
			placeholder : 'Select Service Provider',
			asyncKey    : 'organizations',
			params      : {
				filters: {
					account_type : 'service_provider',
					kyc_status   : 'verified',
				},
			},
			size  : 'sm',
			show  : ['overview'].includes(source),
			rules : { required: 'org is required' },
		},
		{
			name        : 'alias',
			label       : 'Alias (Optional)',
			type        : 'text',
			placeholder : 'Enter Alias (Only if required)',
			show        : ['task', 'overview', 'purchase'].includes(source),
			size        : 'sm',
		},
	];

	return { formControl };
};

export default controls;
