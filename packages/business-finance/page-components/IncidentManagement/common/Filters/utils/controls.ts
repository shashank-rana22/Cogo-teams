import styles from './styles.module.css';

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
			{ value: 'REVOKE_INVOICE', label: 'Revoke invoice' },
			{ value: 'ISSUE_CREDIT_NOTE', label: 'Request credit note' },
			{
				value : 'CONSOLIDATED_CREDIT_NOTE',
				label : 'Request Consolidated Credit Note',
			},
			{
				value : 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL',
				label : 'Inter Company Journey Voucher Approval',
			},
			{
				value : 'CONCOR_PDA_APPROVAL',
				label : 'Concor PDA Approval',
			},
			{
				value : 'SEZ_APPROVAL',
				label : 'Sez Approval',
			},
			{
				value : 'ADVANCE_SECURITY_DEPOSIT',
				label : 'Advance Container Security Deposit',
			},
			{
				value : 'ADVANCE_SECURITY_DEPOSIT_REFUND',
				label : 'Advance Container Security Deposit Refund',
			},
			{
				value : 'PAYMENT_CONFIRMATION_APPROVAL',
				label : 'Payment Confirmation Approval',
			},
			{
				value : 'RECURRING_EXPENSE_APPROVAL',
				label : 'Expense Configuration Approval',
			},
			{
				value : 'OVERHEAD_APPROVAL',
				label : 'Expense Approval',
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
			className   : styles.category_section,
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
			className: styles.urgency_section,
		},
		{
			name                  : 'date',
			placeholder           : 'Select Date',
			type                  : 'singleDateRange',
			isPreviousDaysAllowed : true,
			caret                 : true,
			isClearable           : true,
			className             : styles.date_section,
		},
		{
			name      : 'isMyTaskOnly',
			type      : 'toggle',
			size      : 'md',
			onLabel   : 'Show only my Tasks',
			offLabel  : '',
			className : styles.toggle,
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
			{ value: 'REVOKE_INVOICE', label: 'Revoke invoice' },
			{
				value : 'CONSOLIDATED_CREDIT_NOTE',
				label : 'Request Consolidated Credit Note',
			},
			{
				value : 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL',
				label : 'Inter Company Journey Voucher Approval',
			},
			{
				value : 'CONCOR_PDA_APPROVAL',
				label : 'Concor PDA Approval',
			},
			{
				value : 'SEZ_APPROVAL',
				label : 'Sez Approval',
			},
			{
				value : 'ADVANCE_SECURITY_DEPOSIT',
				label : 'Advance Container Security Deposit',
			},
			{
				value : 'ADVANCE_SECURITY_DEPOSIT_REFUND',
				label : 'Advance Container Security Deposit Refund',
			},
			{
				value : 'PAYMENT_CONFIRMATION_APPROVAL',
				label : 'Payment Confirmation Approval',
			},
			{
				value : 'RECURRING_EXPENSE_APPROVAL',
				label : 'EXPENSE APPROVAL',
			},
			{
				value : 'OVERHEAD_APPROVAL',
				label : 'NON Recurring EXpense Approval',
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
			className             : styles.date,
		},
	];
};
