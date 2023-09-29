const getStep0Controls = [
	{
		name           : 'shipping_line_id_fcl_main',
		label          : 'Shipping Line FCL Freight',
		type           : 'select',
		optionsListKey : 'shipping-lines',
		placeholder    : 'Select Shipping Line',
		span           : 6,
		size           : 'sm',
		rules          : {
			required: { value: true, message: 'Shipping line is required' },
		},
	},
	{
		name           : 'service_provider_id_fcl_main',
		type           : 'select',
		label          : 'Service Provider FCL Freight',
		optionsListKey : 'verified-service-providers',
		placeholder    : 'Select Service Provider',
		multiple       : false,
		span           : 6,
		size           : 'sm',
		rules          : {
			required: { value: true, message: 'Service Provider is required' },
		},
		params: {
			filters: {
				account_type : 'service_provider',
				status       : 'active',
				kyc_status   : 'verified',
				service      : ['fcl_freight'],
			},

		},
	},
	{
		name           : 'shipping_line_id_fcl_local',
		label          : 'Shipping Line FCL Local',
		type           : 'select',
		optionsListKey : 'shipping-lines',
		placeholder    : 'Select Shipping Line',
		disabled       : true,
		span           : 6,
		size           : 'sm',
		rules          : {
			required: { value: true, message: 'Shipping line is required' },
		},
		className: 'primary sg',
	},
	{
		name           : 'service_provider_id_fcl_local',
		type           : 'select',
		label          : 'Service Provider FCL Local',
		optionsListKey : 'verified-service-providers',
		placeholder    : 'Select Service Provider',
		multiple       : false,
		span           : 6,
		size           : 'sm',
		rules          : {
			required: { value: true, message: 'Service Provider is required' },
		},
		params: {
			filters: {
				account_type : 'service_provider',
				status       : 'active',
				kyc_status   : 'verified',
				service      : ['fcl_freight_local_agent'],
			},
		},
	},
];

export default getStep0Controls;
