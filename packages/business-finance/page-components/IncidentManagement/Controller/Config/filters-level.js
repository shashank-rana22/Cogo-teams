import { camelCase, startCase } from '@cogoport/utils';

const getControls = (t = () => {}) => [
	{
		name        : 'incidentType',
		type        : 'select',
		placeholder : t('incidentManagement:select_incident_type'),
		isClearable : true,
		span        : 2,
		options     : [
			{ value: 'TDS_APPROVAL', label: t('incidentManagement:tds_deviation') },
			{ value: 'BANK_DETAIL_APPROVAL', label: t('incidentManagement:bank_acc_add_edit') },
			{ value: 'SETTLEMENT_APPROVAL', label: t('incidentManagement:settlement_label') },
			{ value: 'JOURNAL_VOUCHER_APPROVAL', label: t('incidentManagement:journal_voucher_label') },
			{ value: 'ISSUE_CREDIT_NOTE', label: t('incidentManagement:credit_note_request') },
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
		type        : 'asyncSelect',
		asyncKey    : 'list_incident_subtype',
		isClearable : true,
		span        : 2,
		initialCall : true,
		renderLabel : (item) => startCase(camelCase(item?.incidentType)) || '',
		style       : { width: '200px', marginLeft: '8px' },
		placeholder : t('incidentManagement:incident_sub_type_label'),
	},
	{
		name        : 'entityCode',
		type        : 'asyncSelect',
		asyncKey    : 'list_cogo_entity',
		isClearable : true,
		span        : 2,
		initialCall : true,
		renderLabel : (item) => (`${item?.entity_code} - ${item?.business_name}`),
		style       : { width: '200px', marginLeft: '8px' },
		placeholder : t('incidentManagement:entity_label'),
	},
	{
		name        : 'level',
		type        : 'select',
		isClearable : true,
		options     : [
			{ label: t('incidentManagement:level_1'), value: 1 },
			{ label: t('incidentManagement:level_2'), value: 2 },
			{ label: t('incidentManagement:level_3'), value: 3 },
		],
		span        : 2,
		style       : { marginLeft: '8px' },
		placeholder : t('incidentManagement:levels_label'),
	},
];

export default getControls;
