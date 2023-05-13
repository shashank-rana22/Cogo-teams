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
		name       : 'course_objectives',
		type       : 'fieldArray',
		buttonText : 'Add More',
		value      : {
			objective: '',
		},
		rules    : { required: { value: true, message: 'This is required' } },
		controls : [
			{
				label       : '',
				name        : 'objective',
				placeholder : 'Example: Will learn about the benefits of using xyz and how to apply it in xyz',
				type        : 'text',
				rules       : { required: { value: true, message: 'This is required' } },
			},
		],
	},
];

export default controls;
