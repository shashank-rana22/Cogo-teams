const ROLE_OPIONS = [
	{ value: 'software_development_engineer_1', label: 'Software Development Engineer - I' },
	{ value: 'business_analyst', label: 'Business Analyst' },
	{ value: 'product_analyst', label: 'Product Analyst' },
	{ value: 'business_consultant', label: 'Business Consultant' },
];

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
		label       : 'Personal Email ID',
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
	},
	{
		name        : 'designation',
		type        : 'select',
		label       : 'Role',
		placeholder : 'Role',
		options     : ROLE_OPIONS,
		rules       : {
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
			pattern: {
				value   : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
				message : 'Email is invalid',
			},
		},
	},
	{
		name        : 'hiring_manager_id',
		type        : 'asyncSelect',
		asyncKey    : 'partner_users_ids',
		label       : 'Hiring Manager',
		placeholder : 'Hiring Manager',
		rules       : {
			required: 'Hiring Manager is required',
		},
		params: {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],

			},
			page_limit: 100,
		},
	},
	{
		name        : 'hr_id',
		type        : 'asyncSelect',
		asyncKey    : 'partner_users_ids',
		label       : 'HR Name',
		placeholder : 'Enter Name',
		rules       : {
			required: 'name is required',
		},
		params: {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],
			},
			page_limit: 100,
		},
	},
	{
		name        : 'hrbp_id',
		type        : 'asyncSelect',
		asyncKey    : 'partner_users_ids',
		label       : 'HRBP',
		placeholder : 'HRBP',
		rules       : {
			required: 'HRBP is required',
		},
		params: {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],

			},
			page_limit: 100,
		},
	},
];

export default controls;
