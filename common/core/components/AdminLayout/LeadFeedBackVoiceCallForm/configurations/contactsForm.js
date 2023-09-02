const CONTACT_FORM_CONTROLS = [
	{
		name        : 'name',
		label       : 'Name',
		controlType : 'input',
		type        : 'text',
		placeholder : 'Enter name',
		width       : '50%',
		rules       : { required: 'This is Required' },
	},
	{
		name        : 'email',
		type        : 'email',
		controlType : 'input',
		width       : '50%',
		label       : 'Email Id',
		placeholder : 'Enter email',
	},
	{
		name              : 'mobile_number_data',
		label             : 'Mobile No.',
		controlType       : 'mobileNumberSelect',
		codeKey           : 'mobile_country_code',
		numberKey         : 'mobile_number',
		placeholder       : 'Please enter the mobile number...',
		width             : '80%',
		mobileInputStyles : {
			width: '60%',
		},
		countryCodeStyles: {
			width       : '40%',
			marginRight : '12px',
		},
	},
];
export default CONTACT_FORM_CONTROLS;
