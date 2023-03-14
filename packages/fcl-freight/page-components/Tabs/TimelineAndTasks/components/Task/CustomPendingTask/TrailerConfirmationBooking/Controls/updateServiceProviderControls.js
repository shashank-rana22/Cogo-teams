export const controls = [
	{
		name: 'trailer_detail',
		type: 'fieldArray',
		value: [
			{
				trailer_number: '',
				driver_name: '',
				contact_number: '',
				estimated_departure: '',
				estimated_arrival: '',
			},
		],
		showButtons: true,
		showDeleteButton: true,
		heading: null,
		isSectionRequired: false,
		controls: [
			{
				name: 'trailer_number',
				label: 'Trailer Number',
				type: 'text',
				span: 2,
				rules: {
					required: {
						message: 'This is required',
						value: true,
					},
				},
			},
			{
				name: 'driver_name',
				label: 'Driver Name',
				type: 'text',
				span: 2,
				rules: {
					required: {
						message: 'This is required',
						value: true,
					},
				},
			},
			{
				name: 'contact_number',
				label: 'Contact Number',
				type: 'text',
				span: 2,
				rules: {
					required: {
						message: 'This is required',
						value: true,
					},
				},
			},
			{
				name: 'estimated_departure',
				label: 'ETD',
				type: 'datepicker',
				span: 2,
				rules: {
					required: {
						message: 'This is required',
						value: true,
					},
				},
			},
			{
				name: 'estimated_arrival',
				label: 'ETA',
				type: 'datepicker',
				span: 2,
				rules: {
					required: {
						message: 'This is required',
						value: true,
					},
				},
			},
		],
	},
];
