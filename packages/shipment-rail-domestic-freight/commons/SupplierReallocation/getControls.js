import { isEmpty } from '@cogoport/utils';

const SPLICE_FIRST_PARAMETER = 0;
const SPLICE_SECOND_PARAMETER = 1;
const SPLIT_SERVICE_TEXT = 2;

export default function getControls({
	primary_service = {},
	serviceObj = {},
	shipment_type,
	documents,
	isAdditional,
}) {
	const { service_provider, service_type } = serviceObj || {};

	const showAllControls = isEmpty(documents) && !isAdditional && `${shipment_type}_service` === service_type;
	const serviceType = serviceObj?.service_type.split('_', SPLIT_SERVICE_TEXT).join('_');
	const shipmentType = shipment_type.split('_', SPLIT_SERVICE_TEXT).join('_');
	let services = [];

	if (primary_service?.service_type !== service_type) {
		services = [shipmentType, serviceType];
	}
	if (['trailer_freight_service', 'haulage_freight_service', 'ftl_freight_service']
		.includes(serviceObj?.service_type)) {
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
					service      : Array.isArray(services)
						? services : serviceType,
					status: 'active',
				},
			},
			size  : 'sm',
			rules : { required: 'Service Provider is required' },
		},
	];

	const showControls = showAllControls ? controls : controls.splice(SPLICE_FIRST_PARAMETER, SPLICE_SECOND_PARAMETER);

	return {
		controls      : showControls,
		defaultValues : {
			service_provider_id: service_provider?.id,
		},
		showAllControls,
	};
}
