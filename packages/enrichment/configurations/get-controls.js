const getUserControls = ({ activeTab = '' }) => {
	const controls = {
		user: [
			{
				name        : 'name',
				label       : 'Point Of Contact (User Name)',
				placeholder : 'Type here...',
				type        : 'text',
				isClearable : true,
				rules       : {
					required: 'Point of contact is required',
				},
			},
			{
				name        : 'email',
				label       : 'Email',
				placeholder : 'Type here...',
				type        : 'text',
				isClearable : true,
				rules       : {
					required: 'Email is required',
				},
			},
			{
				name        : 'mobile_number',
				label       : 'Mobile Number',
				type        : 'mobileNumber',
				inputType   : 'number',
				placeholder : 'Mobile Number*',
			},
			{
				name        : 'alternate_mobile_number',
				label       : 'Alternate Mobile Number',
				type        : 'mobileNumber',
				inputType   : 'number',
				placeholder : 'Mobile Number*',
			},
			{
				name        : 'whatsapp_number',
				label       : 'Whatsapp Number',
				type        : 'mobileNumber',
				inputType   : 'number',
				placeholder : 'Mobile Number*',
			},
			{
				name        : 'work_scopes',
				label       : 'Work Scope (designation)',
				placeholder : 'Select work scopes',
				type        : 'multiSelect',
				isClearable : true,
				options     : [
					{
						label : 'Partner/Owner/Director',
						value : 'i_am_owner',
					},
					{
						label : 'Finance Head',
						value : 'i_am_finance_head',
					},
					{
						label : 'Finance Team Member',
						value : 'i_work_in_finance',
					},
					{
						label : 'Marketing/Sales',
						value : 'i_work_in_marketing_and_sales',
					},
					{
						label : 'Procurement',
						value : 'i_work_in_procurement',
					},
					{
						label : 'Operations',
						value : 'i_work_in_operations',
					},
					{
						label : 'Logistics Manager',
						value : 'i_am_logistics_manager',
					},
					{
						label : 'Other',
						value : 'other',
					},
				],
				rules: {
					required: 'Workscope is required',
				},
			},
		],
		address: [
			{
				name        : 'address',
				label       : 'Full Address',
				placeholder : 'Type here...',
				type        : 'text',
				isClearable : true,
				rules       : {
					required: 'Full Address is required',
				},
			},
			{
				name        : 'city',
				label       : 'City',
				placeholder : 'Type here...',
				type        : 'text',
				isClearable : true,
				rules       : {
					required: 'City is required',
				},
			},
			{
				name        : 'state',
				label       : 'State',
				placeholder : 'Type here...',
				type        : 'text',
				isClearable : true,
				rules       : {
					required: 'State is required',
				},
			},
			{
				name        : 'country',
				label       : 'Country',
				placeholder : 'Type here...',
				type        : 'text',
				isClearable : true,
				rules       : {
					required: 'Country is required',
				},
			},
			{
				name        : 'pincode',
				label       : 'Pincode',
				placeholder : 'Type here...',
				type        : 'text',
				isClearable : true,
				rules       : {
					required: 'PinCode is required',
				},
			},
			{
				name        : 'tax_number',
				label       : 'GSTIN',
				type        : 'text',
				placeholder : 'Type here...',
				isClearable : true,
				rules       : { required: 'GST Number is required' },
			},
		],
	};

	return controls[activeTab];
};

export default getUserControls;
