import { startCase } from '@cogoport/utils';

const vendorControls = [
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
