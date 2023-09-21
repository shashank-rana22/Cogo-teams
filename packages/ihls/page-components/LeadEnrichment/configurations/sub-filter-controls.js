const sub_controls = 	{
	general: {
		title  : 'General Filters',
		fields : [
			{
				name        : 'segment',
				displayName : 'Segment',
				type        : 'multiSelect',
				placeholder : 'Select',
				options     : [
					{ label: 'Enterprise', value: 'enterprise' },
					{ label: 'Mid Size', value: 'mid_size' },
					{ label: 'Long Tail', value: 'long_tail' },
				],
			},
			{
				name        : 'registration_type',
				displayName : 'Company Type',
				type        : 'multiSelect',
				placeholder : 'Select',
				options     : [
					{ label: 'Company', value: 'C' },
					{ label: 'LLP', value: 'F' },
					{ label: 'Proprietorship', value: 'P' },
				],
			},
			{
				name        : 'platform_lifecycle_stage',
				displayName : 'Lifecycle Stage',
				type        : 'multiSelect',
				placeholder : 'Select',
				options     : [
					{ label: 'Enriched', value: 'enriched' },
					{ label: 'KYC Verified', value: 'kyc_verified' },
					{ label: 'Marketing Qualified', value: 'marketing_qualified' },
					{ label: 'Sales Qualified', value: 'sales_qualified' },
					{ label: 'Transacting', value: 'transacting' },
				],
			},
			{
				name        : 'is_channel_partner',
				displayName : 'Channel Partner',
				type        : 'select',
				placeholder : 'Select',
				options     : [
					{ label: 'True', value: 'true' },
					{ label: 'False', value: 'false' },
				],
			},
			{
				name        : 'min_lead_score',
				displayName : 'Min Lead Score',
				placeholder : 'Enter number',
				type        : 'number',
			},
			{
				name        : 'shipment_count',
				displayName : 'Shipment count',
				placeholder : 'Enter number',
				type        : 'number',
			},
			{
				name        : 'is_user_enriched',
				displayName : 'Org Enrichment Status',
				type        : 'select',
				placeholder : 'Select',
				options     : [
					{ label: 'Enriched', value: 'true' },
					{ label: 'Not Enriched', value: 'false' },
				],
			},
		],
	},
	user_filters: {
		title  : 'User Filters',
		fields : [
			{
				name        : 'is_mobile_present',
				displayName : 'Mobile present',
				type        : 'select',
				placeholder : 'Select',
				options     : [
					{ label: 'Present', value: 'true' },
					{ label: 'Not present', value: 'false' },
				],
			},
			{
				name        : 'is_email_present',
				displayName : 'Email present',
				type        : 'select',
				placeholder : 'Select',
				options     : [
					{ label: 'Present', value: 'true' },
					{ label: 'Not present', value: 'false' },
				],
			},
			{
				name        : 'is_mobile_bounce_check',
				displayName : 'Mobile Bounce Check',
				type        : 'multiSelect',
				placeholder : 'Select',
				options     : [
					{ label: 'True', value: 'true' },
					{ label: 'False', value: 'false' },
					{ label: 'Not done', value: 'null' },
				],
			},
			{
				name        : 'is_email_bounce_check',
				displayName : 'Email Bounce Check',
				type        : 'multiSelect',
				placeholder : 'Select',
				options     : [
					{ label: 'True', value: 'true' },
					{ label: 'False', value: 'false' },
					{ label: 'Not done', value: 'null' },
				],
			},
			{
				name        : 'is_mobile_verified',
				displayName : 'Mobile Verified',
				type        : 'multiSelect',
				placeholder : 'Select',
				options     : [
					{ label: 'True', value: 'true' },
					{ label: 'False', value: 'false' },
					{ label: 'Not done', value: 'null' },
				],
			},
			{
				name        : 'is_email_verified',
				displayName : 'Email Verified',
				type        : 'multiSelect',
				placeholder : 'Select',
				options     : [
					{ label: 'True', value: 'true' },
					{ label: 'False', value: 'false' },
					{ label: 'Not done', value: 'null' },
				],
			},
			{
				name        : 'contact_count',
				displayName : 'Contact count',
				placeholder : 'Enter number',
				type        : 'number',
			},
		],
	},
};
export default sub_controls;
