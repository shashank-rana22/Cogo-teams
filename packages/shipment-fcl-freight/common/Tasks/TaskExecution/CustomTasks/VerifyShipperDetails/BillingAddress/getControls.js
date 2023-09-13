function getControls({ countryValidation, setCountryId = () => {} }) {
	const controls = [
		{
			name        : 'business_name',
			label       : 'Company Name',
			type        : 'text',
			size        : 'sm',
			placeholder : 'Enter Company Name',
			styles      : { flex: '1 1 30%' },
			rules       : {
				required: 'Company name is required',
			},
		},
		{
			name              : 'pincode',
			label             : 'Pincode / Zip Code',
			type              : 'asyncSelect',
			size              : 'sm',
			asyncKey          : 'list_locations',
			valueKey          : 'postal_code',
			initialCall       : true,
			getSelectedOption : (val) => setCountryId(val?.country_id),
			styles            : { flex: '1 1 30%' },
			rules             : {
				required: 'Pincode is Required',
			},
		},
		{
			name   : 'tax_number',
			label  : countryValidation?.others?.registration_number?.label || 'GST',
			type   : 'text',
			size   : 'sm',
			styles : { flex: '1 1 30%' },
			rules  : {
				pattern: {
					value   : countryValidation?.regex?.TAX,
					message : 'Tax Number is Invalid',
				},
			},
		},
		{
			name        : 'address',
			label       : 'Address',
			rows        : 3,
			type        : 'textarea',
			placeholder : 'Enter Address',
			styles      : { flex: '1 1 58.5%' },
			rules       : {
				required: 'Address is required',
			},
		},
		{
			name   : 'is_sez',
			label  : 'Is your Address SEZ ?',
			type   : 'chips',
			styles : { flex: '1 1 25%' },
			rules  : {
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
			name   : 'tax_number_document_url',
			label  : 'Proof',
			type   : 'fileUpload',
			styles : { flex: '1 1 100%' },
		},
		{
			name        : 'name',
			label       : 'POC Name',
			size        : 'sm',
			type        : 'creatableSelect',
			placeholder : 'Enter your POC name',
			styles      : { flex: '1 1 30%' },
		},
		{
			name  : 'mobile_number',
			label : 'Mobile Number',
			size  : 'sm',
			type  : 'mobileNumber',
			rules : {
				pattern: {
					value   : countryValidation?.regex?.MOBILE_NUMBER,
					message : 'Mobile Number is Invalid',
				},
			},
			styles: { flex: '1 1 30%' },
		},
		{
			name   : 'email',
			label  : 'Email',
			type   : 'text',
			size   : 'sm',
			styles : { flex: '1 1 30%' },
			rules  : {
				required : 'Email is required',
				pattern  : {
					value   : countryValidation?.regex?.EMAIL,
					message : 'Enter Valid Email Address',
				},
			},
		},
	];

	return { controls };
}

export default getControls;
