const controls = [
	{
		name       : 'office_details',
		label      : 'Office Details',
		type       : 'fieldArray',
		buttonText : 'Add',
		// noDeleteButtonTill : 1,
		controls   : [
			{
				name        : 'category',
				label       : 'Select Category',
				type        : 'select',
				placeholder : 'Select a Category',
				rules       : { required: 'Category is required' },
			},
			{
				name        : 'sub_category',
				label       : 'Select Sub-category',
				type        : 'select',
				placeholder : 'Select a sub-category',
				rules       : { required: 'Sub-category is required' },
			},
			{
				name        : 'cogoport-office',
				label       : 'Select Cogoport Office',
				type        : 'select',
				placeholder : 'Select Location',
				rules       : { required: 'Office Location is required' },
			},
		],
	},
	{
		name        : 'additional_remark',
		label       : '',
		type        : 'text',
		placeholder : 'Enter additional Remarks...',
		span        : '100%',
		style       : { width: '100%', height: '80px', marginTop: '16px' },
	},

];

export default controls;
