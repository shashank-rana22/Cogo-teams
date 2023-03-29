const getFormControls = () => [
	{
		name        : 'title',
		label       : 'Title',
		type        : 'text',
		placeholder : "Tell us what you're thinking?",
		rules       : { required: 'Required' },
	},
	{
		name        : 'announcement_type',
		label       : 'Announcement Type',
		type        : 'select',
		themeType   : 'secondary',
		placeholder : 'Type of Announcement',
		options     : [
			{
				label : 'Announcement',
				value : 'announcement',
			},
			{
				label : 'General',
				value : 'general',
			},
			{
				label : 'Product Release / Update',
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

	},
	{
		name          : 'videos',
		label         : 'Input Video URL',
		type          : 'field-array',
		showLabelOnce : true,
		controls      : [
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
	},
	{
		name       : 'images',
		label      : 'Upload Images',
		type       : 'upload',
		uploadType : 'aws',
		accept     : '.png, .jpeg',
	},
	{
		name           : 'audience_ids',
		type           : 'multiselect',
		optionsListKey : 'audiences',
		isClearable    : true,
		label          : 'Select Audience',
		params         : {
			filters: {
				status: 'active',
			},
		},
		placeholder : 'Select Audience',
		rules       : { required: 'Required' },
	},
	{
		name        : 'redirection_url',
		label       : 'Redirection URL',
		type        : 'text',
		placeholder : 'Enter Redirection URL',
	},
	{
		name            : 'validity',
		label           : 'Validity',
		type            : 'daterangepicker',
		dateFormat      : 'dd MMM yyyy hh:mm a',
		use12hourformat : true,
		rules           : { required: 'Required' },
	},
	{
		name  : 'is_important',
		label : 'Is It Important?',
		type  : 'checkbox',
	},
	{
		name        : 'hot_duration',
		label       : 'Hot Duration',
		type        : 'select',
		themeType   : 'secondary',
		placeholder : 'Select Hot Time Duration',
		options     : [
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
	},
];

export default getFormControls;
