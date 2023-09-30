import styles from './styles.module.css';

interface Props {
	t?: Function;
	isSettlementExecutive?: boolean;
}
export const requestControls = ({ t = () => {}, isSettlementExecutive = false }:Props) => {
	let optionsVal = [{}];
	if (isSettlementExecutive) {
		optionsVal = [
			{ value: 'PAYMENT_CONFIRMATION_APPROVAL', label: t('incidentManagement:payment_confirmation_label') },
		];
	} else {
		optionsVal = [
			{ value: 'TDS_APPROVAL', label: t('incidentManagement:tds_deviation') },
			{ value: 'BANK_DETAIL_APPROVAL', label: t('incidentManagement:bank_acc_add_edit') },
			{ value: 'REVOKE_INVOICE', label: t('incidentManagement:invoice_revoke') },
			{ value: 'ISSUE_CREDIT_NOTE', label: t('incidentManagement:credit_note_request') },
			{
				value : 'CONSOLIDATED_CREDIT_NOTE',
				label : t('incidentManagement:consolidated_credit_note_request'),
			},
			{
				value : 'CONCOR_PDA_APPROVAL',
				label : t('incidentManagement:concor_pda_approval'),
			},
			{
				value : 'SEZ_APPROVAL',
				label : t('incidentManagement:sez_approval_title'),
			},
			{
				value : 'ADVANCE_SECURITY_DEPOSIT',
				label : t('incidentManagement:adv_cont_sec_deposit'),
			},
			{
				value : 'ADVANCE_SECURITY_DEPOSIT_REFUND',
				label : t('incidentManagement:adv_cont_sec_deposit_refund'),
			},
			{
				value : 'PAYMENT_CONFIRMATION_APPROVAL',
				label : t('incidentManagement:payment_confirmation_approval'),
			},
			{
				value : 'RECURRING_EXPENSE_APPROVAL',
				label : t('incidentManagement:expense_configuration_approval'),
			},
			{
				value : 'OVERHEAD_APPROVAL',
				label : t('incidentManagement:expense_approval'),
			},
			{
				value : 'JOB_OPEN',
				label : t('incidentManagement:job_open_label'),
			},
		];
	}

	return [
		{
			name        : 'category',
			placeholder : t('incidentManagement:select_category_placeholder'),
			type        : 'select',
			caret       : true,
			isClearable : true,
			options     : optionsVal,
			className   : styles.category_section,
		},
		{
			name        : 'urgency',
			placeholder : t('incidentManagement:select_urgency_placeholder'),
			type        : 'select',
			caret       : true,
			isClearable : true,
			options     : [
				{ value: 'all', label: t('incidentManagement:urgency_label_all') },
				{ value: 'urgent', label: t('incidentManagement:urgency_label_urgent') },
			],
			className: styles.urgency_section,
		},
		{
			name                  : 'date',
			placeholder           : t('incidentManagement:select_date_placeholder'),
			type                  : 'singleDateRange',
			isPreviousDaysAllowed : true,
			caret                 : true,
			isClearable           : true,
			className             : styles.date_section,
		},
		{
			name      : 'isMyTaskOnly',
			type      : 'toggle',
			size      : 'sm',
			onLabel   : t('incidentManagement:toggle_label'),
			offLabel  : '',
			className : styles.toggle,
		},
	];
};

export const remainControls = ({ t = () => {}, isSettlementExecutive = false }:Props) => {
	let optionsVal = [{}];
	if (isSettlementExecutive) {
		optionsVal = [
			{ value: 'PAYMENT_CONFIRMATION_APPROVAL', label: 'Payment Confirmation' },
		];
	} else {
		optionsVal = [
			{ value: 'TDS_APPROVAL', label: t('incidentManagement:tds_deviation') },
			{ value: 'BANK_DETAIL_APPROVAL', label: t('incidentManagement:bank_acc_add_edit') },
			{ value: 'REVOKE_INVOICE', label: t('incidentManagement:invoice_revoke') },
			{ value: 'ISSUE_CREDIT_NOTE', label: t('incidentManagement:credit_note_request') },
			{
				value : 'CONSOLIDATED_CREDIT_NOTE',
				label : t('incidentManagement:consolidated_credit_note_request'),
			},
			{
				value : 'CONCOR_PDA_APPROVAL',
				label : t('incidentManagement:concor_pda_approval'),
			},
			{
				value : 'SEZ_APPROVAL',
				label : t('incidentManagement:sez_approval_title'),
			},
			{
				value : 'ADVANCE_SECURITY_DEPOSIT',
				label : t('incidentManagement:adv_cont_sec_deposit'),
			},
			{
				value : 'ADVANCE_SECURITY_DEPOSIT_REFUND',
				label : t('incidentManagement:adv_cont_sec_deposit_refund'),
			},
			{
				value : 'PAYMENT_CONFIRMATION_APPROVAL',
				label : t('incidentManagement:payment_confirmation_approval'),
			},
			{
				value : 'RECURRING_EXPENSE_APPROVAL',
				label : t('incidentManagement:expense_configuration_approval'),
			},
			{
				value : 'OVERHEAD_APPROVAL',
				label : t('incidentManagement:expense_approval'),
			},
			{
				value : 'JOB_OPEN',
				label : t('incidentManagement:job_open_label'),
			},
		];
	}

	return [
		{
			name        : 'category',
			placeholder : t('incidentManagement:select_category_placeholder'),
			type        : 'select',
			caret       : true,
			isClearable : true,
			options     : optionsVal,
			className   : styles.category_section,
		},
		{
			name                  : 'date',
			placeholder           : t('incidentManagement:select_date_placeholder'),
			type                  : 'singleDateRange',
			caret                 : true,
			isPreviousDaysAllowed : true,
			isClearable           : true,
			className             : styles.date,
		},
		{
			name      : 'isMyTaskOnly',
			type      : 'toggle',
			size      : 'sm',
			onLabel   : t('incidentManagement:toggle_label'),
			offLabel  : '',
			className : styles.toggle,
		},
	];
};
