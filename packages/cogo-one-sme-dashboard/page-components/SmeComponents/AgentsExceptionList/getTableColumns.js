function getTableColumns() {
	return [
		{
			Header   : 'Agent name',
			accessor : 'agent_name',
		},
		{
			Header   : 'Manager Name',
			accessor : 'manager_name',
		},
		{
			Header   : 'Agent Tenure',
			accessor : 'agent_tenure',
		},
		{
			Header   : 'Agent Role',
			accessor : 'agent_role',
		},
		{
			Header   : 'Location',
			accessor : 'location',
		},
	];
}

export default getTableColumns;
