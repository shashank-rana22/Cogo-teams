export const controlsFeedbacks = (
	cogoEntityOptions,
	organizationOptions,
	leadOrganizationOptions,
	kamOptions,
	kamManagerOptions,
	t = () => {},
) => [
	{
		...cogoEntityOptions,
		name        : 'agent_partner_id',
		placeholder : t('allocation:agent_partner_id_placeholder'),
		type        : 'select',
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...organizationOptions,
		name        : 'organization_id',
		placeholder : t('allocation:organization_id_placeholder'),
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...leadOrganizationOptions,
		name        : 'lead_organization_id',
		placeholder : t('allocation:lead_organization_id_placeholder'),
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...kamManagerOptions,
		name        : 'manager_id',
		placeholder : t('allocation:manager_id_placeholder'),
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...kamOptions,
		name        : 'performed_by_id',
		placeholder : t('allocation:performed_by_id_placeholder'),
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		name        : 'feedback_parameter',
		placeholder : t('allocation:feedback_parameter_placeholder'),
		isClearable : true,
		options     : [
			{
				label : 'Account',
				value : 'account',
			},
			{
				label : 'Mobile Number',
				value : 'mobile_number',
			},
			{
				label : 'Email',
				value : 'email',
			},
			{
				label : 'Mobile Country Code',
				value : 'mobile_country_code',
			},
			{
				label : 'Address',
				value : 'address',
			},
			{
				label : 'Country',
				value : 'country',
			},
			{
				label : 'Pincode',
				value : 'pincode',
			},
			{
				label : 'City',
				value : 'city',
			},
			{
				label : 'Alternate Email',
				value : 'alternate_email',
			},

			{
				label : 'Whatsapp Number',
				value : 'whatsapp_number',
			},
			{
				label : 'Whatsapp Country Code',
				value : 'whatsapp_country_code',
			},
			{
				label : 'Alternate Mobile Number',
				value : 'alternate_mobile_number',
			},
			{
				label : 'Work Scopes',
				value : 'work_scopes',
			},
			{
				label : 'State',
				value : 'state',
			},
			{
				label : 'Gstin',
				value : 'gstin',
			},
			{
				label : 'Document Type',
				value : 'document_type',
			},
			{
				label : 'Document',
				value : 'document',
			},
		],

	},
	{
		name        : 'feedback',
		placeholder : t('allocation:feedback_placeholder'),
		isClearable : true,
		options     :	[
			{
				label : 'Has Bounced',
				value : 'has_bounced',
			},
			{
				label : 'Does Not Belong To This User',
				value : 'does_not_belong_to_this_user',
			},
			{
				label : 'Belongs To User Who Has Left Company',
				value : 'belongs_to_user_who_has_left_company',
			},
			{
				label : 'Is Invalid',
				value : 'is_invalid',
			},
			{
				label : 'Does Not Exist',
				value : 'does_not_exist',
			},
			{
				label : 'Has Not Been Picked Up For 1 Week Continuously',
				value : 'has_not_been_picked_up_for_1_week_continuously',
			},
			{
				label : 'Has Been Busy For 1 Week Continuously',
				value : 'has_been_busy_for_1_week_continuously',
			},
			{
				label : 'Is Incorrect',
				value : 'is_incorrect',
			},
			{
				label : 'Has Shut Down',
				value : 'has_shut_down',
			},
			{
				label : 'Does Not Do Import Export Anymore',
				value : 'does_not_do_import_export_anymore',
			},
			{
				label : 'Does Not Have Requirements',
				value : 'does_not_have_requirements',
			},
			{
				label : 'Have Requirements At A Particular Time In The Future',
				value : 'have_requirements_at_a_particular_time_in_the_future',
			},
			{
				label : 'Will Never Do Business With Cogoport',
				value : 'will_never_do_business_with_cogoport',
			},
			{
				label : 'Needs Credit To Do Business',
				value : 'needs_credit_to_do_business',
			},
			{
				label : 'Other',
				value : 'other',
			},
			{
				label : 'Is Freight Forwarder',
				value : 'is_freight_forwarder',
			},
			{
				label : 'Enrichment',
				value : 'enrichment',
			},
			{
				label : 'Is Importer Exporter',
				value : 'is_importer_exporter',
			},
			{
				label : 'User Used To Work In The Company But Does Not Work In The Company Anymore',
				value : 'user_used_to_work_in_the_company_but_does_not_work_in_the_company_anymore',
			},
			{
				label : 'User Does Not Belong To The Company',
				value : 'user_does_not_belong_to_the_company',
			},
			{
				label : 'User Belongs To A Designation Not Listed In The Dropdown',
				value : 'user_belongs_to_a_designation_not_listed_in_the_dropdown',
			},
		],

	},
	{
		name        : 'is_valid_feedback',
		placeholder : t('allocation:validity_status_placeholder'),
		isClearable : true,
		options     : [{
			label : 'Valid',
			value : 'true',
		},
		{
			label : 'Invalid',
			value : 'false',
		},
		],
	},
];

export const controlsRequests = (organizationOptions, leadOrganizationOptions, t = () => {}) => [
	{
		...organizationOptions,
		name        : 'organization_id',
		placeholder : t('allocation:organization_id_placeholder'),
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
	{
		...leadOrganizationOptions,
		name        : 'lead_organization_id',
		placeholder : t('allocation:lead_organization_id_placeholder'),
		isClearable : true,
		params      : { filters: { status: 'active' } },
	},
];
