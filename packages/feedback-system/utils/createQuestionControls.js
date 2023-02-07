export const controls = [
	{
		name        : 'question',
		label       : 'Question',
		placeholder : 'Add questions',
		type        : 'text',
		span        : 5,
		style       : { marginLeft: '1px', marginRight: '1px' },
		rules       : { required: 'Please write the question...' },
	},
	{
		name        : 'remark',
		label       : 'Remarks',
		placeholder : 'Add remarks',
		type        : 'text',
		style       : { marginLeft: '1px', marginRight: '1px' },
		span        : 5,
		rules       : { required: false },
	},
	{
		name  : 'weight',
		label : 'Weightage',
		type  : 'number',
		style : { marginLeft: '1px', marginRight: '1px' },
		span  : 2,
		rules : { required: 'Please Mention the Weightage', maximum: 100, minimum: 1 },
	},
];
