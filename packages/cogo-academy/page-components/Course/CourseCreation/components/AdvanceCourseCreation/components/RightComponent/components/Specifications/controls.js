const controls = [
	{
		label       : 'What will the students learn from the course?',
		name        : 'topics',
		type        : 'asyncSelect',
		isClearable : true,
		multiple    : true,
		asyncKey    : 'faq_topics',
		initialCall : true,
		options     : [],
		rules       : { required: { value: true, message: 'This is required' } },
	},
	{
		label       : 'Which tags give a semblance of the Course content?',
		name        : 'tags',
		type        : 'asyncSelect',
		isClearable : true,
		multiple    : true,
		asyncKey    : 'faq_tags',
		initialCall : true,
		options     : [],
		rules       : { required: { value: true, message: 'This is required' } },
	},
	{
		label      : 'What will the students learn from the course?',
		name       : 'students_learn_field_array',
		type       : 'fieldArray',
		buttonText : 'Add More',
		value      : {
			students_learn: '',
		},
		controls: [
			{
				label       : '',
				name        : 'students_learn',
				placeholder : 'Example: Will learn about the benefits of using xyz and how to apply it in xyz',
				type        : 'text',
			},
		],
	},
];

export default controls;
