import { BRANCH_OPTIONS } from '../constants/BRANCH_OPTIONS';
import { REPEAT_FREQUENCY } from '../constants/REPEAT_FREQUENCY';

export const nonRecurringFilters = [
	{
		name        : 'expenseCategory',
		placeholder : 'Expense Category',
		type        : 'asyncSelect',
		asyncKey    : 'list_expense_category',
		initialCall : true,
		valueKey    : 'id',
		span        : 2,
		style       : { width: '164px', height: '32px' },
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
		name        : 'expenseCategory',
		placeholder : 'Expense Category',
		type        : 'asyncSelect',
		asyncKey    : 'list_expense_category',
		initialCall : true,
		valueKey    : 'id',
		span        : 1,
		style       : { width: '164px', height: '32px' },
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
