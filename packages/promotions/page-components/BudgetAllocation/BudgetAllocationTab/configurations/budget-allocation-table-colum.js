import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const tableColumns = [
	{
		Header   : 'ROLE NAME',
		accessor : (item) => item?.name,
		id       : 'name',
	},
	{
		Header   : 'TOTAL USERS',
		accessor : (item) => item?.user_count,
		id       : 'user_count',
	},
	{
		Header   : `BUDGET(${GLOBAL_CONSTANTS.currency_code.USD})`,
		accessor : (item) => item?.total_budget,
		id       : 'total_budget',
	},
	{
		Header   : 'FREQUENCY',
		accessor : (item) => item?.frequency,
		id       : 'frequency',
	},
	{
		Header   : 'CREATED DATE',
		accessor : (item) => item?.validity_start,
		id       : 'validity_start',
	},

	{
		Header   : 'STATUS',
		accessor : (item) => item?.status,
		id       : 'status',
	},
	{
		Header   : '',
		accessor : (item) => item?.dots,
		id       : 'dots',
	},
];
export default tableColumns;
