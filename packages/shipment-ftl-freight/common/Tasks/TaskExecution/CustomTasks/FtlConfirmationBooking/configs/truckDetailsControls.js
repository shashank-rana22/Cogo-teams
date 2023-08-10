export const truckDetailsControls = () => [{
	name             : 'truck_detail',
	type             : 'fieldArray',
	showButtons      : true,
	showDeleteButton : true,
	controls         : [
		{
			name  : 'truck_number',
			type  : 'text',
			label : 'Truck Number',
			span  : 3,
			rules : { required: 'Truck Number is required' },
		},
		{
			name  : 'driver_name',
			type  : 'text',
			label : 'Driver Name',
			span  : 3,
			rules : { reuired: 'Driver Name is required' },
		},
		{
			name  : 'contact_number',
			type  : 'text',
			label : 'Contact Number',
			span  : 2,
			rules : { required: 'Contact Number is required' },
		},
		{
			name  : 'estimated_departure',
			type  : 'datepicker',
			label : 'ETD',
			span  : 2,
			rules : { required: 'Estimated Departure is required' },
		},
		{
			name  : 'estimated_arrival',
			type  : 'datepicker',
			label : 'ETA',
			span  : 2,
			rules : { required: 'Estimated Arrival is required' },
		},
	],
}];
