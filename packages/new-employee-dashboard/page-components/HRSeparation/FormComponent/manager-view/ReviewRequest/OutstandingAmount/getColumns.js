const getColumns = () => [
	{
		Header   : 'LEGAL BUSINESS NAME',
		accessor : (item) => <div>{item?.selfOrganizationName || '-'}</div>,
	},
	{
		Header   : 'DUES',
		accessor : (item) => <div>{item?.dues || '-'}</div>,
	},
	{
		Header   : '1 - 30 (DAYS)',
		accessor : (item) => <div>{item?.onAccountAgeingBucket?.thirty?.ledgerAmount || '-'}</div>,
	},
	{
		Header   : '31 - 45 (DAYS)',
		accessor : (item) => <div>{item?.first || '-'}</div>,
	},
	{
		Header   : '46 - 60 (DAYS)',
		accessor : (item) => <div>{item?.first || '-'}</div>,
	},
	{
		Header   : '61 - 90 (DAYS)',
		accessor : (item) => <div>{item?.first || '-'}</div>,
	},
	{
		Header   : '91 - 180 (DAYS)',
		accessor : (item) => <div>{item?.first || '-'}</div>,
	},
	{
		Header   : '181 - 365 (DAYS)',
		accessor : (item) => <div>{item?.first || '-'}</div>,
	},
	{
		Header   : '365+ (DAYS)',
		accessor : (item) => <div>{item?.first || '-'}</div>,
	},
	{
		Header   : 'OPEN INVOICE (AMOUNT)',
		accessor : (item) => <div>{item?.open_invoice || '-'}</div>,
	},
	{
		Header   : 'ON ACCOUNT',
		accessor : (item) => <div>{item?.on_account || '-'}</div>,
	},
	{
		Header   : 'TOTAL OUTSTANDING',
		accessor : (item) => <div>{item?.total_outstanding || '-'}</div>,
	},
];

export default getColumns;
