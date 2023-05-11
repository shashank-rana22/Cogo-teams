export const controls = [
	{
		label       : 'Course Description Text',
		name        : 'course_description',
		type        : 'textarea',
		rows        : 4,
		placeholder : 'Type Description you want the user to see on before beginning the course',
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
			},
			{
				label       : 'Reward on Course Completion',
				name        : 'course_reward',
				type        : 'select',
				placeholder : 'Select Reward',
				options     : [],
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
			},
			{
				label       : 'Signing Authority',
				name        : 'course_signing_authority',
				type        : 'select',
				placeholder : 'Select Authority from list',
				options     : [],
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
			},
			{
				label       : '',
				name        : 'course_select',
				type        : 'select',
				placeholder : 'Select',
				options     : [],
			},
		],
	},
];
