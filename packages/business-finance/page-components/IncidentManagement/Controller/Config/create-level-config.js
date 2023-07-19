import { isEmpty } from '@cogoport/utils';

export const controls = ({ incidentType, setValue = () => {} }) => [
	{
		name        : 'incidentType',
		label       : 'Incident Type',
		type        : 'select',
		placeholder : 'Select Incident Type',
		isClearable : true,
		span        : 6,
		onChange    : () => {
			setValue('incidentSubtype', null);
		},
		options: [
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
		],
		rules: { required: 'Incident Type is required' },
	},
	{
		name        : 'incidentSubtype',
		label       : 'Incident Subtype',
		type        : 'asyncSelect',
		asyncKey    : 'list_incident_subtype',
		span        : 5.5,
		initialCall : true,
		placeholder : 'Incident Subtype',
		disabled    : isEmpty(incidentType),
		params      : { incidentType: incidentType || undefined },
		rules       : { required: 'Incident Subtype is required' },
	},
	{
		name        : 'approvalType',
		label       : 'Approval Type',
		placeholder : 'Approval Type',
		span        : 6,
		type        : 'select',
		options     : [
			{
				label : 'Multiple',
				value : 'MULTIPLE',
			},
			{
				label : 'Single',
				value : 'SINGLE',
			},
		],
		rules: { required: 'Approval Type is required' },
	},
	{
		name        : 'entityCode',
		label       : 'Entity Code',
		type        : 'asyncSelect',
		span        : 5.5,
		asyncKey    : 'list_cogo_entity',
		placeholder : 'Enter Entity',
		renderLabel : (item) => (`${item?.entity_code} - ${item?.business_name}`),
		initialCall : true,
		rules       : { required: 'EntityCode is required' },
	},
];
