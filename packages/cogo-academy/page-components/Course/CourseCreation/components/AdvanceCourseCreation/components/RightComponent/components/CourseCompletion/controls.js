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
				options     : [],
				rules       : { required: { value: true, message: 'This is required' } },
			},
			{
				label       : 'Reward on Course Completion',
				name        : 'course_reward',
				type        : 'select',
				placeholder : 'Select Reward',
				options     : [],
				rules       : { required: { value: true, message: 'This is required' } },
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
				type        : 'select',
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
				name        : 'course_period',
				type        : 'select',
				placeholder : 'Select period of',
				options     : [],
				rules       : { required: { value: true, message: 'This is required' } },
			},
			{
				label       : '',
				name        : 'course_select',
				type        : 'select',
				placeholder : 'Select',
				options     : [],
				rules       : { required: { value: true, message: 'This is required' } },
			},
		],
	},
];
