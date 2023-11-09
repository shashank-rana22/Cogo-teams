import { PAYMENT_OPTIONS } from '../constants/REPEAT_FREQUENCY';

const filtersconfig = [
	{
		name           : 'paymentStatus',
		type           : 'select',
		multiple       : false,
		defaultOptions : false,
		placeholder    : 'Payment Status',
		span           : 2,
		isClearable    : true,
		options        : PAYMENT_OPTIONS,
	},
	{
		name                  : 'uploadDate',
		type                  : 'singleDateRange',
		placeholder           : 'Upload Date',
		span                  : 2,
		isPreviousDaysAllowed : true,
		isClearable           : true,
	},
	{
		name                  : 'dueDate',
		type                  : 'singleDateRange',
		placeholder           : 'Due Date',
		span                  : 2,
		isPreviousDaysAllowed : true,
		isClearable           : true,
	},
	{
		name                  : 'billDate',
		type                  : 'singleDateRange',
		placeholder           : 'Bill Date',
		span                  : 2,
		isPreviousDaysAllowed : true,
		isClearable           : true,
	}];

export default filtersconfig;
