const getCreateRelationsControls = () => {
	const controls = [
		{
			name    : 'relation_type',
			label   : 'Relation Type',
			type    : 'radioGroup',
			value   : 'keep',
			options : [
				{ value: 'keep', label: 'Keep' },
				{ value: 'remove', label: 'Remove' },
			],
		},
		{
			name        : 'service_id',
			label       : 'Organization Name',
			placeholder : 'Select Organization',
			type        : 'asyncSelect',
			asyncKey    : 'organizations',
			initialCall : false,
			isClearable : true,
			rules       : {
				required: 'Organization Name required',
			},
		},
		{
			name        : 'service_user_id',
			label       : 'User',
			placeholder : 'Select user',
			type        : 'asyncSelect',
			asyncKey    : 'organization_users',
			valueKey    : 'user_id',
			initialCall : false,
			disabled    : true,
			isClearable : true,
			rules       : {
				required: 'User required',
			},
		},
		{
			name        : 'stakeholder_type',
			label       : 'Stakeholder Type',
			placeholder : 'Select stakeholder type',
			type        : 'select',
			options     : [
				{ value: 'sales_agent', label: 'Sales Agent' },
				{ value: 'credit_controller', label: 'Credit Controller' },
				{ value: 'ckam', label: 'CKAM' },
			],
			rules: {
				required: 'Stakeholder Type required',
			},
			isClearable: true,
		},
		{
			name        : 'stakeholder_id',
			label       : 'Stakeholder name',
			placeholder : 'Select stakeholders',
			type        : 'asyncSelect',
			asyncKey    : 'partner_users',
			valueKey    : 'user_id',
			params      : {
				filters: {
					partner_entity_types: ['cogoport'],
				},
			},
			initialCall : false,
			rules       : {
				required: 'Stakeholder name required',
			},
		},
		{
			name        : 'reason',
			label       : 'Relation Reason',
			placeholder : 'Type here...',
			type        : 'text',
			isClearable : true,
			rules       : {
				required: 'Specify reason',
			},
		},
		{
			name           : 'expiry_date',
			label          : 'Expiry Date',
			placeholder    : 'Eg. Jan 1, 2023, 12:00 AM',
			type           : 'datePicker',
			showTimeSelect : true,
			dateFormat     : 'MMM d, yyyy, hh:mm a',
			minDate        : new Date(),
			rules          : { required: 'Expiry date is required' },
		},
	];

	return controls;
};

export default getCreateRelationsControls;
