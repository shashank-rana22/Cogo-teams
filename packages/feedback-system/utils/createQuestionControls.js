export const controls = [
	{
		name        : 'question',
		label       : 'Question',
		placeholder : 'Add questions',
		type        : 'text',
		span        : 8,
		style       : { marginLeft: '1px', marginRight: '1px' },
		rules       : { required: 'Please write the question...' },
	},
	{
		name  : 'weight',
		label : 'Weightage',
		type  : 'number',
		style : { marginLeft: '1px', marginRight: '1px' },
		span  : 2,
		rules : { required: 'Please Mention the Weightage', maximum: 100, minimum: 1 },
	},
	{
		name        : 'remark',
		label       : 'Remarks',
		placeholder : 'Add remarks',
		type        : 'text',
		style       : { marginLeft: '1px', marginRight: '1px' },
		span        : 10,
		rules       : { required: 'Please provide the remark...' },
	},
];
