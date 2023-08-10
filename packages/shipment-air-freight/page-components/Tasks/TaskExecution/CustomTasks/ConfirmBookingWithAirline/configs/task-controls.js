const controls = [
	{
		name        : 'date_range',
		placeholder : 'Select Date',
		type        : 'datepicker',
		label       : 'Select Handover Date',
		span        : 4,
		minDate     : new Date(),
		className   : 'primary lg validity',
		rules       : {
			required: 'Handover Date is required.',
		},
	},
];

export default controls;
