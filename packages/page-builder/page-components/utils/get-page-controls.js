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
		options     : [
			{ label: 'Harper Lee', value: 'To Kill a Mockingbird' },
			{ label: 'Lev Tolstoy', value: 'War and Peace' },
			{ label: 'Fyodor Dostoyevsy', value: 'The Idiot' },
			{ label: 'Oscar Wilde', value: 'A Picture of Dorian Gray' },
			{ label: 'George Orwell', value: '1984' },
			{ label: 'Jane Austen', value: 'Pride and Prejudice' },
			{ label: 'Marcus Aurelius', value: 'Meditations' },
		],
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
		options     : [
			{ label: 'Harper Lee', value: 'To Kill a Mockingbird' },
			{ label: 'Lev Tolstoy', value: 'War and Peace' },
			{ label: 'Fyodor Dostoyevsy', value: 'The Idiot' },
			{ label: 'Oscar Wilde', value: 'A Picture of Dorian Gray' },
			{ label: 'George Orwell', value: '1984' },
			{ label: 'Jane Austen', value: 'Pride and Prejudice' },
			{ label: 'Marcus Aurelius', value: 'Meditations' },
		],
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
