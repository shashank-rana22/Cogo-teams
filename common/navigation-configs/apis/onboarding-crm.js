const onboarding_crm = [
	{
		api          : 'update_channel_partner',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'get_channel_partner_users',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'list_organization_communication_logs',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_communication_log',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_channel_partner_stakeholders',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'update_channel_partner_stakeholder',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'list_organization_notes',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_note',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_user_invitation',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization_user_invitation',
		access_type  : 'private',
		service_name : 'organization',
	},

	{
		api          : 'update_partner_user_invitation',
		access_type  : 'private',
		service_name : 'partner',
	},

	{
		api          : 'get_organization',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'get_organization_trade_stat',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization_trade_stat',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_addresses',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_billing_addresses',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_trade_contacts',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'list_organizations',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_address',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_billing_address',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization_billing_address',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_trade_contact',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'update_organization',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_partner',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'list_organization_user_access_requests',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_partner_user_access_requests',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'get_channel_partner_documents',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'list_channel_partners',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'get_channel_partner',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'get_channel_partner_verification',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'get_channel_partner_documents',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'update_channel_partner_document',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'verify_channel_partner_kyc',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'verify_organization_kyc',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'onboard_organization',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'send_organization_user_welcome_email',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'submit_organization_kyc',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_documents',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_audits',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_document',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_user',
		access_type  : 'private',
		service_name : 'user',
	},
	{
		api          : 'list_organization_users',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_partner_users',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'list_partners',
		access_type  : 'private',
		service_name : 'partner',
	},
	{
		api          : 'list_organization_approvals',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_outgoing_call',
		access_type  : 'private',
		service_name : 'voice_call',
	},
	{
		api          : 'hang_up_outgoing_call',
		access_type  : 'private',
		service_name : 'voice_call',
	},
	{
		api          : 'check_outgoing_call_status',
		access_type  : 'private',
		service_name : 'voice_call',
	},
	{
		api          : 'list_call_history',
		access_type  : 'private',
		service_name : 'voice_call',
	},
	{
		api          : 'create_voice_call_communication_logs',
		access_type  : 'private',
		service_name : 'voice_call',
	},
	{
		api          : 'list_organization_communication_logs_by_view',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'get_organization_communication_reminder_stats',
		access_type  : 'private',
		service_name : 'organization',
	},
];

export default onboarding_crm;
