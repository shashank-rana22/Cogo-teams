import { isEmpty } from '@cogoport/utils';

const controls = (serviceData, shipment_data, isAdditional) => {
	const fields = [
		{
			name           : 'service_provider_id',
			label          : 'Service provider',
			type           : 'select',
			optionsListKey : 'organizations',
			value:
				serviceData?.[0]?.service_provider_id
				|| serviceData?.[0]?.service_provider?.id,
			params: {
				filters: {
					account_type : 'service_provider',
					kyc_status   : 'verified',
					service:
						serviceData?.[0]?.service_type === 'rail_domestic_freight_service'
							? serviceData?.[0]?.service_type?.split('_', 3)?.join('_')
							: serviceData?.[0]?.service_type?.split('_', 2)?.join('_'),
				},
			},
			caret       : true,
			span        : 8,
			placeholder : 'Select Service Provider',
			rules       : { required: 'Service Provider is required' },
		},
	];

	if (
		serviceData?.[0]?.service_type === 'fcl_freight_service'
		&& isEmpty(shipment_data?.documents)
		&& !isAdditional
	) {
		fields.push(
			{
				name        : 'bls_count',
				label       : 'BL Count',
				type        : 'number',
				value       : serviceData?.[0]?.bls_count,
				span        : 8,
				placeholder : 'Enter Bl Count',
				rules       : { required: 'Bl Count is required', min: 1 },
			},
			{
				name    : 'bl_category',
				label   : 'BL Category',
				type    : 'select',
				options : [
					{ label: 'Mbl', value: 'mbl' },
					{ label: 'Hbl', value: 'hbl' },
				],
				value       : serviceData?.[0]?.bl_category,
				span        : 8,
				placeholder : 'Enter Bl Category',
				rules       : { required: 'Bl Category is required' },
			},
		);
	}

	return fields;
};

export default controls;
