import { isEmpty } from '@cogoport/utils';

const controls = (serviceData, shipment_data, isAdditional) => {
	const fields = [
		{
			name        : 'service_provider_id',
			label       : 'Service provider',
			type        : 'select',
			span        : 8,
			placeholder : 'Select Service Provider',
			rules       : { required: 'Service Provider is required' },
		},
	];

	if (isEmpty(shipment_data?.documents) && !isAdditional) {
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
