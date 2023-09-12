const getObjectiveInfoColumns = () => ([
	{
		key      : 'objective',
		flex     : 2,
		subtitle : 'Type',
		Header   : <>OBJECTIVE</>,
		accessor : ({ name = '' }) => (
			{ name }
		),
	},
	{
		key      : 'entity',
		flex     : 3,
		subtitle : 'Channel',
		Header   : <>ENTITY</>,
		accessor : ({ name = '' }) => (
			{ name }
		),
	},
	{
		key      : 'agent_roles',
		flex     : 2,
		subtitle : 'No. of agents',
		Header   : <>AGT.ROLES</>,
		accessor : ({ name = '' }) => (
			{ name }
		),
	},
	{
		key      : 'creation',
		flex     : 2,
		Header   : <>CREATION</>,
		accessor : ({ name = '' }) => (
			{ name }
		),
	},
	{
		key      : 'activation',
		flex     : 2,
		Header   : <>ACTIVATION</>,
		accessor : ({ name = '' }) => (
			{ name }
		),
	},
]);

export default getObjectiveInfoColumns;
