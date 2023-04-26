const getStep0Controls = [
	{
		name           : 'shipping_line_id_fcl_main',
		label          : 'Shipping Line Fcl Freight',
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
		label          : 'Service Provider Fcl Freight',
		optionsListKey : 'verified-service-providers',
		placeholder    : 'Select Service Provider',
		multiple       : false,
		span           : 6,
		size           : 'sm',
		rules          : {
			required: { value: true, message: 'Service Provider is required' },
		},
	},
	{
		name           : 'shipping_line_id_fcl_local',
		label          : 'Shipping Line Fcl Local',
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
		label          : 'Service Provider Fcl Local',
		optionsListKey : 'verified-service-providers',
		placeholder    : 'Select Service Provider',
		multiple       : false,
		span           : 6,
		size           : 'sm',
		rules          : {
			required: { value: true, message: 'Service Provider is required' },
		},
	},
];

export default getStep0Controls;
