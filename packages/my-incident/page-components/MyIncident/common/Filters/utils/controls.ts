export const filterControls = (activeTab) => {
	switch (activeTab) {
		case 'requested':
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
					name        : 'requestedStatus',
					placeholder : 'Status',
					size        : 'lg',
					type        : 'select',
					caret       : true,
					isClearable : true,
					options     : [

						{ value: 'REQUESTED', label: 'Requested' },
						{ value: 'DELETED', label: 'Deleted' },

					],
				},
				{
					name        : 'Date',
					placeholder : 'Select Date',
					type        : 'datepicker',
					size        : 'lg',

				},
			];
		case 'rejected':
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
					name        : 'rejectedStatus',
					placeholder : 'Status',
					size        : 'lg',
					type        : 'select',
					caret       : true,
					isClearable : true,
					options     : [
						{ label: 'Accepted', value: 'ACCEPTED' },
						{ label: 'Pending Action', value: 'PENDING_ACTION' },
						{ label: 'Raised Again', value: 'RAISED_AGAIN' },
					],
				},
				{
					name        : 'Date',
					placeholder : 'Select Date',
					type        : 'datepicker',
					size        : 'lg',

				},
			];
		case 'approved':
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
		default:
			return null;
	}
};
