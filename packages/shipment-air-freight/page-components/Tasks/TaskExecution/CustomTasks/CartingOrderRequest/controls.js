const controls = {
	dateControls: [
		{
			label                 : 'Select Date',
			name                  : 'vehicle_arrival_date',
			placeholder           : 'Select Date',
			type                  : 'datepicker',
			span                  : 4,
			value                 : '',
			isPreviousDaysAllowed : true,
			rules                 : {
				required: true,
			},
		},
		{
			label : 'Select Time',
			name  : 'vehicle_arrival_time',
			type  : 'timepicker',
			span  : 4,
			value : '',
			rules : {
				required: true,
			},
		},
	],
	vehicleControls: [
		{

		},
	],
};

export default controls;
