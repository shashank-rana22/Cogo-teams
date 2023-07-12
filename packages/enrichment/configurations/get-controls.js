const getUserControls = ({
	activeTab = '',
	taxLabel = '',
	taxPattern = '',
	country_id,
	region_id,
}) => {
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
				name     : 'country',
				label    : 'Country',
				labelKey : 'display_name',
				type     : 'asyncSelect',
				valueKey : 'name',
				asyncKey : 'list_locations',
				params   : {
					filters: { type: ['country'] },
				},
				placeholder : 'Select Country',
				rules       : { required: { value: true, message: 'Country is required' } },
			},
			{
				name        : 'state',
				label       : 'State',
				labelKey    : 'display_name',
				valueKey    : 'name',
				placeholder : 'Select State...',
				type        : 'asyncSelect',
				params      : { filters: { type: ['region'], country_id } },
				asyncKey    : 'list_locations',
				isClearable : true,
				rules       : {
					required: false,
				},
			},

			{
				name        : 'city',
				label       : 'City',
				type        : 'asyncSelect',
				labelKey    : 'display_name',
				valueKey    : 'name',
				asyncKey    : 'list_locations',
				placeholder : 'Select City',
				params      : {
					filters: {
						type: ['city'], country_id, region_id,
					},
				},
				multiple    : false,
				isClearable : true,
				rules       : {
					required: 'City is required',
				},
			},

			{
				type        : 'asyncSelect',
				name        : 'pincode',
				label       : 'Pincode',
				labelKey    : 'postal_code',
				valueKey    : 'postal_code',
				asyncKey    : 'list_locations',
				initialCall : false,
				placeholder : 'Select Pincode',
				params      : { filters: { type: ['pincode'], country_id, region_id } },
				rules       : {
					required: { value: true, message: 'Pincode is required' },
				},
				show: true,
			},

			{
				name        : 'tax_number',
				label       : taxLabel,
				type        : 'text',
				placeholder : `Enter ${taxLabel}`,
				isClearable : true,
				rules       : {
					pattern: {
						value   : taxPattern,
						message : `Please enter a valid ${taxLabel}`,
					},
				},
			},

		],
	};

	return controls[activeTab];
};

export default getUserControls;
