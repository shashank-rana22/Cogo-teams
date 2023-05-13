const controls = [
	{
		label   : 'Select Audiences who can access this course',
		name    : 'audiences',
		type    : 'multiSelect',
		options : [],
		rules   : { required: { value: true, message: 'This is required' } },
	},
	{
		label   : 'Select Audiences for whom this course is mandatory',
		name    : 'mandatory_audiences',
		type    : 'multiSelect',
		options : [],
		rules   : { required: { value: true, message: 'This is required' } },
	},
	{
		label   : 'Select Users within Mandatory Audience',
		name    : 'mandatory_audiences_user',
		type    : 'radioGroup',
		options : [
			{
				value : 'all',
				label : 'All',
			},
			{
				value : 'custom',
				label : 'Custom Select Users',
			},
		],
		rules: { required: { value: true, message: 'This is required' } },
	},
	{
		label: `You may Upload you own Excel in required
         format OR Download the list of Users, Edit and Upload that excel`,
		name          : 'upload_excel',
		type          : 'fileUpload',
		multiple      : false,
		draggable     : true,
		dropareaProps : { heading: 'Upload excel', subHeading: '(only .xlsx or .csv formats)' },
		rules         : { required: { value: true, message: 'This is required' } },
		accept        : '.csv,.xlsx',
	},
	{
		label       : 'How frequently do you want the users to take this course?',
		name        : 'frequent',
		type        : 'select',
		placeholder : 'select',
		options     : [
			{
				value : 'monthly',
				label : 'Monthly',
			},
			{
				value : 'bi monthly',
				label : 'Bi Monthly',
			},
			{
				value : 'every quarter',
				label : 'Every Quarter',
			},
			{
				value : 'annually',
				label : 'Annually',
			},
		],
	},
];

export default controls;
