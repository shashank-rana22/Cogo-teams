import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const REMOVAL_ELEMENT_COUNT = 1;
const SERVICE_TYPE_PARTITION_INDEX = 3;

export default function getControls({
	serviceObj = {},
	shipment_type,
	documents,
	isAdditional,
}) {
	const { service_provider, service_type } = serviceObj || {};

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
					service      : (service_type || '').split('_', SERVICE_TYPE_PARTITION_INDEX).join('_'),
					status       : 'active',
				},
			},
			size  : 'sm',
			rules : { required: 'Service Provider is required' },
		},
	];

	const showControls = showAllControls ? controls : controls.splice(
		GLOBAL_CONSTANTS.zeroth_index,
		REMOVAL_ELEMENT_COUNT,
	);

	return {
		controls      : showControls,
		defaultValues : {
			service_provider_id: service_provider?.id,
		},
		showAllControls,
	};
}
