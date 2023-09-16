const controls = [
	{
		name        : 'service_name',
		label       : 'Service Name',
		type        : 'select',
		placeholder : 'Please select service',
		options     : [
			{
				label : 'FCL Freight',
				value : 'fcl_freight',
			},
			{
				label : 'FCL Freight Local',
				value : 'fcl_freight_local',
			},
		],
		span  : 6,
		rules : { required: 'Service Name is required' },
	},
	{
		name  : 'comment',
		label : 'Comments',
		type  : 'textarea',
		span  : 6,

		placeholder: 'Write your comments here...',
	},

	{
		name            : 'file_url',
		type            : 'file',
		showProgress    : true,
		onlyURLOnChange : true,
		themeType       : 'secondary',
		drag            : true,
		height          : 70,
		uploadIcon      : 'ic-upload',
		uploadType      : 'aws',
		label           : 'Please upload rate sheet',
		accept          : '.csv',
		rules           : { required: 'Rate Sheet is required' },
	},
];
export default controls;
