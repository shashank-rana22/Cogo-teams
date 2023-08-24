const controls = [
	{
		name           : 'roles',
		label          : 'ROLES',
		placeholder    : 'Select Role',
		type           : 'asyncSelect',
		isClearable    : true,
		initialCall    : true,
		asyncKey       : 'list_employee_roles',
		defaultOptions : true,
		multiple       : true,
	},
	{
		name           : 'department',
		label          : 'DEPARTMENT',
		placeholder    : 'Select Department',
		type           : 'asyncSelect',
		isClearable    : true,
		initialCall    : true,
		asyncKey       : 'list_employee_departments',
		defaultOptions : true,
		multiple       : true,
	},
	{
		name           : 'joining_date',
		label          : 'Joining Date',
		type           : 'date-picker',
		showTimeSelect : true,
	},
];

export default controls;
