const getLocalControls = (service_type, shipment_data) => {
	const controlMapping = {
		lcl_freight_service: [
			{
				name  : 'service_provider_id',
				type  : 'select',
				label : 'Service Provider (Lcl Local)',
				value : (shipment_data?.all_services || []).find(
					(serviceObj) => serviceObj?.service_type.includes('lcl_freight_local'),
				)?.service_provider_id,
				optionsListKey : 'verified-service-providers',
				placeholder    : 'Select Service Provider',
				rules          : { required: 'Service Provider is Required' },
			},
		],
	};

	return controlMapping[service_type] || [];
};

export default getLocalControls;
