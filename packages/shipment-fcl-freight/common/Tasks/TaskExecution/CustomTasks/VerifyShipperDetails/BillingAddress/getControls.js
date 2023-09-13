function getControls({ countryValidation }) {
	const controls = [
		{
			name        : 'business_name',
			type        : 'input',
			size        : 'sm',
			placeholder : 'Enter Company Name',
			rules       : {
				required: 'Company name is required',
			},
		},
		{
			name        : 'pincode',
			type        : 'async_select',
			size        : 'sm',
			asyncKey    : 'list_locations',
			valueKey    : 'postal_code',
			initialCall : true,
			rules       : {
				required: 'Pincode is Required',
			},
		},
		{
			name  : 'tax_number',
			type  : 'input',
			size  : 'sm',
			rules : {
				pattern: {
					value   : countryValidation?.regex?.TAX,
					message : 'Tax Number is Invalid',
				},
			},
		},
		{
			name        : 'address',
			rows        : 3,
			type        : 'textarea',
			placeholder : 'Enter Address',
			rules       : {
				required: 'Address is required',
			},
		},
		{
			name  : 'is_sez',
			label : 'Reason for contact ? ',
			type  : 'chips',
			rules : {
				required: 'Required',
			},
			options: [
				{
					label : 'Yes',
					value : 'yes',
				},
				{
					label : 'No',
					value : 'no',
				},
			],
		},
		{
			name : 'tax_document',
			type : 'upload',
		},
	];

	return { controls };
}

export default getControls;
