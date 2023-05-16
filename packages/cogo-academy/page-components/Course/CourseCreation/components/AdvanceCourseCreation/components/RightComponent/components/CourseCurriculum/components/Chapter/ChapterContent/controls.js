const controls = [
	{
		label       : 'Chapter Name',
		name        : 'name',
		type        : 'text',
		placeholder : 'Type name...',
		rules       : { required: { value: true, message: 'This is required' } },
	},
	{
		label       : 'Chapter Description',
		name        : 'description',
		type        : 'textarea',
		placeholder : 'Add a description. Include what a student may be able to do after completing the sub module',
		rows        : 4,
	},
	{
		label   : 'Select Main Content Type',
		name    : 'content_type',
		type    : 'radioGroup',
		options : [
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
			{
				value : 'jupyter_notebook',
				label : 'Jupyter Notebook',
			},
		],
		rules: { required: { value: true, message: 'This is required' } },
	},
	{
		name          : 'upload_presentation',
		type          : 'fileUpload',
		multiple      : true,
		draggable     : true,
		dropareaProps : { heading: 'Upload Presentation', subHeading: '(only .pptx or .pdf formats)' },
	},
	{
		label    : 'Additional Resources',
		name     : 'additional_resources',
		type     : 'toggle',
		offLabel : 'Downloadable resource',
		onLabel  : 'External Link',
		value    : false,
	},
	{
		name          : 'upload_file',
		type          : 'fileUpload',
		multiple      : false,
		draggable     : true,
		dropareaProps : { heading: 'No File Added. Upload Now', subHeading: '(only .xlsx or .csv formats)' },
	},
	{
		label       : 'Title',
		name        : 'additional_resources_title',
		type        : 'text',
		placeholder : 'Type a descriptive Title',
	},
	{
		label       : 'Add Link',
		name        : 'additional_resources_link',
		type        : 'text',
		placeholder : 'www.example.com',
	},
];

export default controls;
