import { isEmpty } from '@cogoport/utils';

const SPLICE_FIRST_PARAMETER = 0;
const SPLICE_SECOND_PARAMETER = 1;
const SPLIT_SECOND_PARAMETER = 2;

export default function getControls({
	primary_service = {},
	serviceObj = {},
	shipment_type,
	documents,
	isAdditional,

}) {
	const { service_provider, service_type, bls_count, bl_category } = serviceObj || {};

	const showAllControls = isEmpty(documents) && !isAdditional && `${shipment_type}_service` === service_type;
	const serviceType = serviceObj?.service_type.split('_', SPLIT_SECOND_PARAMETER).join('_');
	const shipmentType = shipment_type.split('_', SPLIT_SECOND_PARAMETER).join('_');
	let services = [];

	if (primary_service?.service_type !== service_type) {
		services = [shipmentType, serviceType];
	}
	if (serviceObj?.service_type === 'trailer_freight_service') {
		services = [shipmentType, serviceType, 'haulage_freight'];
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
					service      : services.length !== SPLIT_SECOND_PARAMETER
						? serviceType : services,
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
			...(showAllControls && {
				bls_count,
				bl_category,
			}),
		},
		showAllControls,
	};
}
