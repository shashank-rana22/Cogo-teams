function getControls() {
	return [
		{
			name        : 'new_name',
			label       : 'Name',
			type        : 'text',
			size        : 'sm',
			placeholder : 'Enter Name',
			rules       : {
				required: 'Required',
			},
		},
		{
			name        : 'new_email',
			label       : 'Email Address',
			type        : 'text',
			size        : 'sm',
			placeholder : 'Enter Email Address',
			rules       : {
				required: 'Required',
			},
		},
		{
			name        : 'new_mobile_number',
			label       : 'Mobile Number',
			type        : 'mobileNumber',
			size        : 'sm',
			placeholder : 'Enter Mobile Number',
			rules       : {
				required: 'Required',
			},
		},
	];
}

export default getControls;
