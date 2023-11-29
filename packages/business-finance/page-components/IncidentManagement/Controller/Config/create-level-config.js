import { camelCase, isEmpty, startCase } from '@cogoport/utils';

export const controls = ({ t = () => {}, incidentType = '', setValue = () => {} }) => [
	{
		name        : 'incidentType',
		label       : t('incidentManagement:select_incident_type'),
		type        : 'select',
		placeholder : t('incidentManagement:select_incident_type'),
		isClearable : true,
		span        : 6,
		onChange    : () => {
			setValue('incidentSubtype', null);
		},
		options: [
			{ value: 'TDS_APPROVAL', label: t('incidentManagement:tds_deviation') },
			{ value: 'BANK_DETAIL_APPROVAL', label: t('incidentManagement:bank_acc_add_edit') },
			{ value: 'SETTLEMENT_APPROVAL', label: t('incidentManagement:settlement_label') },
			{ value: 'JOURNAL_VOUCHER_APPROVAL', label: t('incidentManagement:journal_voucher_label') },
			{ value: 'ISSUE_CREDIT_NOTE', label: t('incidentManagement:credit_note_request') },
			{ value: 'SAAS', label: 'SAAS' },
			{
				value : 'CONSOLIDATED_CREDIT_NOTE',
				label : t('incidentManagement:consolidated_credit_note_request'),
			},
			{
				value : 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL',
				label : t('incidentManagement:inter_comp_jv_approval'),
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
			{
				value : 'JOB_OPEN_FINANCIALLY',
				label : 'JOB OPEN FINANCIALLY',
			},
			// todo :: add to translatin
		],
		rules: { required: t('incidentManagement:incident_type_required_message') },
	},
	{
		name        : 'incidentSubtype',
		label       : t('incidentManagement:incident_sub_type_label'),
		type        : 'asyncSelect',
		asyncKey    : 'list_incident_subtype',
		span        : 5.5,
		initialCall : true,
		placeholder : t('incidentManagement:incident_sub_type_label'),
		renderLabel : (item) => startCase(camelCase(item?.incidentSubtype)) || '',
		disabled    : isEmpty(incidentType),
		params      : { incidentType: incidentType || undefined },
		rules       : { required: t('incidentManagement:incident_sub_type_required_message') },
	},
	{
		name        : 'approvalType',
		label       : t('incidentManagement:approval_type_label'),
		placeholder : t('incidentManagement:approval_type_label'),
		span        : 6,
		type        : 'select',
		options     : [
			{
				label : t('incidentManagement:approval_type_multiple_label'),
				value : 'MULTIPLE',
			},
			{
				label : t('incidentManagement:approval_type_single_label'),
				value : 'SINGLE',
			},
		],
		rules: { required: t('incidentManagement:approval_type_required_message') },
	},
	{
		name        : 'entityCode',
		label       : t('incidentManagement:entity_code_title'),
		type        : 'asyncSelect',
		span        : 5.5,
		asyncKey    : 'list_cogo_entity',
		placeholder : t('incidentManagement:entity_label'),
		renderLabel : (item) => (`${item?.entity_code} - ${item?.business_name}`),
		initialCall : true,
		rules       : { required: t('incidentManagement:entity_code_required_message') },
	},
];
