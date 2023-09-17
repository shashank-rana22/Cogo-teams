import { CustomOptions } from '@cogoport/air-modules';
import currencies from '@cogoport/air-modules/helpers/currencies';
import { startCase } from '@cogoport/utils';

const COMMON_SHOW_SOURCE = ['task', 'overview', 'purchase', 'add_sell_price', 'charge_code'];

const controls = ({ serviceData = {}, source = '' }) => {
	const UNIT_OPTIONS = [];
	if (serviceData?.units) {
		serviceData?.units?.forEach((unit) => { UNIT_OPTIONS.push({ label: startCase(unit), value: unit }); });
	} else UNIT_OPTIONS.push({ label: startCase(serviceData?.unit), value: serviceData?.unit });

	const formControl = [
		{
			name    : 'currency',
			label   : 'Currency',
			type    : 'select',
			options : currencies,
			rules   : { required: 'Currency is required' },
			show    : COMMON_SHOW_SOURCE.includes(source),
			size    : 'sm',

		},
		{
			name        : 'buy_price',
			label       : 'Buy price',
			type        : 'number',
			placeholder : 'Enter Buy Price',
			rules       : { required: 'Buy Price is required', min: 0 },
			show        : source !== 'task' || source === 'overview'
			|| serviceData?.state === 'amendment_requested_by_importer_exporter',
			disabled : serviceData?.state === 'amendment_requested_by_importer_exporter' || source === 'add_sell_price',
			size     : 'sm',
		},
		{
			name     : 'unit',
			label    : 'Unit',
			type     : 'select',
			span     : 6,
			options  : UNIT_OPTIONS,
			rules    : { required: 'Unit is required' },
			show     : COMMON_SHOW_SOURCE.includes(source),
			disabled : serviceData?.state === 'amendment_requested_by_importer_exporter' || source === 'add_sell_price',
			size     : 'sm',
		},
		{
			name        : 'quantity',
			label       : 'Quantity',
			type        : 'number',
			placeholder : 'Enter quantity here',
			rules       : { required: 'Quantity is required', min: 0 },
			show        : COMMON_SHOW_SOURCE.includes(source),
			size        : 'sm',
		},
		{
			name        : 'service_provider_id',
			label      	: 'Service Provider',
			type        : 'asyncSelect',
			placeholder : 'Select Service Provider',
			asyncKey    : 'organizations',
			params      : {
				filters: {
					account_type : 'service_provider',
					kyc_status   : 'verified',
				},
			},
			show        : source === 'purchase',
			size        : 'sm',
			rules       : { required: 'Service Provider is required' },
			renderLabel : CustomOptions,
		},
		{
			name        : 'price',
			label       : 'Sell Price',
			type        : 'number',
			placeholder : 'Enter Sell Price',
			rules       : { required: 'Price is required', min: 0 },
			show        : !['purchase'].includes(source),
			size        : 'sm',
		},
		{
			name        : 'alias',
			label       : 'Alias (Optional)',
			type        : 'text',
			placeholder : 'Enter Alias (Only if required)',
			show        : COMMON_SHOW_SOURCE.includes(source),
			size        : 'sm',
		},
	];

	return { formControl };
};

export default controls;
