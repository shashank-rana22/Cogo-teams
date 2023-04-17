const controls = [
	{
		name       : 'date',
		label      : 'Select Date',
		type       : 'datePicker',
		dateFormat : 'dd-MMMM-yyyy',
	},
	{
		name  : 'segment',
		label : 'Segment',
		type  : 'asyncSelect',
	},
	{
		name  : 'kam',
		label : 'KAM',
		type  : 'asyncSelect',
	},
	{
		name  : 'account',
		label : 'Account/Serial ID',
		type  : 'asyncSelect',
	},
];
export default controls;
