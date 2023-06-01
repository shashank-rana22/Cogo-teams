const controls = [
	{
		label       : 'Chapter Name',
		name        : 'name',
		elementType : 'text',
		placeholder : 'Type name...',
		rules       : { required: { value: true, message: 'This is required' } },
	},
	{
		label       : 'Chapter Description',
		name        : 'description',
		elementType : 'textarea',
		placeholder : 'Add a description. Include what a student may be able to do after completing the sub module',
		rows        : 4,
	},
	{
		label       : 'Select Main Content Type',
		name        : 'content_type',
		elementType : 'radioGroup',
		value       : 'document',
		options     : [
			{
				value : 'document',
				label : 'Document',
			},
			{
				value : 'video',
				label : 'Video',
			},
			{
				value : 'presentation',
				label : 'Presentation',
			},
			{
				value : 'text',
				label : 'Text',
			},
			// {
			// 	value : 'jupyter_notebook',
			// 	label : 'Jupyter Notebook',
			// },
		],
		rules: { required: { value: true, message: 'This is required' } },
	},
	{
		name          : 'upload_presentation',
		elementType   : 'fileUpload',
		draggable     : true,
		dropareaProps : { heading: 'Upload Presentation', subHeading: '(only .pptx or .pdf formats)' },
		accept        : '.pptx',
		rules         : { required: { value: true, message: 'This is required' } },
	},
	{
		name          : 'upload_document',
		elementType   : 'fileUpload',
		draggable     : true,
		dropareaProps : { heading: 'Upload Document', subHeading: '(only .pptx or .pdf formats)' },
		accept        : '.pdf,.doc,.docx',
		rules         : { required: { value: true, message: 'This is required' } },
	},
	{
		name        : 'upload_video',
		elementType : 'text',
		placeholder : 'video link ...',
		rules       : { required: { value: true, message: 'This is required' } },
	},
	{
		label       : 'Additional Resources',
		name        : 'additional_resources',
		elementType : 'toggle',
		offLabel    : 'Downloadable resource',
		onLabel     : 'External Link',
		value       : false,
	},
	{
		name          : 'upload_file',
		elementType   : 'fileUpload',
		multiple      : false,
		draggable     : true,
		dropareaProps : { heading: 'Upload Now', subHeading: '(only .xlsx or .csv formats)' },
	},
	{
		label       : 'Title',
		name        : 'additional_resources_title',
		elementType : 'text',
		placeholder : 'Type a descriptive Title',
	},
	{
		label       : 'Add Link',
		name        : 'additional_resources_link',
		elementType : 'text',
		placeholder : 'www.example.com',
	},
	{
		label       : 'Time permitted to complete Course, in order to get Reward',
		name        : 'group_select_1',
		elementType : 'groupSelect',
		subControls : [
			{
				label       : '',
				name        : 'completion_duration_unit',
				elementType : 'select',
				placeholder : 'Select period of',
				disabled    : true,
				options     : [{
					value : 'minutes',
					label : 'Minutes',
				}],
				value : 'minutes',
				rules : { required: { value: true, message: 'This is required' } },
			},
			{
				label       : '',
				name        : 'completion_duration_value',
				elementType : 'number',
				type        : 'number',
				placeholder : 'Select',
				rules       : { required: { value: true, message: 'This is required' } },
			},
		],
	},
];

export default controls;
