import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

export const exceptionMasterFilters = [
	{
		name        : 'category',
		type        : 'select',
		placeholder : 'Category',
		isClearable : true,
		span        : 2,
		options     : [
			{
				label : 'SME',
				value : 'sme',
			},
			{
				label : 'ENTERPRISE',
				value : 'enterprise',
			},
			{
				label : 'LARGE',
				value : 'large',
			},
		],

	},
	{
		name        : 'creditDays',
		type        : 'select',
		span        : 1,
		placeholder : 'Credit Days',
		isClearable : true,
		options     : [
			{
				label : 'Upto 30 days',
				value : '30',
			},
			{
				label : '30 to 60 days',
				value : '60',
			},
			{
				label : '60 to 90 days',
				value : '90',
			},
		],
	},
	{
		name        : 'entities',
		type        : 'multiSelect',
		span        : 1,
		placeholder : 'Entities',
		isClearable : true,
		prefix      : () => {},
		options     : Object.keys(GLOBAL_CONSTANTS.cogoport_entities).map((entity) => (
			{
				label : String(entity),
				value : String(entity),
			}
		)),
	},
];

export const exceptionCycleWiseFilters = [
	{
		name        : 'cycleStatus',
		type        : 'select',
		placeholder : 'Cycle Status',
		isClearable : true,
		span        : 2,
		options     : [
			{
				label : 'ACTIVE',
				value : 'ACTIVE',
			},
			{
				label : 'INACTIVE',
				value : 'INACTIVE',
			},
		],

	},

];
