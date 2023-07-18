const controls = [
	{
		name        : 'incidentType',
		type        : 'select',
		placeholder : 'Select Incident Type',
		isClearable : true,
		span        : 2,
		options     : [
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
		],
		rules: { required: 'Incident Type is required' },
	},
	{
		name        : 'incidentSubtype',
		type        : 'asyncSelect',
		asyncKey    : 'list_incident_subtype',
		isClearable : true,
		span        : 2,
		initialCall : true,
		style       : { width: '200px', marginLeft: '8px' },
		placeholder : 'Incident Subtype',
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
		placeholder : 'Entity',
	},
	{
		name        : 'level',
		type        : 'select',
		asyncKey    : 'list_cogo_entity',
		isClearable : true,
		options     : [
			{ label: 'Level 1', value: 1 },
			{ label: 'Level 2', value: 2 },
			{ label: 'Level 3', value: 3 },
		],
		span        : 2,
		style       : { marginLeft: '8px' },
		placeholder : 'Level',
	},
];

export default controls;
