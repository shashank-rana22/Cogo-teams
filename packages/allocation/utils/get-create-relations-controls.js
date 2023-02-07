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
			type        : 'asyncSelect',
			asyncKey    : 'organizations',
			initialCall : false,
			rules       : {
				required: 'Organization Name required',
			},
		},
	];

	return controls;
};

export default getCreateRelationsControls;
