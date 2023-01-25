const pendingColumns = [
	{
		Header   : 'First Name',
		id       : 'firstName',
		accessor : 'firstName',
	},
	{
		Header   : 'Last Name',
		accessor : 'lastName',
	},
	{
		Header   : 'Age',
		accessor : (row: Record<string, any>) => row.age,
	},
	{
		Header   : 'Visits',
		accessor : 'visits',
	},
	{
		Header   : 'Status',
		accessor : 'status',
	},
	{
		Header   : 'Progress',
		accessor : 'progresss',
	},
	{
		Header   : 'Gender',
		accessor : 'gender',
	},
];

export default pendingColumns;
