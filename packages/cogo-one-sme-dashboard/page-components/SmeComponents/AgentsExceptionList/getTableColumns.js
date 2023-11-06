function getTableColumns() {
	return [
		{
			id       : 'agent_name',
			Header   : 'Agent name',
			accessor : 'agent',
		},
		{
			id       : 'manager_name',
			Header   : 'Manager Name',
			accessor : 'manager',
		},
		{
			id       : 'agent_tenure',
			Header   : 'Agent Tenure',
			accessor : 'tenure',
		},
		{
			id       : 'agent_role',
			Header   : 'Agent Role',
			accessor : 'role',
		},
		{
			id       : 'location',
			Header   : 'Location',
			accessor : 'office',
		},
	];
}

export default getTableColumns;
