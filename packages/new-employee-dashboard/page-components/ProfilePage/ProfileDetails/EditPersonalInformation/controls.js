import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const HONORIFICS_OPTIONS = [
	{
		label : 'Mr.',
		value : 'Mr.',
	},
	{
		label : 'Mrs.',
		value : 'Mrs.',
	},
	{
		label : 'Ms.',
		value : 'Ms.',
	},
	{
		label : 'Dr.',
		value : 'Dr.',
	},
];

const RELATION_TYPE_OPTIONS = [
	{
		label : 'Father',
		value : 'Father',
	},
	{
		label : 'Mother',
		value : 'Mother',
	},
	{
		label : 'Husband',
		value : 'Husband',
	},
];

const controls = () => [
	{
		name        : 'name_title',
		label       : 'Honorifics*',
		type        : 'select',
		options     : HONORIFICS_OPTIONS,
		placeholder : 'Honorifics',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'name',
		label       : 'Name*',
		type        : 'input',
		placeholder : 'First Name',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'relation_type',
		label       : 'Relation with you*',
		type        : 'select',
		placeholder : 'Relation',
		options     : RELATION_TYPE_OPTIONS,
		rules       : { required: 'This is required' },
	},
	{
		name        : 'relation_person_name',
		label       : 'Name of relative*',
		type        : 'input',
		placeholder : 'Full Name',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'gender',
		label       : 'Gender*',
		type        : 'select',
		placeholder : 'Select Gender',
		rules       : { required: 'This is required' },
		options     : [
			{ label: 'Male', value: 'male' },
			{ label: 'Female', value: 'female' },
		],
	},
	{
		name        : 'employee_code',
		label       : 'Employee Code',
		type        : 'input',
		placeholder : 'Employee Code',
	},
	{
		name        : 'designation',
		label       : 'Employee Designation*',
		type        : 'input',
		placeholder : 'Employee Designation',
		rules       : { required: 'This is required' },
	},
	{
		name                  : 'date_of_birth',
		label                 : 'Date of Birth*',
		type                  : 'SingleDateRange',
		placeholder           : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'].toUpperCase(),
		isPreviousDaysAllowed : true,
		rules                 : { required: 'This is required' },
	},
	{
		name                  : 'date_of_joining',
		label                 : 'Date of Joining*',
		type                  : 'SingleDateRange',
		placeholder           : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'].toUpperCase(),
		isPreviousDaysAllowed : true,
		rules                 : { required: 'This is required' },
	},
	{
		name        : 'mobile_number',
		label       : 'Phone Number*',
		type        : 'mobile-number-select',
		placeholder : 'Mobile',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'personal_email',
		label       : 'Personal Email Id*',
		type        : 'email',
		placeholder : 'Email',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'emergency_contact_details',
		label       : 'Relative contact number*',
		type        : 'mobile-number-select',
		placeholder : 'Number',
		rules       : { required: 'This is required' },
	},
	{
		name    : 'passport_size_photo_url',
		label   : 'Passport Size Photograph*',
		type    : 'fileUpload',
		accept  : '.png,.jpg,.jpeg,',
		maxSize : GLOBAL_CONSTANTS.options.upload_file_size['5MB'],
		rules   : { required: 'This is required' },
	},
	{
		name        : 'cogoport_email',
		label       : 'Cogoport Email',
		type        : 'email',
		placeholder : 'Cogoport Email Id',
	},
	{
		name        : 'hiring_manager',
		label       : 'Hiring Manager',
		type        : 'input',
		placeholder : 'Hiring Manager Name',
	},
];

export default controls;
