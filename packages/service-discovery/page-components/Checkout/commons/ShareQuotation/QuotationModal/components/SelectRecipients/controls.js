const controls = [
	{
		name        : 'user_ids',
		type        : 'checkbox-select',
		label       : 'Email recipients',
		options     : [],
		placeholder : '',
		multiple    : true,
		span        : 12,
		validations : [
			{
				type    : 'required',
				message : 'Email recipients is required',
			},
		],
	},
	{
		name        : 'cc_user_ids',
		type        : 'checkbox-select',
		label       : 'CC:',
		options     : [],
		multiple    : true,
		placeholder : '',
		span        : 12,
	},
];

export default controls;
