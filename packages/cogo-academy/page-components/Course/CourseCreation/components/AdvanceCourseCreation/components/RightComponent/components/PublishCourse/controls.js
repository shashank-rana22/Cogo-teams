const controls = [
	{
		label       : '',
		name        : 'group_select_1',
		type        : 'groupSelect',
		subControls : [
			{
				label   : 'Confirm Course Title',
				name    : 'course_title',
				type    : 'text',
				options : [],
				rules   : { required: { value: true, message: 'This is required' } },
			},
			{
				label    : 'Confirm Course Categories',
				name     : 'course_categories',
				type     : 'asyncSelect',
				asyncKey : 'list_course_categories',
				multiple : true,
				options  : [],
				rules    : { required: { value: true, message: 'This is required' } },
			},
		],
	},
	{
		label       : 'Add Course Subtitle',
		subLabel    : 'This could be a brief description of the Course Title',
		name        : 'course_subtitle',
		placeholder : 'Type Subtitle',
		type        : 'text',
		rules       : { required: { value: true, message: 'This is required' } },
	},
	{
		label       : 'Course Description Text',
		name        : 'course_description',
		type        : 'textarea',
		rows        : 4,
		placeholder : 'Type Description you want the user to see on before beginning the course',
	},
	{
		label         : 'Upload Course Landing Image',
		name          : 'course_landing_img',
		type          : 'fileUpload',
		multiple      : false,
		draggable     : true,
		dropareaProps : { heading: 'Upload Image', subHeading: 'Only Jpeg, Jpg files (max lim?)' },
		accept        : '.jpeg,.jpg',
		rules         : { required: { value: true, message: 'This is required' } },
	},
];

export default controls;
