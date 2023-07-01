import { isEmpty } from '@cogoport/utils';

export default function getControls({
	serviceObj = {},
	shipment_type,
	documents,
	isAdditional,

}) {
	const { service_provider, service_type, bls_count, bl_category } = serviceObj || {};

	const showAllControls = isEmpty(documents) && !isAdditional && `${shipment_type}_service` === service_type;

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
					service      : (service_type || '').split('_', 2).join('_'),
				},
			},
			size  : 'sm',
			rules : { required: 'Service Provider is required' },
		},

	];

	const showControls = showAllControls ? controls : controls.splice(0, 1);

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
