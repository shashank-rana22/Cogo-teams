export const requestControls = (isSettlementExecutive = false) => {
	let optionsVal = [{}];
	if (isSettlementExecutive) {
		optionsVal = [
			{ value: 'PAYMENT_CONFIRMATION_APPROVAL', label: 'Payment Confirmation' },
		];
	} else {
		optionsVal = [
			{ value: 'TDS_APPROVAL', label: 'TDS Deviation' },
			{ value: 'BANK_DETAIL_APPROVAL', label: 'Bank Account Add/Edit' },
			{ value: 'SETTLEMENT_APPROVAL', label: 'Settlement' },
			{ value: 'JOURNAL_VOUCHER_APPROVAL', label: 'Journal Voucher' },
			{ value: 'ISSUE_CREDIT_NOTE', label: 'Request credit note' },
			{
				value : 'CONSOLIDATED_CREDIT_NOTE',
				label : 'Request Consolidated Credit Note',
			},
			{
				value : 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL',
				label : 'Inter Company Journey Voucher Approval',
			},
		];
	}

	return [
		{
			name        : 'category',
			placeholder : 'Category',
			type        : 'select',
			caret       : true,
			isClearable : true,
			options     : optionsVal,
		},
		{
			name        : 'urgency',
			placeholder : 'Urgency',
			type        : 'select',
			caret       : true,
			isClearable : true,
			options     : [
				{ value: 'all', label: 'All' },
				{ value: 'urgent', label: 'Urgent' },
			],
		},
		{
			name                  : 'date',
			placeholder           : 'Select Date',
			type                  : 'singleDateRange',
			isPreviousDaysAllowed : true,
			caret                 : true,
			isClearable           : true,
		},
	];
};

export const remainControls = (isSettlementExecutive = false) => {
	let optionsVal = [{}];
	if (isSettlementExecutive) {
		optionsVal = [
			{ value: 'PAYMENT_CONFIRMATION_APPROVAL', label: 'Payment Confirmation' },
		];
	} else {
		optionsVal = [
			{ value: 'TDS_APPROVAL', label: 'TDS Deviation' },
			{ value: 'BANK_DETAIL_APPROVAL', label: 'Bank Account Add/Edit' },
			{ value: 'SETTLEMENT_APPROVAL', label: 'Settlement' },
			{ value: 'JOURNAL_VOUCHER_APPROVAL', label: 'Journal Voucher' },
			{ value: 'ISSUE_CREDIT_NOTE', label: 'Request credit note' },
			{
				value : 'CONSOLIDATED_CREDIT_NOTE',
				label : 'Request Consolidated Credit Note',
			},
			{
				value : 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL',
				label : 'Inter Company Journey Voucher Approval',
			},
		];
	}

	return [
		{
			name        : 'category',
			placeholder : 'Category',
			type        : 'select',
			caret       : true,
			isClearable : true,
			options     : optionsVal,
		},
		{
			name                  : 'date',
			placeholder           : 'Select Date',
			type                  : 'singleDateRange',
			caret                 : true,
			isPreviousDaysAllowed : true,
			isClearable           : true,
		},
	];
};
