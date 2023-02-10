const getUserFilterControls = () => [
	{
		name           : 'work_scope',
		label          : 'Role',
		placeholder    : 'Role',
		type           : 'select',
		defaultOptions : true,
		isClearable    : true,
		options        : [
			{
				label : 'Associate Software Engineer',
				value : 'Associate Software Engineer',
			},
			{ label: 'Software Engineer', value: 'Software Engineer' },
			{ label: 'SDE 2', value: 'SDE 2' },
		],
		span: 10,
	},
	{
		label          : 'Feedback Status',
		name           : 'feedback_status',
		placeholder    : 'Feedback Status',
		type           : 'select',
		defaultOptions : true,
		isClearable    : true,
		options        : [
			{ label: 'Pending', value: 'Pending' },
			{ label: 'Success', value: 'Success' },
		],
		span: 5,
	},
	{
		name           : 'rating',
		label          : 'Rating',
		placeholder    : 'Rating',
		type           : 'select',
		defaultOptions : true,
		isClearable    : true,
		options        : [
			{ label: '1', value: 1 },
			{ label: '2', value: 2 },
			{ label: '3', value: 3 },
			{ label: '4', value: 4 },
			{ label: '5', value: 5 },
		],
		span: 5,
	},
];

export default getUserFilterControls;
