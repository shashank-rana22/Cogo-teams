const getLocalControls = (service_type, formattedRate) => {
	const formattedValue = formattedRate?.[formattedRate?.primary_service?.id];

	const controlMapping = {
		air_freight_service: [
			{
				type     : 'async-select',
				asyncKey : 'list_operators',
				params   : {
					filters: { operator_type: 'airline', status: 'active' },
				},
				caret         : true,
				span          : 5,
				name          : 'origin_airline_id',
				value         : formattedValue?.airline_id,
				subType       : 'select',
				label         : 'Please select airline (Air Local Origin)',
				placeholder   : 'Search airline...',
				commodityType : 'air_freight',
				rules         : { required: 'Air Line Details is Required' },
			},
			{
				name           : 'origin_service_provider_id',
				type           : 'select',
				span           : 5,
				label          : 'Service Provider (Air Local Origin)',
				value          : formattedValue?.service_provider_id,
				optionsListKey : 'verified-service-providers',
				placeholder    : 'Select Service Provider',
				rules          : { required: 'Service Provider is Required' },
			},
			{
				type     : 'async-select',
				asyncKey : 'list_operators',
				params   : {
					filters: { operator_type: 'airline', status: 'active' },
				},
				caret         : true,
				span          : 5,
				name          : 'destination_airline_id',
				value         : formattedValue?.airline_id,
				subType       : 'select',
				label         : 'Please select airline (Air Local Destination)',
				placeholder   : 'Search airline...',
				commodityType : 'air_freight',
				rules         : { required: 'Air Line Details is Required' },
			},
			{
				name           : 'destination_service_provider_id',
				type           : 'select',
				span           : 5,
				label          : 'Service Provider (Air Local Destination)',
				value          : formattedValue?.service_provider_id,
				optionsListKey : 'verified-service-providers',
				placeholder    : 'Select Service Provider',
				rules          : { required: 'Service Provider is Required' },
			},
		],
	};

	return controlMapping[service_type] || [];
};

export default getLocalControls;
