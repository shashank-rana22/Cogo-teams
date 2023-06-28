const getLocalControls = (service_type, shipment_data) => {
	const values = 	(shipment_data?.all_services || []).filter(
		(serviceObj) => serviceObj?.service_type.includes('air_freight_local_service'),
	);

	const export_values = values?.find(
		(serviceObj) => serviceObj?.trade_type === 'export',
	);

	const import_values = values?.find(
		(serviceObj) => serviceObj?.trade_type === 'import',
	);

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
				value         : export_values?.airline_id,
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
				value          : export_values?.service_provider_id,
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
				name          : 'destiantion_airline_id',
				value         : import_values?.airline_id,
				subType       : 'select',
				label         : 'Please select airline (Air Local Destination)',
				placeholder   : 'Search airline...',
				commodityType : 'air_freight',
				rules         : { required: 'Air Line Details is Required' },
			},
			{
				name           : 'destiantion_service_provider_id',
				type           : 'select',
				span           : 5,
				label          : 'Service Provider (Air Local Destination)',
				value          : import_values?.service_provider_id,
				optionsListKey : 'verified-service-providers',
				placeholder    : 'Select Service Provider',
				rules          : { required: 'Service Provider is Required' },
			},
		],
	};

	return controlMapping[service_type] || [];
};

export default getLocalControls;
