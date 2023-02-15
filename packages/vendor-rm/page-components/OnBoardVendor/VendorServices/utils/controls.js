const controls = [
	{
		name          : 'office_details',
		label         : 'Office Details',
		type          : 'fieldArray',
		buttonText    : 'Add',
		// noDeleteButtonTill : 1,
		showLabelOnce : true,
		controls      : [
			{
				name        : 'category',
				label       : 'Select Category',
				type        : 'select',
				placeholder : 'Select a Category',
				options     : [
					{
						label : 'category1',
						value : 'category1',
					},
					{
						label : 'category2',
						value : 'category2',
					},
				],
				rules: { required: 'Category is required' },
			},
			{
				name        : 'sub_category',
				label       : 'Select Sub-category',
				type        : 'select',
				placeholder : 'Select a sub-category',
				options     : [
					{
						label : 'sub category',
						value : 'sub_category',
					},
				],
				rules: { required: 'Sub-category is required' },
			},
			{
				name        : 'cogoport_office',
				label       : 'Select Cogoport Office',
				type        : 'multiSelect',
				placeholder : 'Select Location',
				options     : [
					{
						label : 'mumbai',
						value : 'mumbai',
					},
					{
						label : 'Noida',
						value : 'noida',
					},
				],
				rules: { required: 'Office Location is required' },
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
