const controls = [
	{
		name       : 'office_details',
		label      : 'Office Details',
		type       : 'fieldArray',
		buttonText : 'Add',
		controls   : [
			{
				name        : 'category',
				label       : 'Select Category',
				type        : 'select',
				placeholder : 'Select a Category',
				span        : '30%',
				rules       : { required: 'Category is required' },
			},
			{
				name        : 'sub_category',
				label       : 'Select Sub-category',
				type        : 'select',
				placeholder : 'Select a sub-category',
				span        : '30%',
				rules       : { required: 'Sub-category is required' },
			},
			{
				name        : 'cogoport-office',
				label       : 'Select Cogoport Office',
				type        : 'select',
				placeholder : 'Select Location',
				span        : '30%',
				rules       : { required: 'Office Location is required' },
			},
		],
	},

];

export default controls;
