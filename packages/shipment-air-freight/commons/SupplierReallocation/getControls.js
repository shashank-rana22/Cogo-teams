const SPLIT_SECOND_PARAMETER = 2;

export default function getControls({
	primary_service_type = '',
	serviceObj = {},
	shipment_type,
}) {
	const { service_provider, service_type } = serviceObj || {};

	const serviceType = service_type.split('_', SPLIT_SECOND_PARAMETER).join('_');
	let services = primary_service_type !== service_type ? [shipment_type, serviceType] : serviceType;
	if (serviceObj?.service_type === 'trailer_freight_service') {
		services = [shipment_type, serviceType, 'haulage_freight'];
	}
	if (serviceObj?.service_type === 'trailer_freight_service'
	|| serviceObj?.service_type === 'haulage_freight_service'
	|| serviceObj?.service_type === 'ftl_freight_service') {
		services = ['ftl_freight', 'haulage_freight'];
	}

	const controls = [
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
					status       : 'active',
					service      : services,
				},
			},
			size  : 'sm',
			rules : { required: 'Service Provider is required' },
		},
	];

	return {
		controls,
		defaultValues: {
			service_provider_id: service_provider?.id,
		},
	};
}
