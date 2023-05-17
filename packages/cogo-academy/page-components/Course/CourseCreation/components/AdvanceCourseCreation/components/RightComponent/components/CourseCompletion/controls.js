export const controls = [
	{
		label       : 'Course Description Text',
		name        : 'course_description',
		type        : 'textarea',
		rows        : 4,
		placeholder : 'Type Description you want the user to see on before beginning the course',
		rules       : { required: { value: true, message: 'This is required' } },
	},
	{
		label       : '',
		name        : 'group_select',
		type        : 'groupSelect',
		subControls : [
			{
				label       : 'Course Completion Criteria',
				name        : 'course_criteria',
				type        : 'select',
				placeholder : 'Select Criteria',
				options     : [
					{
						value : 'test',
						label : 'Test',
					},
					{
						value : 'timed_test',
						label : 'Timed test',
					},
					{
						value : 'code_something',
						label : 'code something',
					},
					{
						value : 'scenario_based_things',
						label : 'scenario based things',
					},
					{
						value : 'assignment_upload',
						label : 'Assignment upload',
					},
					{
						value : 'only_course_content',
						label : 'only course content (pdf, doc, test within modules)',
					},
				],
				rules: { required: { value: true, message: 'This is required' } },
			},
			{
				label       : 'Reward on Course Completion',
				name        : 'course_reward',
				type        : 'select',
				placeholder : 'Select Reward',
				options     : [
					{
						value : 'certification',
						label : 'Certification',
					},
					{
						value : 'specialisation',
						label : 'Specialisation',
					},
					{
						value : 'nothing',
						label : 'Nothing',
					},
					{
						value : 'badge',
						label : 'Badge',
					},
				],
				rules: { required: { value: true, message: 'This is required' } },
			},
		],
	},
];

export const certificateControls = [
	{
		label       : '',
		name        : 'group_select',
		type        : 'groupSelect',
		subControls : [
			{
				label       : 'Certification Name',
				name        : 'course_certificate_name',
				type        : 'text',
				placeholder : 'Type Certification Name',
				options     : [],
				rules       : { required: { value: true, message: 'This is required' } },
			},
			{
				label       : 'Signing Authority',
				name        : 'course_signing_authority',
				type        : 'select',
				placeholder : 'Select Authority from list',
				options     : [],
				rules       : { required: { value: true, message: 'This is required' } },
			},
		],
	},
	{
		label         : 'Upload Authority Signature',
		name          : 'upload_signature',
		type          : 'fileUpload',
		placeholder   : 'Select Category',
		multiple      : false,
		draggable     : true,
		dropareaProps : { heading: 'Upload Authority Signature', subHeading: '11kb' },
		rules         : { required: { value: true, message: 'This is required' } },
	},
];

export const selectControls = [
	{
		label       : 'Time permitted to complete Course, in order to get Reward',
		name        : 'group_select_1',
		type        : 'groupSelect',
		subControls : [
			{
				label       : '',
				name        : 'course_completion_unit',
				type        : 'select',
				placeholder : 'Select period of',
				options     : [{
					value : 'week',
					label : 'Week',
				}, {
					value : 'month',
					label : 'Month',
				}],
				rules: { required: { value: true, message: 'This is required' } },
			},
			{
				label       : '',
				name        : 'course_completion_value',
				type        : 'select',
				placeholder : 'Select',
				options     : [...Array(12).keys()].map((value) => ({ label: value + 1, value: value + 1 })),
				rules       : { required: { value: true, message: 'This is required' } },
			},
		],
	},
];
