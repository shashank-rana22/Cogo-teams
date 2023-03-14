export const controls = (shipment_type) => {
	const heading = shipment_type === 'haulage_freight' ? 'Trailer' : 'Truck';
	const truckControls = [
		{
			name: 'display_origin_location',
			span: 6,
			type: 'text',
			label: 'Origin Location',
			disabled: true,
		},
		{
			name: 'display_destination_location',
			span: 6,
			type: 'text',
			label: 'Destination Location',
			disabled: true,
		},
		{
			name: 'display_booking_weight',
			span: 4,
			type: 'text',
			label: 'Booking Weight(kg)',
			disabled: true,
		},
		{
			name: 'display_booked_trucks',
			span: 4,
			type: 'text',
			label: 'Booked Trucks',
			disabled: true,
		},
		{
			name: 'truck_details',
			type: 'fieldArray',
			heading: `${heading} Details`,

			value: [
				{
					id: '',
					name: '',
					contact: '',
					payment_terms: '',
					estimated_arrival: '',
					estimated_departure: '',
				},
			],
			controls: [
				{
					name: 'id',
					show: false,
					type: 'text',
				},
				{
					name: 'truck_type',
					span: 4,
					type: 'text',
					label: `${heading} Type`,
					disabled: true,
				},
				{
					name: 'payment_terms',
					span: 4,
					type: 'text',
					label: 'SP Payment Terms',
					rules: {
						required: {
							value: true,
							message: 'This is required',
						},
					},
				},
				{
					name: 'truck_number',
					span: 4,
					type: 'text',
					label: `${heading} Number`,
					rules: {
						required: {
							value: true,
							message: 'This is required',
						},
					},
				},
				{
					name: 'name',
					span: 4,
					type: 'text',
					label: `${heading} Driver Name`,
					rules: {
						required: {
							value: true,
							message: 'This is required',
						},
					},
				},
				{
					name: 'contact',
					span: 4,
					type: 'text',
					label: `${heading} Driver Contact`,
					rules: {
						required: {
							value: true,
							message: 'This is required',
						},
					},
				},
				{
					name: 'estimated_arrival',
					span: 4,
					type: 'datepicker',
					label: `ETA ${heading}`,
					rules: {
						required: {
							value: true,
							message: 'This is required',
						},
					},
					placeholder: 'Select',
				},
				{
					name: 'estimated_departure',
					span: 4,
					type: 'datepicker',
					label: `ETD ${heading}`,
					rules: {
						required: {
							value: true,
							message: 'This is required',
						},
					},
					placeholder: 'Select',
				},
				{
					name: 'service_provider_id',
					type: 'select',
					label: 'Service Provider',
					rules: {
						required: {
							value: true,
							message: 'Service Provider is required',
						},
					},
					multiple: false,
					placeholder: 'Select Service Provider',
					optionsListKey: 'verified-service-providers',
				},
			],
			showButtons: false,
			showDeleteButton: false,
		},
	];

	return truckControls;
};
