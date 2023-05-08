const MAPPING = [
	{
		key      : 'overview',
		title    : 'Overview',
		children : [],
	},
	{
		key      : 'plan_course',
		title    : 'Plan Course',
		children : [
			{
				key   : 'specifications',
				title : 'Specifications',
			},
			{
				key   : 'intended_learners',
				title : 'Intended Learners',
			},
		],
	},
	{
		key      : 'create_content',
		title    : 'Create Content',
		children : [
			{
				key   : 'course_curriculum',
				title : 'Course Curriculum',
			},
			{
				key   : 'course_completion',
				title : 'Course Completion',
			},
		],
	},
	{
		key      : 'publish_course',
		title    : 'Publish Course',
		children : [],
	},
];

export default MAPPING;
