export const controls = [
	{
		label: 'Select user',
		name: 'user',
		type: 'select',
		errorName: 'user',
		optionsListKey: 'partner-users',
		valueKey: 'user_id',
		params: {
			page_limit: 100,
			filters: {
				status: 'active',
			},
		},
		placeholder: 'Select user....',
		span: 8,
		rules: { required: 'required' },
	},
];
