export const getControls = (assigned_stakeholder) => [
	{
		label: 'Choose Stakeholder',
		name: 'assigned_stakeholder',
		type: 'radio',
		value: assigned_stakeholder,
		className: 'primary md',
		span: 5,
		options: [
			{ label: 'OKAM', value: 'booking_agent' },
			{ label: 'SO1', value: 'service_ops1' },
			{ label: 'SO2', value: 'service_ops2' },
		],
		rules: { required: 'Required' },
	},
];
