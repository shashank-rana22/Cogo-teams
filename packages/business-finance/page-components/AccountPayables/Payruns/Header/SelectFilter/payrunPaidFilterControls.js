export const PAYRUNS_BANK_DATE_FILTERS = (bankOptions = [], overseasData = '') => {
	if (overseasData === 'ADVANCE_PAYMENT') {
		return [
			{
				name        : 'cogoBankId',
				type        : 'select',
				isClearable : true,
				placeholder : 'Bank',
				style       : { width: '200px ' },
				options     : bankOptions,
				span        : 2.5,
			},
			{
				name                  : 'selectDate',
				type                  : 'singleDateRange',
				style                 : { width: '200px ' },
				isPreviousDaysAllowed : true,
				isClearable           : true,
				placeholder           : 'Select Date',
				maxDate               : new Date(),
				span                  : 1.5,
			},
		];
	}
	return [
		{
			name        : 'cogoBankId',
			type        : 'select',
			placeholder : 'Bank',
			isClearable : true,
			style       : { width: '200px ' },
			options     : bankOptions,
			span        : 2.5,
		},
		{
			name                  : 'selectDate',
			type                  : 'singleDateRange',
			isPreviousDaysAllowed : true,
			isClearable           : true,
			style                 : { width: '200px' },
			placeholder           : 'Select Date',
			maxDate               : new Date(),
			span                  : 1.5,
		},
		{
			name        : 'paymentStatusList',
			type        : 'select',
			isClearable : true,
			multiple    : true,
			placeholder : ' Payment Status',
			options     : [
				{ label: 'Paid', value: 'full' },
				{ label: 'OverPaid', value: 'overpaid' },
				{ label: 'Partial', value: 'partial' },
			],
			span: 2,
		},
		{
			name        : 'billStatus',
			type        : 'select',
			isClearable : true,
			placeholder : ' Select Status',
			options     : [
				{ label: 'Posted', value: 'POSTED' },
				{ label: 'Finance Accepted', value: 'FINANCE_ACCEPTED' },
				{ label: 'Failed', value: 'FAILED' },
			],
			span: 2,
		},
	];
};
