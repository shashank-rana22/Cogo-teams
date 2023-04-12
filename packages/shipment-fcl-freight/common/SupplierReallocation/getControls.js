import { isEmpty } from '@cogoport/utils';

export default function getControls({ serviceObj, documents, isAdditional }) {
	const showAllControls = isEmpty(documents) && !isAdditional;

	const { service_provider, service_type, bls_count, bl_category } = serviceObj || {};

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
			rules: { required: 'Service Provider is required' },
		},
		{
			name        : 'bls_count',
			label       : 'BL Count',
			type        : 'number',
			placeholder : 'Enter BL Count',
			rules       : { required: 'BL Count required' },
		},
		{
			name    : 'bl_category',
			label   : 'BL Category',
			type    : 'select',
			options : [
				{ label: 'Mbl', value: 'mbl' },
				{ label: 'Hbl', value: 'hbl' },
			],
			placeholder : 'Enter Bl Category',
			rules       : { required: 'BL Category is required' },
		},
	];

	return {
		controls      : showAllControls ? controls : controls.splice(0, 1),
		defaultValues : {
			service_provider_id: service_provider?.id,
			bls_count,
			bl_category,
		},
	};
}
