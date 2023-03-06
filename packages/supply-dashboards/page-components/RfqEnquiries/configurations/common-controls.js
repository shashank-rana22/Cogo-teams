const commonControls = ({ service }) => {
	const controls = [
		{
			name        : 'service_provider_id',
			label       : 'Service Provider',
			span        : 4,
			type        : 'select',
			placeholder : 'Select',
			requirement : true,
			rules       : { required: 'This is required' },

		},
		{
			label       : 'Rate Provided by user',
			name        : 'sourced_by_id',
			placeholder : 'Select',
			type        : 'select',
			span        : 4,
			rules       : { required: 'This is required' },
		},
	];
	const lineControls = {
		label: ['fcl_freight', 'haulage_freight']
			.includes(service) ? 'Shipping Line' : 'Air Line',
		name: ['fcl_freight', 'haulage_freight']
			.includes(service) ? 'shipping_line_id' : 'airline_id',
		placeholder : 'Select',
		type        : 'select',
		span        : 4,
		rules       : { required: 'This is required' },
		requirement : service !== 'haulage_freight',
	};
	if (['fcl_freight', 'haulage_freight', 'air_freight'].includes(service)) {
		return [...controls, lineControls];
	}
	return controls;
};

export default commonControls;
