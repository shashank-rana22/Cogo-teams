export const filterControls = (activeTab) => {
	let optionVal;
	if (activeTab === 'requested') {
		optionVal = [

			{ value: 'REQUESTED', label: 'Requested' },
			{ value: 'DELETED', label: 'Deleted' },

		];
	} else if (activeTab === 'rejected') {
		optionVal = [
			{ label: 'Accepted', value: 'ACCEPTED' },
			{ label: 'Pending Action', value: 'PENDING_ACTION' },
			{ label: 'Raised Again', value: 'RAISED_AGAIN' },
		];
	}
	if (activeTab === 'approved') {
		return [
			{
				name        : 'request_type',
				placeholder : 'Category',
				size        : 'lg',
				type        : 'select',
				caret       : true,
				isClearable : true,
				options     : [
					{ value: 'TDS_APPROVAL', label: 'TDS Deviation' },
					{ value: 'BANK_DETAIL_APPROVAL', label: 'Bank Account Add/Edit' },
					{ value: 'SETTLEMENT_APPROVAL', label: 'Settlement' },
					{ value: 'JOURNAL_VOUCHER_APPROVAL', label: 'Journal Voucher' },
					{ value: 'ISSUE_CREDIT_NOTE', label: 'Request CN' },
					{ value: 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL', label: 'IC JV Approval' },
				],
			},
			{
				name        : 'Date',
				placeholder : 'Select Date',
				type        : 'datepicker',
				size        : 'lg',

			},
		];
	}
	return [
		{
			name        : 'request_type',
			placeholder : 'Category',
			size        : 'lg',
			type        : 'select',
			caret       : true,
			isClearable : true,
			options     : [
				{ value: 'TDS_APPROVAL', label: 'TDS Deviation' },
				{ value: 'BANK_DETAIL_APPROVAL', label: 'Bank Account Add/Edit' },
				{ value: 'SETTLEMENT_APPROVAL', label: 'Settlement' },
				{ value: 'JOURNAL_VOUCHER_APPROVAL', label: 'Journal Voucher' },
				{ value: 'ISSUE_CREDIT_NOTE', label: 'Request CN' },
				{ value: 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL', label: 'IC JV Approval' },
			],
		},
		{
			name        : 'Date',
			placeholder : 'Select Date',
			type        : 'datepicker',
			size        : 'lg',

		},
		{
			name        : 'status',
			placeholder : 'Status',
			size        : 'lg',
			type        : 'select',
			caret       : true,
			isClearable : true,
			options     : optionVal,
		},
	];
};
