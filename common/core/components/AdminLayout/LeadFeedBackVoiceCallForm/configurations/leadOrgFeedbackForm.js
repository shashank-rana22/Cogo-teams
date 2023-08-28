const LEAD_ORG_FEEDBACK = [
	{
		name        : 'feedback',
		label       : 'Select Feedback',
		placeholder : 'Select feedback',
		controlType : 'select',
		options     : [
			{
				label : 'Account has shut down',
				value : 'has_shut_down',
			},
			{
				label : 'Does not Import/Export anymore',
				value : 'does_not_do_import_export_anymore',
			},
			{
				label : 'Does not have requirements',
				value : 'does_not_have_requirements',
			},
			{
				label : 'Have requirements but at a particular time in future',
				value : 'have_requirements_at_a_particular_time_in_the_future',
			},
			{
				label : 'Will never do business with Cogoport',
				value : 'will_never_do_business_with_cogoport',
			},
			{
				label : 'Needs Credit to do business',
				value : 'needs_credit_to_do_business',
			},
			{
				label : 'Is Freight Forwarder',
				value : 'is_freight_forwarder',
			},
			{
				label : 'Other',
				value : 'other',
			},
		],
		width : '100%',
		rules : { required: 'This is Required' },
	},
	{
		name        : 'feedback_reference_document_url',
		controlType : 'fileUpload',
		width       : '100%',
		label       : 'Feedback Reference Document',
		// eslint-disable-next-line max-len
		accept      : 'image/*,.pdf,.csv,.xlsx,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	},
	{
		name        : 'other_feedback',
		label       : 'Feedback',
		placeholder : 'Type here...',
		controlType : 'textarea',
		rows        : 5,
		width       : '100%',
	},
];

export default LEAD_ORG_FEEDBACK;
