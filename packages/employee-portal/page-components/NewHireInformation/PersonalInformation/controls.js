const controls = [
	{
		name        : 'first_name',
		label       : 'First Name',
		type        : 'input',
		placeholder : 'First Name',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'middle_name',
		label       : 'Middle Name',
		type        : 'input',
		placeholder : 'Middle Name',
	},
	{
		name        : 'last_name',
		label       : 'Last Name',
		type        : 'input',
		placeholder : 'Last Name',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'dob',
		label       : 'Date of Birth',
		type        : 'date-select',
		placeholder : 'DD/MM/YYYY',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'gender',
		label       : 'Gender',
		type        : 'select',
		placeholder : 'Select Gender',
		rules       : { required: 'This is required' },
		options     : [
			{ label: 'Male', value: 'male' },
			{ label: 'Female', value: 'female' },
		],
	},
	{
		name        : 'phone_number',
		label       : 'Phone Number',
		type        : 'mobilenumber',
		placeholder : 'Mobile',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'personal_email',
		label       : 'Personal Email Id',
		type        : 'email',
		placeholder : 'Email',
		rules       : { required: 'This is required' },
	},
	{
		name  : 'photo',
		label : 'Passport Size Photograph',
		type  : 'fileUpload',
		rules : { required: 'This is required' },
	},
	{
		name        : 'emergency_num',
		label       : 'Emergency Contact Number',
		type        : 'mobilenumber',
		placeholder : 'Emergency Contact Number',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'address',
		label       : 'Address',
		type        : 'input',
		placeholder : 'Address',
		rules       : { required: 'This is required' },
	},
];

export default controls;
