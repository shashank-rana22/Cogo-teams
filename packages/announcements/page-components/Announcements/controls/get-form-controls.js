const getFormControls = () => [
	{
		name  : 'title',
		label : 'Title',
		type  : 'text',
		style : {
			flexBasis: '48%',
		},
		placeholder: "Tell us what you're thinking?",
		// rules       : { required: 'Required' },
	},
	{
		name        : 'post_type',
		label       : 'Post Type',
		type        : 'select',
		themeType   : 'secondary',
		placeholder : 'Type of Post',
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
		// rules       : { required: 'Required' },
	},
	{
		name  : 'description',
		label : 'Description',
		type  : 'textarea',
		size  : 'sm',
		style : {
			minHeight : 128,
			flexBasis : '48%',
		},
		placeholder: 'Description about the post',
		// rules       : { required: 'Required' },
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
		// rules       : { required: 'Required' },
	},
	{
		name   : 'files',
		label  : 'Upload Files',
		type   : 'upload',
		accept : '.csv .pdf',
		style  : {
			flexBasis: '48%',
		},
		// rules       : { required: 'Required' },
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
		// rules       : { required: 'Required' },
	},

	{
		type           : 'multi-select',
		optionsListKey : 'audiences',
		isClearable    : true,
		label          : 'Select Audience',
		style          : {
			flexBasis: '48%',
		},
		name   : 'audience_id',
		// labelKey : 'name',
		// valueKey : 'id',
		// defaultOptions : true,
		params : {
			filters: {
				status: 'active',
			},
		},
		placeholder: 'Select Audience',
		// value       : formvalue?.partner_id || '',
		// rules       : { required: 'Required' },
	},
	{
		name  : 'redirection_url',
		label : 'Redirection URL',
		type  : 'text',
		style : {
			flexBasis: '48%',
		},
		placeholder: 'Enter Redirection URL',
		// rules       : { required: 'Required' },
	},
	{
		name            : 'validity',
		label           : 'Validity',
		type            : 'datepicker',
		dateFormat      : 'yyyy-MM-dd hh:mm aaa',
		use12hourformat : true,
		style           : {
			flexBasis: '48%',
		},
		// placeholder: 'Enter Date',
		// rules       : { required: 'Required' },
	},
	{
		name        : 'duration',
		label       : 'Hot Duration',
		type        : 'select',
		themeType   : 'secondary',
		placeholder : 'Hot Time Duration',
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
		// rules       : { required: 'Required' },
	},
	{
		name  : 'is_important',
		label : 'Is It Important?',
		type  : 'checkbox',
		style : {
			flexBasis: '48%',
		},
		// placeholder: 'Enter Date',
		// rules       : { required: 'Required' },
	},
];

export default getFormControls;
