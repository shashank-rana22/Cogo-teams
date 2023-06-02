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
		name        : 'personal_email',
		label       : 'Employee Email ID',
		placeholder : 'Enter a valid email id',
		type        : 'text',
		rules       : {
			required : 'Email is required',
			pattern  : {
				value   : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
				message : 'Email is invalid',
			},
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
		name        : 'employee_code',
		type        : 'text',
		label       : 'Employee ID',
		placeholder : 'Employee Id',
		rules       : {
			required: 'Employee Code is required',
		},
	},
	{
		name        : 'designation',
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
		name        : 'office_location',
		type        : 'select',
		label       : 'Location Details',
		placeholder : 'Select Location',
		options     : [
			{ value: 'mumbai', label: 'Mumbai' },
			{ value: 'gurgaon', label: 'Gurgaon' },
		],
		rules: {
			required: 'Location is required',
		},
	},

	{
		name        : 'cogoport_email',
		label       : 'Cogoport Email ID',
		placeholder : 'Enter a valid email id',
		type        : 'text',
		rules       : {
			required : 'Email is required',
			pattern  : {
				value   : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
				message : 'Email is invalid',
			},
		},
	},

	{
		name        : 'hiring_manager',
		type        : 'text',
		label       : 'Hiring Manager',
		placeholder : 'Hiring Manager',
		rules       : {
			required: 'Reporting Manager is required',
		},
	},
	{
		name        : 'hiring_manager_email',
		type        : 'text',
		label       : 'Hiring Manager email',
		placeholder : 'Hiring manager email',
		rules       : {
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
			required : 'Email is required',
			pattern  : {
				value   : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
				message : 'Email is invalid',
			},
		},
	},
];

export default controls;
