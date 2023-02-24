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
			name        : 'alternate_email',
			label       : 'Alternate Email',
			placeholder : 'Type here...',
			type        : 'text',
			isClearable : true,
			rules       : {
				required: 'Alternate Email is required',
			},

		},
		{
			name        : 'mobile_number',
			label       : 'Mobile Number',
			type        : 'mobileNumber',
			inputType   : 'number',
			placeholder : 'Mobile Number*',

			rules: { required: true },
		},

		{
			name        : 'alternate_mobile_number',
			label       : 'Alternate Mobile Number',
			type        : 'mobileNumber',
			inputType   : 'number',
			placeholder : 'Mobile Number*',

			rules: { required: true },
		},

		{
			name        : 'work_scopes',
			label       : 'Work Scope (designation)',
			placeholder : 'Select work scopes',
			type        : 'select',
			isClearable : true,
			options     : [
				{
					label: 'option 1', value: 'option_1',

				},
				{
					label: 'option 2', value: 'option_2',
				},
			],
			rules: {
				required: 'Specify reason',
			},

		},

		{
			name        : 'whatsapp_number',
			label       : 'Whatsapp Number',
			type        : 'mobileNumber',
			inputType   : 'number',
			placeholder : 'Mobile Number*',

			rules: { required: true },
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
			name        : 'gst_number',
			label       : 'GSTIN',
			type        : 'text',
			placeholder : 'Type here...',

			isClearable : true,
			rules       : { required: 'GST Number is required' },
		},

	],

};

const getUserControls = ({ type = '' }) => controls[type];

export default getUserControls;
