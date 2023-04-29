export const columns = [
	{
		Header   : 'Name',
		accessor : 'name',
		id       : 'name',
	},
	{
		Header   : 'Invoices',
		accessor : 'totalCount',
		id       : 'totalCount',
	},
	{
		Header   : 'Success Rate',
		id       : 'success_rate',
		accessor : (row) => {
			const { totalCount, approvedCount } = row;
			const successRate = (approvedCount / totalCount) * 100;
			return `${successRate.toFixed(2)} %`;
		},
	},
];
