import { startCase } from '@cogoport/utils';

import { PAYMENT_OPTIONS, REPEAT_FREQUENCY } from '../constants/REPEAT_FREQUENCY';

export const nonRecurringFilters = [
	{
		name        : 'expenseCategory',
		placeholder : 'Expense Category',
		type        : 'asyncSelect',
		asyncKey    : 'list_expense_category',
		initialCall : true,
		renderLabel : (item) => startCase(item.categoryName),
		valueKey    : 'id',
		isClearable : true,
		span        : 2,
		style       : { width: '164px', height: '32px' },
	},
	{
		name           : 'paymentStatus',
		type           : 'select',
		multiple       : false,
		defaultOptions : false,
		placeholder    : 'Payment Status',
		span           : 2,
		isClearable    : true,
		size           : 'sm',
		options        : PAYMENT_OPTIONS,
	},
	{
		name                  : 'uploadDate',
		type                  : 'singleDateRange',
		placeholder           : 'Upload Date',
		isPreviousDaysAllowed : true,
		span                  : 2,
		isClearable           : true,
	},
	{
		name                  : 'dueDate',
		type                  : 'singleDateRange',
		placeholder           : 'Due Date',
		isPreviousDaysAllowed : true,
		span                  : 2,
		isClearable           : true,
	},
	{
		name                  : 'billDate',
		type                  : 'singleDateRange',
		isPreviousDaysAllowed : true,
		placeholder           : 'Bill Date',
		span                  : 2,
		isClearable           : true,
	},
];

export const recurringFilters = [
	{
		name        : 'expenseCategory',
		placeholder : 'Expense Category',
		type        : 'asyncSelect',
		asyncKey    : 'list_expense_category',
		renderLabel : (item) => startCase(item.categoryName),
		initialCall : true,
		valueKey    : 'id',
		isClearable : true,
		span        : 1,
		style       : { width: '164px', height: '32px' },
	},
	{
		name           : 'repeatsEvery',
		type           : 'select',
		multiple       : false,
		defaultOptions : false,
		placeholder    : 'Repeats Every',
		isClearable    : true,
		size           : 'sm',
		options        : REPEAT_FREQUENCY,
	},
];
