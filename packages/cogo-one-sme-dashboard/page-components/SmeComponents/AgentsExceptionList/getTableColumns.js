function getTableColumns() {
	return [
		{
			Header   : 'Agent name',
			accessor : 'agent_name',
			id       : 'agent_name',
		},
		{
			Header   : 'Manager Name',
			accessor : 'manager_name',
			id       : 'manager_name',
		},
		{
			Header   : 'Agent Tenure',
			id       : 'agent_tenure',
			accessor : 'agent_tenure',
		},
		{
			Header   : 'Agent Role',
			id       : 'agent_role',
			accessor : 'agent_role',
		},
		{
			Header   : 'Location',
			id       : 'location',
			accessor : 'location',
		},
	];
}

export default getTableColumns;
