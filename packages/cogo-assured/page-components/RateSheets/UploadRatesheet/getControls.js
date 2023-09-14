const getControls = [
	{
		name        : 'service_name',
		label       : 'Service Name',
		type        : 'select',
		className   : 'primary lg',
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
		name        : 'comment',
		label       : 'Comments',
		type        : 'textarea',
		span        : 6,
		className   : 'primary lg',
		placeholder : 'Write your comments here...',
	},

	{
		name            : 'file_url',
		type            : 'file',
		className       : 'primary lg',
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
export default getControls;
