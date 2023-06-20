export const historyFilters = () => [
	{

		name        : 'orgId',
		placeholder : 'Enter Business Partner',
		type        : 'asyncSelect',
		multiple    : false,
		size        : 'md',
		isClearable : true,
		initialCall : false,
		asyncKey    : 'list_trade_parties',
		valueKey    : 'id',
	},
	{
		name    : 'accountType',
		type    : 'select',
		theme   : 'admin',
		options : [
			{ label: 'All', value: 'All' },
			{ label: 'On Account Payment', value: 'REC' },
			{ label: 'Credit Note', value: 'PCN' },
			{ label: 'Invoice', value: 'SINV' },
		],
		placeholder: 'All',
	},
	{
		name                  : 'date',
		type                  : 'singleDateRange',
		placeholder           : 'Date',
		theme                 : 'admin',
		maxDate               : new Date(),
		className             : 'primary md',
		defaultValue          : null,
		isPreviousDaysAllowed : true,
		span                  : 3,
	},
];
