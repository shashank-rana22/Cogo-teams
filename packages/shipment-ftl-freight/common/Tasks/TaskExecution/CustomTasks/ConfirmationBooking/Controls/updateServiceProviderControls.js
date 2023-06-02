export const controls = (service_provider_id) => [
	{
		name  : 'truck_detail',
		type  : 'fieldArray',
		value : [
			{
				truck_number        : '',
				driver_name         : '',
				contact_number      : '',
				estimated_departure : '',
				estimated_arrival   : '',
			},
		],
		showButtons       : true,
		showDeleteButton  : true,
		heading           : null,
		isSectionRequired : false,
		controls          : [
			{
				name           : 'truck_number',
				label          : 'Truck Number',
				type           : 'creatable-select',
				optionsListKey : 'organization-truck-numbers',
				defaultOptions : true,
				placeholder    : 'Search or Create truck number',
				params         : {
					filters: {
						organization_id : service_provider_id,
						status          : 'active',
					},
				},
				span       : 2,
				lowerlabel : 'Search or Create Truck Number',
				rules      : {
					required: {
						message : 'Truck Number is required',
						value   : true,
					},
				},
			},
			{
				name  : 'driver_name',
				label : 'Driver Name',
				type  : 'text',
				span  : 2,
				rules : {
					required: {
						message : 'This is required',
						value   : true,
					},
				},
			},
			{
				name           : 'contact_number',
				label          : 'Contact Number',
				type           : 'creatable-select',
				optionsListKey : 'organization-pocs-contact',
				defaultOptions : true,
				placeholder    : 'Search or Create driver contact',
				params         : {
					filters: {
						organization_id : service_provider_id,
						poc_type        : 'truck_driver',
					},
				},
				lowerlabel : 'Search or Create Contact Number',
				span       : 2,
				rules      : {
					required: {
						message : 'Contact number is required',
						value   : true,
					},
				},
			},
			{
				name  : 'estimated_departure',
				label : 'ETD',
				type  : 'datepicker',
				span  : 2,
				rules : {
					required: {
						message : 'This is required',
						value   : true,
					},
				},
			},
			{
				name  : 'estimated_arrival',
				label : 'ETA',
				type  : 'datepicker',
				span  : 2,
				rules : {
					required: {
						message : 'This is required',
						value   : true,
					},
				},
			},
		],
	},
];
