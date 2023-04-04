import { BRANCH_OPTIONS } from '../constants/BRANCH_OPTIONS';
import CATEGORY_OPTIONS from '../constants/CATEGORY_OPTIONS';
import { REPEAT_FREQUENCY } from '../constants/REPEAT_FREQUENCY';

export const nonRecurringFilters = [
	{
		span           : 2,
		name           : 'expenseCategory',
		placeholder    : 'Expense Category',
		type           : 'select',
		multiple       : false,
		defaultOptions : false,
		size           : 'sm',
		isClearable    : true,
		options        : CATEGORY_OPTIONS,
	},
	{
		name           : 'branch',
		type           : 'select',
		multiple       : false,
		defaultOptions : false,
		placeholder    : 'Branch',
		span           : 2,
		isClearable    : true,
		size           : 'sm',
		options        : BRANCH_OPTIONS,
	},

];

export const recurringFilters = [
	{
		span           : 1,
		name           : 'expenseCategory',
		placeholder    : 'Expense Category',
		type           : 'select',
		multiple       : false,
		defaultOptions : false,
		size           : 'sm',
		isClearable    : true,
		options        : CATEGORY_OPTIONS,
	},
	{
		name           : 'branch',
		type           : 'select',
		multiple       : false,
		defaultOptions : false,
		placeholder    : 'Branch',
		span           : 2,
		isClearable    : true,
		size           : 'sm',
		options        : BRANCH_OPTIONS,
	},
	{
		name           : 'repeatsEvery',
		type           : 'select',
		multiple       : false,
		defaultOptions : false,
		placeholder    : 'Repeats Every',
		span           : 1,
		isClearable    : true,
		size           : 'sm',
		options        : REPEAT_FREQUENCY,
	},
];
