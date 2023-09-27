const controls = {
	dateControls: [
		{
			label                 : 'Cargo Ready Date',
			name                  : 'cargo_ready_date',
			placeholder           : 'Select Cargo Ready Date',
			type                  : 'datepicker',
			span                  : 4,
			value                 : '',
			isPreviousDaysAllowed : true,
			rules                 : {
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
