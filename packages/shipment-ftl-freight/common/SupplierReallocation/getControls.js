export default function getControls({
	primary_service = {},
	serviceObj = {},
}) {
	const { service_provider, service_type, shipment_type } = serviceObj || {};

	let services = service_type;

	if (primary_service?.service_type !== service_type) {
		services = [shipment_type, serviceObj?.service_type];
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
			...(controls),
		},
	};
}
