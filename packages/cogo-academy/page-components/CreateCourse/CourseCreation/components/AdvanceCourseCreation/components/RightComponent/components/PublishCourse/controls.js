const controls = [
	{
		label       : '',
		name        : 'group_select_1',
		type        : 'groupSelect',
		subControls : [
			{
				label : 'Confirm Course Title',
				name  : 'course_title',
				type  : 'text',
				rules : { required: { value: true, message: 'This is required' } },
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
		label       : '',
		name        : 'group_select_2',
		type        : 'groupSelect',
		subControls : [
			{
				label       : 'Select Instructor',
				name        : 'instructor_ids',
				type        : 'asyncSelect',
				placeholder : 'Select Instructor from list',
				asyncKey    : 'partner_users',
				multiple    : true,
				params      : {
					filters: {
						partner_entity_types : ['cogoport'],
						status               : 'active',
					},
					rm_mappings_data_required    : false,
					pagination_data_required     : false,
					partner_data_required        : false,
					add_service_objects_required : false,
				},
				rules: { required: { value: true, message: 'This is required' } },
			},
			{
				label   : 'Select difficulty level',
				name    : 'difficulty_level',
				type    : 'select',
				options : [{
					value : 'beginner',
					label : 'Beginner',
				}, {
					value : 'intermediate',
					label : 'Intermediate',
				}, {
					value : 'advanced',
					label : 'Advanced',
				}],
				rules: { required: { value: true, message: 'This is required' } },
			},
		],
	},
	{
		label       : 'Course Description Text',
		name        : 'description',
		type        : 'textarea',
		rows        : 4,
		placeholder : 'Type Description you want the user to see on before beginning the course',
	},
	{
		label         : 'Upload Course Landing Image',
		name          : 'thumbnail_url',
		type          : 'fileUpload',
		multiple      : false,
		draggable     : true,
		dropareaProps : { heading: 'Upload Image', subHeading: 'Only Jpeg, Jpg files (max lim?)' },
		accept        : '.jpeg,.jpg',
		rules         : { required: { value: true, message: 'This is required' } },
	},
];

export default controls;
