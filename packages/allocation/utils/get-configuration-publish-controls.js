const controls = [
	{
		name        : 'start_date',
		label       : 'Start Date',
		type        : 'datePicker',
		placeholder : 'Select Start Date',
		rules       : {
			required: 'Start Date is Required',
		},
		isPreviousDaysAllowed: false,
	},
	{
		name        : 'end_date',
		label       : 'Expire Date',
		type        : 'datePicker',
		placeholder : 'Select Expire Date',
		rules       : {
			required: 'End Date is Required',
		},
	},
];

export default controls;
