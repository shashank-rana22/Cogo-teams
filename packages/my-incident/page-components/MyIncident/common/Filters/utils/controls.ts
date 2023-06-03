export const filterControls = (activeTab) => {
	switch (activeTab) {
		case 'requested':
			return [
				{
					name        : 'request_type',
					placeholder : 'Category',
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
						{
							value : 'ADVANCE_SECURITY_DEPOSIT',
							label : 'Advance Container Security Deposit',
						},
						{
							value : 'ADVANCE_SECURITY_DEPOSIT_REFUND',
							label : 'Advance Container Security Deposit Refund',
						},
					],
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
						{
							value : 'ADVANCE_SECURITY_DEPOSIT',
							label : 'Advance Container Security Deposit',
						},
						{
							value : 'ADVANCE_SECURITY_DEPOSIT_REFUND',
							label : 'Advance Container Security Deposit Refund',
						},
					],
				},
				{
					name        : 'rejectedStatus',
					placeholder : 'Status',
					type        : 'select',
					caret       : true,
					isClearable : true,
					options     : [
						{ label: 'Closed', value: 'CLOSED' },
						{ label: 'Pending Action', value: 'PENDING_ACTION' },
						{ label: 'Raised Again', value: 'RAISED_AGAIN' },
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
		case 'approved':
			return [
				{
					name        : 'request_type',
					placeholder : 'Category',
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
						{
							value : 'ADVANCE_SECURITY_DEPOSIT',
							label : 'Advance Container Security Deposit',
						},
						{
							value : 'ADVANCE_SECURITY_DEPOSIT_REFUND',
							label : 'Advance Container Security Deposit Refund',
						},
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
