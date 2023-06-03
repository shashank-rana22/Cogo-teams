export const EditTruckNumberControls = [
	{
		name        : 'service_data',
		type        : 'fieldArray',
		showButtons : true,
		label       : 'Choose Package Information',
		buttonText  : 'Add',
		value       : [
			{
				service_id   : '',
				truck_number : '',
			},
		],

		noDeleteButtonTill : 1,
		controls           : [
			{
				name        : 'service_id',
				type        : 'select',
				label       : 'Truck Number',
				placeholder : 'Select Truck Number',
				className   : 'primary lg',
				lowerlabel  : 'Select Truck Number',
				options     : [],
				span        : 5,
				rules       : { required: 'This is required' },
			},

			{
				name           : 'truck_number',
				type           : 'creatable-select',
				optionsListKey : 'organization-truck-numbers',
				label          : 'Enter Truck Number',
				placeholder    : 'Create or Select Truck Number',
				lowerlabel     : 'Create or Select Truck Number',
				className      : 'primary lg',
				span           : 5,
				rules          : { required: 'This is required' },
			},
		],
	},
];

export const EditETAControls = [
	{
		name               : 'service_data',
		type               : 'fieldArray',
		label              : 'Choose Package Information',
		showButtons        : false,
		showDeleteButton   : false,
		value              : [{ truck_number: '' }],
		noDeleteButtonTill : 1,
		controls           : [
			{
				name         : 'truck_number',
				label        : 'Truck Number',
				type         : 'text',
				span         : 4,
				disabled     : true,
				value        : 5,
				showOptional : false,
				className    : 'primary',
			},
			{
				name         : 'estimated_departure',
				label        : 'ETD',
				type         : 'datepicker',
				span         : 4,
				rules        : { required: 'This is required' },
				showOptional : false,
				className    : 'primary lg',
			},
			{
				name         : 'estimated_arrival',
				label        : 'ETA',
				type         : 'datepicker',
				span         : 4,
				className    : 'primary lg',
				rules        : { required: 'This is required' },
				showOptional : false,
			},
		],
	},
];

export const EditDriverControls = [
	{
		name               : 'service_data',
		type               : 'fieldArray',
		label              : 'Update Driver Information',
		showButtons        : false,
		showDeleteButton   : false,
		value              : [{ truck_number: '' }],
		noDeleteButtonTill : 1,
		controls           : [
			{
				name      : 'truck_number',
				label     : 'Truck Number',
				type      : 'text',
				span      : 4,
				disabled  : true,
				value     : 5,
				rules     : { required: true },
				className : 'primary',
			},
			{
				name        : 'driver_name',
				type        : 'text',
				label       : 'Driver Name',
				placeholder : 'Enter',
				className   : 'primary',
				span        : 4,
				rules       : { required: 'Driver Name is required' },
			},
			{
				name        : 'contact_number',
				type        : 'text',
				label       : 'Contact Number',
				placeholder : 'Enter',
				className   : 'primary',
				span        : 4,
				rules       : { required: 'Contact Number is required' },
			},
		],
	},
];
