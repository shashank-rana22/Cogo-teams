const controls = () => [
	{
		type       : 'fieldArray',
		name       : 'instruction_items',
		subType    : 'edit_items',
		showHeader : true,
		buttonText : 'Add',
		rules      : { required: { value: true, message: 'Atleast one is required' } },
		controls   : [
			{
				type        : 'textarea',
				name        : 'instruction',
				span        : 12,
				errorName   : 'Instruction',
				placeholder : 'Start typing to add SOP..',
				className   : 'primary sm',
				rows        : 2,
				resize      : true,
			},
			{
				type            : 'file',
				name            : 'file',
				multiple        : true,
				onlyURLOnChange : true,
				uploadIcon      : 'upload-attach',
				placeholder     : '',
				uploadText      : 'Attach',

			},
		],
	},
];

export default controls;
