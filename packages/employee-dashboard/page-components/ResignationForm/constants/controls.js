const controls = [

	{
		name        : 'Full_name',
		label       : 'Full_name',
		type        : 'select',
		showAstrick : true,
		options     : [
			{
				value : 'Shivam Singh',
				label : 'Shivam Singh',
			},
			{
				value : 'Mukti Shetty',
				label : 'Mukti Shetty',
			},
		],
		rules: { required: 'This is required' },

	},
	{
		name        : 'COGO_ID',
		label       : 'COGO_ID',
		type        : 'select',
		showAstrick : true,
		options     : [
			{
				value : 'COGO2000',
				label : 'COGO2000',
			},
			{
				value : 'COGO2001',
				label : 'COGO2001',
			},
		],
		rules: { required: 'This is required' },

	},
	{
		name         : 'Select_Department ',
		label        : 'Select_Department ',
		type         : 'select',
		FshowAstrick : true,
		options      : [
			{
				value : 'Product',
				label : 'Product',
			},
			{
				value : 'Developer',
				label : 'Developer',
			},
		],
		rules: { required: 'This is required' },

	},
	{
		name        : 'Select_Designation ',
		label       : 'Select_Designation ',
		type        : 'select',
		showAstrick : true,
		options     : [
			{
				value : 'HR',
				label : 'HR',
			},
			{
				value : 'Owner',
				label : 'Owner',
			},
		],
		rules: { required: 'This is required' },

	},
	{
		name        : 'Select_Reporting_Manager',
		label       : 'Select_Reporting_Manager',
		type        : 'select',
		showAstrick : true,
		options     : [
			{
				value : 'Shivam_Singh',
				label : 'Shivam Singh',
			},
			{
				value : 'Vikram_Singh',
				label : 'Vikram Singh',
			},
		],
		rules: { required: 'This is required' },

	},
	{
		name        : 'Select_Chapter',
		label       : 'Select_Chapter',
		type        : 'select',
		showAstrick : true,
		options     : [
			{
				value : 'Chapter1',
				label : 'Chapter1',
			},
			{
				value : 'Chapter2',
				label : 'Chapter2',
			},
		],
		rules: { required: 'This is required' },

	},
	{
		name        : 'Select_HRBP',
		label       : 'Select_HRBP',
		type        : 'select',
		showAstrick : true,
		options     : [
			{
				value : 'Mukti Shetty',
				label : 'Mukti Shetty',
			},
			{
				value : 'Archana Singh',
				label : 'Archana Singh',
			},
		],
		rules: { required: 'This is required' },

	},
	{
		name        : 'Select_Reporting_Location',
		label       : 'Select_Reporting_Location',
		type        : 'select',
		showAstrick : true,
		options     : [
			{
				value : 'Mumbai',
				label : 'Mumbai',
			},
			{
				value : 'Delhi',
				label : 'Delhi',
			},
		],
		rules: { required: 'This is required' },

	},
	{
		name        : 'Enter_Reason_of_Leaving',
		label       : 'Enter_Reason_of_Leaving',
		type        : 'textarea',
		showAstrick : true,
		rules       : { required: 'This is required' },
	},
];

export default controls;
