export const controls = [
	{
		className: 'primary sm',
		name: 'query_type',
		label: 'Issue Related to',
		placeholder: 'Select',
		type: 'select',
		span: 9,
		options: [
			{
				label: 'Inaccurate data',
				value: 'inaccurate_data',
			},
			{
				label: 'Shipment Rollover',
				value: 'shipment_rollover',
			},
			{
				label: 'Map View is not available',
				value: 'map_view_not_available',
			},
			{
				label: 'Other',
				value: 'other',
			},
		],
		rules: { required: 'Query type is required' },
	},
	{
		className: 'primary md',
		name: 'remarks',
		label: 'Remarks',
		placeholder: 'Please type here',
		type: 'textarea',
		span: 9,
		rules: { required: 'Remarks is required' },
	},
];

export const startTruckTrackerControl = [
	{
		className: 'primary md',
		name: 'mobile_number',
		label: 'Enter Mobile Number for Tracking',
		disabled: true,
		placeholder: 'Enter Mobile Number',
		type: 'number',
		span: 12,
		rules: { required: 'Driver Number is required' },
	},
];
