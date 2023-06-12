import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

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
				value   : GLOBAL_CONSTANTS.regex_patterns.email,
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
		options     : GLOBAL_CONSTANTS.options.role_options,
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
				value   : GLOBAL_CONSTANTS.regex_patterns.email,
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
