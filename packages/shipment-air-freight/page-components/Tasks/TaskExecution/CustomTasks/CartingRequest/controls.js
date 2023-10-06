const controls = {
	dateControls: [
		{
			label                 : 'Select Date Time Slots',
			name                  : 'vehicle_arrival_date',
			placeholder           : 'Select Date',
			type                  : 'daterangepicker',
			isPreviousDaysAllowed : true,
			showTimeSelect        : true,
			span                  : 6,
			rules                 : {
				required: true,
			},
		},
	],
	vehicleControls: [
		{
			name               : 'vehicle_number_details',
			label              : 'Enter Vehicle Number',
			type               : 'fieldArray',
			showButtons        : true,
			showAddButton      : true,
			showDeleteButton   : true,
			noDeleteButtonTill : 1,
			value              : [],
			buttonText         : 'Add More Vehicles',
			controls           : [
				{
					label       : 'Please enter the vehicle number',
					name        : 'vehicle_number',
					type        : 'text',
					placeholder : 'Ex. DL-01-XXXX',
					span        : 4,
					rules       : {
						required: 'Vehicle Number is required',
					},
				},
			],
		},
	],
};

export default controls;
