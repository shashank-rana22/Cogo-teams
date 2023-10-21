import { startCase } from '@cogoport/utils';

import { PAYMENT_OPTIONS } from '../../constants/REPEAT_FREQUENCY';

const vendorControls = [
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
		name        : 'CATEGORY',
		placeholder : 'Expense Category',
		type        : 'asyncSelect',
		asyncKey    : 'list_expense_category',
		renderLabel : (item) => startCase(item.categoryName),
		initialCall : true,
		valueKey    : 'categoryName',
		isClearable : true,
		span        : 1,
		style       : { width: '164px', height: '32px' },
	},
];

export default vendorControls;
