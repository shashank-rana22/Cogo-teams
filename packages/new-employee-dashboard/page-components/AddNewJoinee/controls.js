const controls = [
	{
		name        : 'name',
		type        : 'text',
		label       : 'Name',
		placeholder : 'Name of the employee',
		rules       : {
			required: 'name is required',
		},
	},

	{
		name        : 'email',
		label       : 'Employee Email ID',
		placeholder : 'Enter a valid email id',
		type        : 'text',
		rules       : {
			required: 'Email is required',
		},
	},

	{
		name        : 'mobile_number',
		label       : 'Contact Details',
		type        : 'mobileNumber',
		inputType   : 'number',
		placeholder : 'Mobile Number*',
		rules       : {
			required: 'Mobile Number is required',
		},
	},

	{
		name        : 'employee_id',
		type        : 'text',
		label       : 'Employee ID',
		placeholder : 'Employee Id',
		rules       : {
			required: 'Employee Code is required',
		},
	},

	{
		name        : 'role',
		type        : 'select',
		label       : 'Role',
		placeholder : 'Role',
		options     : [
			{ value: 'front_Developer', label: 'Front-end Developer' },
			{ value: 'backend_Developer', label: 'Back-end Developer' },
		],
		rules: {
			required: 'Role is required',
		},
	},

	{
		name                  : 'date_of_joining',
		label                 : 'Date of joining',
		type                  : 'SingleDateRange',
		dateFormat            : 'dd-MMM-yyyy',
		isPreviousDaysAllowed : true,
		isClearable           : true,
	},

	{
		name        : 'location',
		type        : 'select',
		label       : 'Location Details',
		placeholder : 'Select Location',
		options     : [
			{ value: 'mumbai', label: 'Mumbai' },
			{ value: 'delhi', label: 'Delhi' },
		],
		rules: {
			required: 'Location is required',
		},
	},

	{
		name        : 'reporting_manager',
		type        : 'select',
		label       : 'Reporting Manager',
		placeholder : 'Select Reporting Manager',
		options     : [
			{ value: 'khushal', label: 'Khushal' },
			{ value: 'shivam', label: 'Shivam' },
		],
		rules: {
			required: 'Reporting Manager is required',
		},
	},

	{
		name        : 'hr_name',
		type        : 'text',
		label       : 'HR Name',
		placeholder : 'Enter Name',
		rules       : {
			required: 'name is required',
		},
	},

	{
		name        : 'hr_email',
		label       : 'HR Email ID',
		placeholder : 'Enter email id',
		type        : 'text',
		rules       : {
			required: 'Email is required',
		},
	},

];

export default controls;
