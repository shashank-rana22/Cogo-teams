import CATEGORIES_OPTIONS from '../configurations/categories';

const controls = [
	{
		name        : 'page_name',
		label       : 'Page Name',
		placeholder : 'Type here...',
		type        : 'text',
		isClearable : true,
		rules       : {
			required: 'Page Name is required',
		},
	},
	{
		name        : 'page_url',
		label       : 'Page URL',
		placeholder : 'Type here...',
		type        : 'text',
		isClearable : true,
		rules       : {
			required: 'Page URL is required',
		},
	},
	{
		name        : 'page_description',
		label       : 'Page Description',
		placeholder : 'Type here...',
		type        : 'text',
		isClearable : true,
		rules       : {
			required: 'Page Description is required',
		},
	},
	{
		name        : 'category',
		label       : 'Category',
		placeholder : 'Select',
		style       : { flexBasis: '50%' },
		type        : 'creatableSelect',
		options     : CATEGORIES_OPTIONS,
		isClearable : true,
		rules       : {
			required: 'Category is required',
		},
	},
	{
		name        : 'tags',
		label       : 'Tags',
		placeholder : 'Select',
		type        : 'creatableMultiSelect',
		style       : { flexBasis: '50%' },
		options     : [],
		isClearable : true,
		rules       : {
			required: 'tags are required',
		},
	},
	{
		name        : 'validity_start',
		label       : 'Validity Start',
		// placeholder : 'Type here...',
		style       : { flexBasis: '50%' },
		type        : 'datePicker',
		isClearable : true,
		rules       : {
			required: 'start date is required',
		},

	},

	{
		name        : 'validity_end',
		label       : 'Validity End',
		// placeholder : 'Type here...',
		style       : { flexBasis: '50%' },
		type        : 'datePicker',
		isClearable : true,
		rules       : {
			required: 'end date is required',
		},

	},
];

export default controls;
