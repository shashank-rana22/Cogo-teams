const getLocalControls = (service_type, formattedRate, shipment_data) => {
	const formattedValue = formattedRate?.[formattedRate?.primary_service?.id];
	const exportValue	= (shipment_data?.all_services || [])
		.find((serviceObj) => serviceObj?.service_type.includes('air_freight_local_service')
		&& serviceObj?.trade_type === 'export');

	const importValue	= (shipment_data?.all_services || [])
		.find((serviceObj) => serviceObj?.service_type.includes('air_freight_local_service')
		&& serviceObj?.trade_type === 'import');

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
				value         : formattedValue?.airline_id || exportValue?.airline_id,
				subType       : 'select',
				label         : 'Please select airline (Air Local Origin)',
				placeholder   : 'Search airline...',
				commodityType : 'air_freight',
				rules         : { required: 'Air Line Details is Required' },
			},
			{
				name        : 'origin_service_provider_id',
				type        : 'async-select',
				asyncKey	   : 'organizations',
				span        : 5,
				label       : 'Service Provider (Air Local Origin)',
				value       : formattedValue?.service_provider_id || exportValue?.service_provider_id,
				placeholder : 'Select Service Provider',
				params      : {
					filters: {
						account_type : 'service_provider',
						status       : 'active',
						kyc_status   : 'verified',
					},
				},
				rules: { required: 'Service Provider is Required' },
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
				value         : formattedValue?.airline_id || importValue?.airline_id,
				subType       : 'select',
				label         : 'Please select airline (Air Local Destination)',
				placeholder   : 'Search airline...',
				commodityType : 'air_freight',
				rules         : { required: 'Air Line Details is Required' },
			},
			{
				name        : 'destination_service_provider_id',
				type        : 'async-select',
				asyncKey    : 'organizations',
				span        : 5,
				label       : 'Service Provider (Air Local Destination)',
				value       : formattedValue?.service_provider_id || importValue?.service_provider_id,
				placeholder : 'Select Service Provider',
				params      : {
					filters: {
						account_type : 'service_provider',
						status       : 'active',
						kyc_status   : 'verified',
					},
				},
				rules: { required: 'Service Provider is Required' },
			},
		],
	};

	return controlMapping[service_type] || [];
};

export default getLocalControls;
