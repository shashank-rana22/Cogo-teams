const commonControls = ({ service }) => {
	const controls = [
		{
			name        : 'service_provider_id',
			label       : 'Service Provider',
			span        : 4,
			type        : 'select',
			placeholder : 'Select',

		},
		{
			label          : 'Rate Provided by user',
			name           : 'sourced_by_id',
			placeholder    : 'Select',
			type           : 'select',
			isClearable    : true,
			defaultOptions : false,
			span           : 4,
		},
	];
	const lineControls = {
		label       : ['fcl_freight', 'haulage_freight'].includes(service) ? 'Shipping Line' : 'Air Line',
		name        : ['fcl_freight', 'haulage_freight'].includes(service) ? 'shipping_line_id' : 'airline_id',
		placeholder : 'Select',
		type        : 'select',
		isClearable : true,
		span        : 4,
	};
	if (['fcl_freight', 'haulage_freight', 'air_freight'].includes(service)) {
		return [...controls, lineControls];
	}
	return controls;
};

export default commonControls;
