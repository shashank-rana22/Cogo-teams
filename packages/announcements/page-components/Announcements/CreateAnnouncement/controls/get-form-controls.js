const getFormControls = () => [
	{
		name  : 'title',
		label : 'Title',
		type  : 'text',
		style : {
			flexBasis: '48%',
		},
		placeholder : "Tell us what you're thinking?",
		rules       : { required: 'Required' },
	},
	{
		name        : 'announcement_type',
		label       : 'Announcement Type',
		type        : 'select',
		themeType   : 'secondary',
		placeholder : 'Type of Announcement',
		style       : {
			flexBasis: '48%',
		},
		options: [
			{
				label : 'Announcement',
				value : 'announcement',
			},
			{
				label : 'General',
				value : 'general',
			},
			{
				label : 'Product Update',
				value : 'product_update',
			},
			{
				label : 'Tasks',
				value : 'tasks',
			},
		],
		rules: { required: 'Required' },
	},
	{
		name  : 'content',
		label : 'Description',
		type  : 'textarea',
		size  : 'sm',
		style : {
			minHeight : 128,
			flexBasis : '48%',
		},
		placeholder: 'Description about the post',
	},
	{
		name  : 'videos',
		label : 'Input Video URL',
		type  : 'field-array',
		style : {
			flexBasis: '48%',
		},
		controls: [
			{
				name  : 'video_item',
				label : 'Input Video URL',
				type  : 'text',
			},
		],
	},
	{
		name       : 'files',
		label      : 'Upload Files',
		type       : 'upload',
		uploadType : 'aws',
		accept     : '.pdf',
		style      : {
			flexBasis: '48%',
		},
	},
	{
		name  : 'images',
		label : 'Upload Images',
		type  : 'upload',
		style : {
			flexBasis: '48%',
		},
		uploadType : 'aws',
		accept     : '.png, .jpeg',
	},
	{
		name  : 'redirection_url',
		label : 'Redirection URL',
		type  : 'text',
		style : {
			flexBasis: '48%',
		},
		placeholder: 'Enter Redirection URL',
	},
	{
		type           : 'multi-select',
		optionsListKey : 'audiences',
		isClearable    : true,
		label          : 'Select Audience',
		style          : {
			flexBasis: '48%',
		},
		name   : 'audience_ids',
		params : {
			filters: {
				status: 'active',
			},
		},
		placeholder : 'Select Audience',
		rules       : { required: 'Required' },
	},
	{
		name            : 'validity',
		label           : 'Validity',
		type            : 'datepicker',
		dateFormat      : 'dd MMM yyyy hh:mm a',
		use12hourformat : true,
		style           : {
			flexBasis: '48%',
		},
		rules: { required: 'Required' },
	},
	{
		name        : 'hot_duration',
		label       : 'Hot Duration',
		type        : 'select',
		themeType   : 'secondary',
		placeholder : 'Select Hot Time Duration',
		style       : {
			flexBasis: '48%',
		},
		options: [
			{
				label : '1 Day',
				value : 1,
			},
			{
				label : '3 Days',
				value : 3,
			},
			{
				label : '7 Days',
				value : 7,
			},
		],
		rules: { required: 'Required' },
	},
	{
		name  : 'is_important',
		label : 'Is It Important?',
		type  : 'checkbox',
		style : {
			flexBasis: '48%',
		},
	},
];

export default getFormControls;
