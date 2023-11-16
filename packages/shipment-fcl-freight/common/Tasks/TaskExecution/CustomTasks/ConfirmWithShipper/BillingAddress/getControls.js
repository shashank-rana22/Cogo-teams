function getControls({ countryValidation = {}, setCountryId = () => {}, isSez = false }) {
	const controls = [
		{
			name        : 'business_name',
			label       : 'Company Name',
			type        : 'text',
			size        : 'sm',
			placeholder : 'Enter Company Name',
			styles      : { flexBasis: '30%' },
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
			styles            : { flexBasis: '30%' },
			rules             : {
				required: 'Pincode is Required',
			},
		},
		{
			name   : 'tax_number',
			label  : countryValidation?.others?.registration_number?.label || 'GST',
			type   : 'text',
			size   : 'sm',
			styles : { flexBasis: '30%' },
			rules  : {
				required : `${countryValidation?.others?.registration_number?.label || 'GST'} is required`,
				pattern  : {
					value   : countryValidation?.others?.registration_number?.pattern,
					message : `${countryValidation?.others?.registration_number?.label || 'GST'} is invalid`,
				},
			},
		},
		{
			name        : 'address',
			label       : 'Address',
			rows        : 3,
			type        : 'textarea',
			placeholder : 'Enter Address',
			styles      : { flexBasis: '60%' },
			rules       : {
				required: 'Address is required',
			},
		},
		{
			name    : 'is_sez',
			label   : 'Is your Address SEZ ?',
			type    : 'chips',
			styles  : { flexBasis: '10%' },
			options : [
				{
					label : 'Yes',
					value : 'yes',
				},
				{
					label : 'No',
					value : 'no',
				},
			],
			rules: {
				required: 'Required',
			},
		},
		{
			name   : 'sez_proof',
			label  : 'Sez Proof',
			type   : 'upload',
			styles : { flexBasis: '100%' },
			rules  : {
				required: 'Document is Required',
			},
			show: isSez,
		},
		{
			name   : 'tax_number_document_url',
			label  : 'Proof',
			type   : 'upload',
			styles : { flexBasis: '100%' },
			rules  : {
				required: 'Document is Required',
			},
		},
		{
			name        : 'name',
			label       : 'POC Name',
			size        : 'sm',
			type        : 'creatableSelect',
			placeholder : 'Enter your POC name',
			styles      : { flexBasis: '30%' },
			rules       : {
				required: 'POC Name is required',
			},
		},
		{
			name   : 'mobile_number',
			label  : 'Mobile Number',
			size   : 'sm',
			type   : 'mobileNumber',
			styles : { flexBasis: '30%' },
			rules  : {
				required : 'Mobile Number is required',
				pattern  : {
					value   : countryValidation?.regex?.MOBILE_NUMBER,
					message : 'Mobile Number is Invalid',
				},
			},
		},
		{
			name   : 'email',
			label  : 'Email',
			type   : 'text',
			size   : 'sm',
			styles : { flexBasis: '30%' },
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
