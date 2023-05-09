const controls = [
	{
		label       : '',
		name        : 'group_select_1',
		type        : 'groupSelect',
		subControls : [
			{
				label   : 'Confirm Course Title*',
				name    : 'course_title',
				type    : 'select',
				options : [],
			},
			{
				label   : 'Confirm Course Category*',
				name    : 'course_category',
				type    : 'select',
				options : [],
			},
		],
	},
	{
		label       : 'Add Course Subtitle*',
		subLabel    : 'This could be a brief description of the Course Title',
		name        : 'course_subtitle',
		placeholder : 'Type Subtitle',
		type        : 'text',
	},
	{
		label       : 'Course Description Text',
		name        : 'course_description',
		type        : 'textarea',
		rows        : 4,
		placeholder : 'Type Description you want the user to see on before beginning the course',
	},
	{
		label         : 'Upload Course Landing Image*',
		name          : 'upload_excel',
		type          : 'fileUpload',
		multiple      : false,
		draggable     : true,
		dropareaProps : { heading: 'Upload Image', subHeading: 'Only Jpeg, Jpg files (max lim?)' },
	},
];

export default controls;
