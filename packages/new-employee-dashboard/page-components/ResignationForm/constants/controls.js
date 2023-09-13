const getControls = (values = {}) => [

	{
		name        : 'full_name',
		label       : 'Full_name',
		type        : 'input',
		showAstrick : true,
		value       : values.full_name,
		// rules       : { required: values.full_name ? false : 'This is required' },

	},
	{
		name        : 'cogo_id',
		label       : 'COGO_ID',
		type        : 'input',
		showAstrick : true,
		value       : values.cogo_id,
		// rules       : { required: values.cogo_id ? false : 'This is required' },

	},
	{
		name        : 'department',
		label       : 'Select_Department',
		type        : 'input',
		showAstrick : true,
		value       : values.department,
		// rules       : { required: values.department ? false : 'This is required' },

	},
	{
		name        : 'designation',
		label       : 'Select_Designation',
		type        : 'input',
		showAstrick : true,
		// rules       : { required: values.designation ? false : 'This is required' },
		value       : values.designation,
	},
	{
		name        : 'reporting_manager',
		label       : 'Select_Reporting_Manager',
		type        : 'input',
		showAstrick : true,
		// rules       : { required: values.reporting_manager ? false : 'This is required' },
		value       : values.reporting_manager,
	},
	{
		name        : 'chapter',
		label       : 'Select_Chapter',
		type        : 'input',
		showAstrick : true,
		// rules       : { required: values.chapter ? false : 'This is required' },
		value       : values.chapter,
	},
	{
		name        : 'hrbp',
		label       : 'Select_HRBP',
		type        : 'input',
		showAstrick : true,
		// rules       : { required: values.hrbp ? false : 'This is required' },
		value       : values.hrbp,
	},
	{
		name        : 'reporting_location',
		label       : 'Select_Reporting_Location',
		type        : 'input',
		showAstrick : true,
		// rules       : { required: values.reporting_location ? false : 'This is required' },
		value       : values.reporting_location,
	},
	{
		name        : 'reason_of_leaving',
		label       : 'Enter_Reason_of_Leaving',
		type        : 'textarea',
		showAstrick : true,
		rules       : { required: values.reason_of_leaving ? false : 'This is required' },
		value       : values.reason_of_leaving,
	},
];

export default getControls;
