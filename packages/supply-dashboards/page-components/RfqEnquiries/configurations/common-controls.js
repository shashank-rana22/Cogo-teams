const commonControls = ({ service }) => {
	const controls = [
		{
			name        : 'service_provider_id',
			label       : 'Service Provider',
			span        : 4,
			type        : 'select',
			placeholder : 'Select',
			rules       : { required: 'This is required' },
			requirement : true,

		},
		{
			label          : 'Rate Provided by user',
			name           : 'sourced_by_id',
			placeholder    : 'Select',
			type           : 'select',
			isClearable    : true,
			defaultOptions : false,
			span           : 4,
			rules          : { required: 'This is required' },
		},
	];
	const lineControls = {
		label: ['fcl_freight', 'haulage_freight', 'trailer_freight']
			.includes(service) ? 'Shipping Line' : 'Air Line',
		name: ['fcl_freight', 'haulage_freight', 'trailer_freight']
			.includes(service) ? 'shipping_line_id' : 'airline_id',
		placeholder : 'Select',
		type        : 'select',
		isClearable : true,
		span        : 4,
		requirement : true,
		rules       : { required: 'This is required' },
	};
	if (['fcl_freight', 'haulage_freight', 'air_freight', 'trailer_freight'].includes(service)) {
		return [...controls, lineControls];
	}
	return controls;
};

export default commonControls;
