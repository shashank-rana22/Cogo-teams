const partner = {
	cms: [
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_auth_roles',
			access_type  : 'private',
			service_name : 'auth',
		},
	],
	prm: [
		{
			api          : 'get_tax_numbers_data',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'get_bank_details',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'check_organization_access_request_eligibility',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api         : 'generate_mobile_verification_link',
			access_type : 'private',
		},
		{
			api         : 'send_mobile_verification_email',
			access_type : 'private',
		},
		{
			api          : 'update_organization_trade_party',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'post_allocation_request',
			access_type  : 'private',
			feature      : 'allocation',
			service_name : 'allocation',
		},
		{
			api          : 'get_organization_advanced_verification',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_advanced_verification',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_channel_partners',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_channel_partner_user_status',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_lead_channel_partners',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_channel_partner_bucket_stats',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_channel_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_channel_partner_lifecycle_stats',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'onboard_channel_partner_user',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_lead_organization_users',
			access_type  : 'private',
			service_name : 'lead',
		},
		{
			api          : 'get_channel_partner',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_channel_partner_stats',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_channel_partner_billing_addresses',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_channel_partner_billing_address',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_channel_partner_billing_address',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_channel_partner_addresses',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_channel_partner_address',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_channel_partner_address',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_channel_partner_documents',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_channel_partner_document',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_channel_partner_verification',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_channel_partner_organization',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'submit_channel_partner_kyc',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_channel_partner_user',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_partner_user_invitation',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'resend_channel_partner_user_verification_email',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'verify_channel_partner_user_mobile',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_channel_partner_verification',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_channel_partner_organization',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_fcl_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'list_cogo_assured_rate_feedbacks',
			access_type  : 'private',
			service_name : 'cogo_assured_rate',
		},
		{
			api          : 'list_lcl_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'lcl_freight_rate',
		},
		{
			api          : 'list_air_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'list_store_quota',
			access_type  : 'private',
			service_name : 'store',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_partner_user_invitations',
			access_type  : 'private',
			service_name : 'partner',
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
			api          : 'update_partner',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_channel_partner',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'onboard_channel_partner',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_channel_partner',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_channel_partner_bank_details',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_channel_partner_bank_details',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_business',
			access_type  : 'private',
			service_name : 'business',
		},
		{
			api          : 'update_user_password',
			access_type  : 'private',
			service_name : 'user',
		},
		{
			api          : 'validate_channel_partner_registration_number',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_cogoscore_tax_numbers',
			access_type  : 'private',
			service_name : 'business',
		},
		{
			api          : 'update_channel_partner_buy_services',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_channel_partner_sell_services',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_organization_trade_service_mapping_status',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_channel_partner_buy_services',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_channel_partner_sell_services',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_organization_service',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_organization_services',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_note',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_communication_logs',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_notes',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_communication_log',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_servetel_communication_log',
			access_type  : 'private',
			service_name : 'voice_call',
		},
		{
			api          : 'list_organization_billing_addresses',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'trade_party',
		},
		{
			api          : 'create_organization_billing_address',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'trade_party',
		},
		{
			api          : 'update_organization_billing_address',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'trade_party',
		},
		{
			api          : 'list_organization_addresses',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'trade_party',
		},
		{
			api          : 'create_organization_address',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'trade_party',
		},
		{
			api          : 'update_organization_address',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'trade_party',
		},
		{
			api          : 'list_organization_trade_parties',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'trade_party',
		},
		{
			api          : 'create_organization_trade_party',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'trade_party',
		},
		{
			api          : 'update_organization_trade_party_detail',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'trade_party',
		},
		{
			api          : 'update_organization_poc',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'trade_party',
		},
		{
			api          : 'create_shipment_report',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'assign_partner_agents_with_filters',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'assign_lead_agents_with_filters',
			access_type  : 'private',
			service_name : 'lead',
		},
		{
			api          : 'list_organization_documents',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'trade_party',
		},
		{
			api          : 'create_organization_document',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'trade_party',
		},
		{
			api          : 'update_organization_document',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'trade_party',
		},
		{
			api          : 'get_cogoscore_tax_numbers',
			access_type  : 'private',
			service_name : 'business',
		},
		{
			api          : 'get_business',
			access_type  : 'private',
			service_name : 'business',
		},
		{
			api          : 'get_profile_completion_sectional_progress',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'convert_channel_partner_to_importer_exporter',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'mark_user_as_verified',
			access_type  : 'private',
			service_name : 'user',
		},
		{
			api          : 'list_sage_ar_outstandings',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_sage_ar_invoices',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_invoice_details',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_organization_communication_reminder_stats',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_air_freight_incoterms',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			api          : 'list_organization_billing_cycles',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_payment_modes',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_billing_cycle',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_billing_cycle',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_payment_mode',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_payment_mode',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_stakeholders',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_stakeholder',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_user_invitations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_settings',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_partner_user_allocations',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_allocation_requests',
			access_type  : 'private',
			service_name : 'allocation',
		},
		{
			api          : 'create_organization_setting',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'check_organization_user_invitation_eligibility',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_channel_partner_persona',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_organization_exchange_rate_approval',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_approvals',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'send_verification_otp',
			access_type  : 'private',
			service_name : 'user',
		},
		{
			api          : 'verify_otp',
			access_type  : 'private',
			service_name : 'user',
		},
		{
			api          : 'saas_get_user_active_plan',
			access_type  : 'private',
			service_name : 'saas_subscriptions_v2',
		},
		{
			api          : 'post_allocation_feedback',
			access_type  : 'private',
			service_name : 'allocation',
		},
		{
			api          : 'get_allocation_feedbacks',
			access_type  : 'private',
			service_name : 'allocation',
		},
	],
	terms_and_conditons: [
		{
			api          : 'list_terms_and_conditions',
			access_type  : 'private',
			feature      : 'terms_and_conditions',
			service_name : 'terms_and_condition',
		},
		{
			api          : 'create_terms_and_condition',
			access_type  : 'private',
			feature      : 'terms_and_conditions',
			service_name : 'terms_and_condition',
		},
		{
			api          : 'get_terms_and_condition',
			access_type  : 'private',
			feature      : 'terms_and_conditions',
			service_name : 'terms_and_condition',
		},
		{
			api          : 'update_terms_and_condition',
			access_type  : 'private',
			feature      : 'terms_and_conditions',
			service_name : 'terms_and_condition',
		},
		{
			api          : 'validate_terms_and_condition',
			access_type  : 'private',
			feature      : 'terms_and_conditions',
			service_name : 'terms_and_condition',
		},
	],
	roles_permissions: [
		{
			api          : 'create_auth_role',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'list_partners',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_auth_possible_permissions',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'list_auth_roles',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'onboard_auth_role',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'update_auth_role',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'update_auth_role_permission_mapping',
			access_type  : 'private',
			service_name : 'auth',
		},
	],
	partner_application: [
		{
			api          : 'list_partner_applications',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_partner_application',
			access_type  : 'private',
			service_name : 'partner',
		},
	],
	partner: [
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_partners',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_partner',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'onboard_partner',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_partner',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'onboard_partner',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_auth_roles',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
	],
	user: [
		{
			api          : 'list_location_clusters',
			access_type  : 'private',
			service_name : 'location',
		},
		{
			api          : 'list_partner_user_settings',
			access_type  : 'public',
			service_name : 'partner',
		},
		{
			api          : 'create_partner_user_setting',
			access_type  : 'public',
			service_name : 'partner',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_user',
			access_type  : 'private',
			service_name : 'user',
		},
		{
			api          : 'update_user',
			access_type  : 'private',
			service_name : 'user',
		},
		{
			api          : 'list_partner_user_expertises',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_partner_user',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_partner_user_expertise',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_partners',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_auth_roles',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'get_partner',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'invite_email_partner_user',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_partner_user_expertise',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_partner_user_rm_mapping',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_organization_branches',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_partner_user',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_partner_user_stats',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_partner_user_status',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_user_password',
			access_type  : 'private',
			service_name : 'user',
		},
		{
			api          : 'update_partner_user_expertise_status',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_partner_user_block_access',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'transfer_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_partner_user',
			access_type  : 'private',
			service_name : 'partner',
		},
	],
	user_allocation: [
		{
			api          : 'list_partner_user_allocations',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_partner_user_allocation',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_partners',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_partner_user_allocation_status',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'bulk_approve_partner_user_allocation',
			access_type  : 'private',
			service_name : 'partner',
		},
	],
	business: [
		{
			api          : 'list_business_entities',
			access_type  : 'private',
			service_name : 'business',
		},
		{
			api          : 'create_business_entity',
			access_type  : 'private',
			service_name : 'business',
		},
		{
			api          : 'update_business_entity',
			access_type  : 'private',
			service_name : 'business',
		},
	],
	demand_crm: [
		{
			api          : 'create_event',
			access_type  : 'private',
			service_name : 'event',
		},
		{
			api          : 'get_tax_numbers_data',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'get_bank_details',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'check_organization_access_request_eligibility',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_organization_commodity_segmentation_stats',
			access_type  : 'parivate',
			service_name : 'organization',
		},
		{
			api          : 'get_lead_organization_commodity_segmentation_stats',
			access_type  : 'private',
			service_name : 'lead',
		},
		{
			api          : 'get_organization_commodity_trade_port_pairs',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_lead_organization_commodity_trade_port_pairs',
			access_type  : 'private',
			service_name : 'lead',
		},
		{
			api         : 'list_lead_contacts',
			access_type : 'private',
		},
		{
			api          : 'list_contracts',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'contract',
		},
		{
			api          : 'get_domestic_contract',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'contract',
		},
		{
			api          : 'generate_contract_reference_id',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'contract',
		},
		{
			api          : 'create_contract',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'contract',
		},
		{
			api         : 'list_contracted_organizations',
			access_type : 'private',
			feature     : 'demand_crm',
		},
		{
			api          : 'get_organization_segment_trade_information',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_lead_organization_segment_trade_information',
			access_type  : 'private',
			service_name : 'lead',
		},
		{
			api          : 'get_organization_communication_log_info',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_organizations_communication_log_stats',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_organizations_segmentation_stats',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_lead_organizations_segmentation_stats',
			access_type  : 'private',
			service_name : 'lead',
		},
		{
			api          : 'get_organization_wallet_share_stats',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_stakeholders',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_stakeholder',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'post_allocation_request',
			access_type  : 'private',
			feature      : 'allocation',
			service_name : 'allocation',
		},
		{
			api          : 'list_organization_billing_cycles',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_trade_party',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_trade_parties',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_billing_cycle',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_payment_modes',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_payment_mode',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_payment_mode',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_billing_cycle',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'convert_importer_exporter_to_channel_partner',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_organization_advanced_verification',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_advanced_verification',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_shipment_report_schedule',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'shipment',
		},
		{
			feature      : 'demand_crm',
			api          : 'list_organization_trade_parties',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_shipment_report_schedule',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'shipment',
		},
		{
			api          : 'create_organization_trade_party',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_trade_party_detail',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_poc',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},

		{
			api          : 'create_shipment_report',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'shipment',
		},
		{
			api          : 'get_organizations_trade_port_pairs',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'get_lead_organizations_trade_port_pairs',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'lead',
		},
		{
			api          : 'get_trade_information_on_port_pair',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'get_lead_trade_information_on_port_pair',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'lead',
		},
		{
			api          : 'get_organization_trade_intelligence',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'get_lead_organization_trade_intelligence',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'lead',
		},
		{
			api          : 'get_lead_organization_country_shipment_stats',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'lead',
		},
		{
			api          : 'get_organization_country_shipment_stats',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'get_organization',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'get_business',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'business',
		},
		{
			api          : 'get_cogoscore_tax_numbers',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'business',
		},

		{
			api          : 'get_shipment_alert_stats',
			access_type  : 'private',
			feature      : 'credit',
			service_name : 'shipment',
		},
		{
			api          : 'list_shipments',
			access_type  : 'private',
			feature      : 'shipment',
			service_name : 'shipment',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'list_partners',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'partner',
		},
		{
			feature     : 'supply_crm',
			api         : 'list_partners',
			access_type : 'private',
		},
		{
			api          : 'list_organization_addresses',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_billing_addresses',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},

		{
			api          : 'list_organization_documents',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_audits',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'list_credit_requests',
			access_type  : 'private',
			feature      : 'credit',
			service_name : 'credit',
		},
		{
			api          : 'list_credit_allocations',
			access_type  : 'private',
			feature      : 'credit',
			service_name : 'credit',
		},
		{
			api          : 'list_trade_contacts',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'trade',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'list_spot_searches',
			access_type  : 'private',
			feature      : 'search',
			service_name : 'spot_search',
		},
		{
			api          : 'list_fcl_freight_rates',
			access_type  : 'private',
			feature      : 'rms',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'list_lcl_freight_rates',
			access_type  : 'private',
			feature      : 'rms',
			service_name : 'lcl_freight_rate',
		},
		{
			api          : 'list_air_freight_rates',
			access_type  : 'private',
			feature      : 'rms',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'list_ftl_freight_rates',
			access_type  : 'private',
			feature      : 'rms',
			service_name : 'ftl_freight_rate',
		},
		{
			api          : 'list_ltl_freight_rates',
			access_type  : 'private',
			feature      : 'rms',
			service_name : 'ltl_freight_rate',
		},
		{
			api          : 'list_haulage_freight_rates',
			access_type  : 'private',
			feature      : 'rms',
			service_name : 'haulage_freight_rate',
		},
		{
			api          : 'list_fcl_customs_rates',
			access_type  : 'private',
			feature      : 'rms',
			service_name : 'fcl_customs_rate',
		},
		{
			api          : 'list_lcl_customs_rates',
			access_type  : 'private',
			feature      : 'rms',
			service_name : 'lcl_customs_rate',
		},
		{
			api          : 'list_air_customs_rates',
			access_type  : 'private',
			feature      : 'rms',
			service_name : 'air_customs_rate',
		},
		{
			api          : 'list_fcl_cfs_rates',
			access_type  : 'private',
			feature      : 'rms',
			service_name : 'fcl_cfs_rate',
		},
		{
			api          : 'create_organization_address',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_billing_address',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'bulk_create_organization_document',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'list_forecasts',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'forecast',
		},
		{
			api          : 'create_forecast',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'forecast',
		},
		{
			api          : 'create_organization_document',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_document',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'create_trade_contact',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'trade',
		},
		{
			api          : 'create_organization_bulk_operation_sheet',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'update_organization',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_address',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'update_organizations',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'onboard_organization',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'send_organization_user_welcome_email',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'get_organization_services',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'submit_organization_kyc',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'get_partner',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_organization_billing_address',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_user',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'check_duplicate_organization',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'check_organization_user_invitation_eligibility',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'migrate_organization_to_partner',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_cogo_entities',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_checkouts',
			access_type  : 'private',
			service_name : 'checkout',
		},
		{
			api          : 'list_organization_line_item_aliases',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_line_item_alias',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_rate_charge_codes',
			access_type  : 'private',
			service_name : 'rate_sheet',
		},
		{
			api          : 'create_organization_note',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_notes',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'get_organization_stats',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_communication_logs',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_communication_logs_by_view',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_communication_log',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'get_organization_branch',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_branch',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_user_branch',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_billing_address_branch',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_address_branch',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_branches',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_branch',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'assign_agents_with_filters',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'get_organization_buckets_stats',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_user_access_requests',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_user_invitation',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_user_invitation',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			api          : 'update_partner',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'partner',
		},
		{
			api          : 'remove_organization_stakeholder',
			access_type  : 'private',
			feature      : 'demand_crm',
			service_name : 'organization',
		},
		{
			feature      : 'demand_crm',
			api          : 'update_organization_finance_detail',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api         : 'create_feedback',
			access_type : 'private',
			feature     : 'feedback',
		},
		{
			api         : 'get_organization_communication_reminder_stats',
			access_type : 'private',
			feature     : 'organization',
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
			api          : 'relation',
			access_type  : 'private',
			feature      : 'allocation',
			service_name : 'allocation',
		},
		{
			api          : 'create_organization_exchange_rate_approval',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_approvals',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'mark_user_as_verified',
			access_type  : 'private',
			service_name : 'user',
		},
		{
			api          : 'send_verification_otp',
			access_type  : 'private',
			service_name : 'user',
		},
		{
			api          : 'verify_otp',
			access_type  : 'private',
			service_name : 'user',
		},
		{
			api          : 'create_servetel_communication_log',
			access_type  : 'private',
			service_name : 'voice_call',
		},
		{
			api          : 'create_event',
			access_type  : 'private',
			service_name : 'event',
		},
		{
			api          : 'saas_get_user_active_plan',
			access_type  : 'private',
			service_name : 'saas_subscriptions_v2',
		},
		{
			api          : 'post_allocation_feedback',
			access_type  : 'private',
			service_name : 'allocation',
		},
		{
			api          : 'get_allocation_feedbacks',
			access_type  : 'private',
			service_name : 'allocation',
		},
		{
			api          : 'create_event',
			access_type  : 'private',
			service_name : 'event',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_allocation_requests',
			access_type  : 'private',
			service_name : 'allocation',
		},
	],
	supply_crm: [
		{
			feature      : 'supply_crm',
			api          : 'list_organization_service_expertises',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_bank_details',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'onboard_channel_partner_user',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_channel_partner_user_status',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_organization_user',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'post_allocation_request',
			access_type  : 'private',
			feature      : 'allocation',
			service_name : 'allocation',
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
			api          : 'create_channel_partner_document',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'submit_channel_partner_kyc',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_partner_user_invitations',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_organization_stakeholders',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_stakeholder',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_partner_user_invitation',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_channel_partner_user',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_channel_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'resend_channel_partner_user_verification_email',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'verify_channel_partner_user_mobile',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_channel_partner_documents',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_channel_partner_bank_details',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_channel_partner_billing_address',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_channel_partner_organization',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_organization_advanced_verification',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_advanced_verification',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'check_organization_access_request_eligibility',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'get_service_provider_lifecycle_stats',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'get_organization',
			access_type  : 'private',
			service_name : 'organization',
		},

		{
			feature      : 'supply_crm',
			api          : 'get_business',
			access_type  : 'private',
			service_name : 'business',
		},
		{
			api          : 'get_cogoscore_tax_numbers',
			access_type  : 'private',
			feature      : 'supply_crm',
			service_name : 'business',
		},
		{
			feature      : 'supply_crm',
			api          : 'list_organization_trade_parties',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'check_duplicate_organization',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'get_shipment_alert_stats',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			feature      : 'supply_crm',
			api          : 'get_organization_services',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'list_shipment_services',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			feature      : 'supply_crm',
			api          : 'list_shipments',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			feature      : 'supply_crm',
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'list_partners',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			feature      : 'supply_crm',
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			feature      : 'supply_crm',
			api          : 'list_organization_addresses',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'list_organization_billing_addresses',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'list_organization_documents',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_trade_party',
			access_type  : 'private',
			feature      : 'supply_crm',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_poc',
			access_type  : 'private',
			feature      : 'supply_crm',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'list_organization_audits',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'list_credit_requests',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			feature      : 'supply_crm',
			api          : 'list_credit_allocations',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			feature      : 'supply_crm',
			api          : 'list_trade_contacts',
			access_type  : 'private',
			service_name : 'trade',
		},
		{
			feature      : 'supply_crm',
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_lead_lifecycle_stats',
			access_type  : 'private',
			service_name : 'lead',
		},
		{
			api          : 'list_lead_organizations',
			access_type  : 'private',
			service_name : 'lead',
		},
		{
			feature      : 'supply_crm',
			api          : 'list_spot_negotiations',
			access_type  : 'private',
			service_name : 'spot_negotiation',
		},
		{
			feature      : 'supply_crm',
			api          : 'create_organization_address',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'create_organization_billing_address',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'create_organization_document',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'update_organization_document',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_organization_trade_party_finance_detail',
			access_type  : 'private',
			feature      : 'supply_crm',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'update_organization_trade_party_detail',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_trade_party',
			access_type  : 'private',
			feature      : 'supply_crm',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'create_trade_contact',
			access_type  : 'private',
			service_name : 'trade',
		},
		{
			feature      : 'supply_crm',
			api          : 'get_service_provider_stats',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'create_organization_bulk_operation_sheet',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'update_organization',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'update_organization_finance_detail',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'create_organization_approval',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'update_organization_address',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'update_organization_service',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'update_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'onboard_organization',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'send_organization_user_welcome_email',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'get_organization_services',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'submit_organization_kyc',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'get_partner',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			feature      : 'supply_crm',
			api          : 'update_organization_billing_address',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_organization_branch',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_branch',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_user_branch',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_billing_address_branch',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_branches',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_branch',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_note',
			access_type  : 'private',
			feature      : 'supply_crm',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_notes',
			access_type  : 'private',
			feature      : 'supply_crm',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'create_organization_communication_log',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'list_organization_communication_logs',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'supply_crm',
			api          : 'update_organization_document',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'onboard_channel_partner',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_channel_partner',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_channel_partner_bank_details',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_channel_partner_bank_details',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_business',
			access_type  : 'private',
			service_name : 'business',
		},
		{
			api          : 'validate_channel_partner_registration_number',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_cogoscore_tax_numbers',
			access_type  : 'private',
			service_name : 'business',
		},
		{
			api          : 'update_channel_partner_buy_services',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_channel_partner_sell_services',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_organization_trade_service_mapping_status',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_channel_partner_buy_services',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_channel_partner_sell_services',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_organization_service',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_organization_services',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_channel_partner_addresses',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_channel_partner_address',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_channel_partner_address',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api         : 'generate_mobile_verification_link',
			access_type : 'private',
		},
		{
			api         : 'send_mobile_verification_email',
			access_type : 'private',
		},
		{
			api          : 'check_organization_user_invitation_eligibility',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_document_inventory_record',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'inventory_management',
		},
		{
			api          : 'list_organization_document_inventory',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'inventory_management',
		},
		{
			api          : 'update_organization_document_inventory',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'inventory_management',
		},
		{
			api          : 'update_organization_document_inventory_record',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'inventory_management',
		},
		{
			api          : 'list_organization_document_inventory_record',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'inventory_management',
		},
		{
			api          : 'create_channel_partner_persona',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_organization_branch_hierarchy',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'send_verification_otp',
			access_type  : 'private',
			service_name : 'user',
		},
		{
			api          : 'verify_otp',
			access_type  : 'private',
			service_name : 'user',
		},
		{
			api          : 'update_user',
			access_type  : 'private',
			service_name : 'user',
		},
	],
	support_crm: [
		{
			api          : 'get_organization',
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
			api          : 'update_organization',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'send_organization_user_welcome_email',
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
	],
	onboarding_crm: [
		{
			api          : 'get_bank_details',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_document',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_trade_parties',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'verify_organization_trade_party',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_trade_party_details',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_trade_party',
			access_type  : 'private',
			service_name : 'organization',
		},
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
			api          : 'create_servetel_communication_log',
			access_type  : 'private',
			service_name : 'voice_call',
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
		{
			api          : 'send_verification_otp',
			access_type  : 'private',
			service_name : 'user',
		},
		{
			api          : 'verify_otp',
			access_type  : 'private',
			service_name : 'user',
		},
		{
			api          : 'list_vendors',
			access_type  : 'private',
			service_name : 'vendor',
		},
		{
			api          : 'get_vendor',
			access_type  : 'private',
			service_name : 'vendor',
		},
		{
			api          : 'verify_vendor_kyc',
			access_type  : 'private',
			service_name : 'vendor',
		},
		{
			api          : 'update_vendor_document',
			access_type  : 'private',
			service_name : 'vendor',
		},
	],
	finance_crm: [
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_organization',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_user_invitations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_audits',
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
			api          : 'list_organization_documents',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_cogo_entities',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_partners',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_organization_trade_parties',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_trade_party_cogo_bank_details',
			access_type  : 'private',
			service_name : 'organization',
		},
	],
	finance: [
		{
			api          : 'create_partner_cogo_entity',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_cogo_entities',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_cogo_entity',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_cogo_entity_status',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_partner_cogo_entity',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_partner_bank_details',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_partner_bank_details',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_partner_addresses',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_partner_addresses',
			access_type  : 'private',
			service_name : 'partner',
		},
	],
	checkout_promotions: [
		{
			api          : 'list_checkout_applicable_promocodes',
			access_type  : 'private',
			feature      : 'search',
			service_name : 'checkout',
		},
		{
			api          : 'update_checkout_promotion',
			access_type  : 'private',
			service_name : 'checkout',
		},
	],
	business_dashboard: [
		{
			api          : 'list_profitability_sales_agent_wise',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_shipment_profitability_region_wise',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_profitability_supply_agent_wise',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_profitability_operation_agent_wise',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_sales_shipment_profitability',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_sales_shipment_profitability_customer_wise',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_shipment_profitability_port_pair_wise',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_shipment_supply_profit',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_supply_shipment_profitability_vendor_wise',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_company_wide_profitability',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_sales_net_profit',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_supply_shipment_profitability',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_shipments_customer_wise',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_partner_user',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_auth_roles',
			access_type  : 'private',
			service_name : 'auth',
		},
	],
	sales_dashboard: [
		{
			api          : 'list_fcl_freight_rate_requests',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_fcl_freight_rate_local_requests',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_lcl_freight_rate_requests',
			access_type  : 'private',
			service_name : 'lcl_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_air_customs_rate_requests',
			access_type  : 'private',
			service_name : 'air_customs_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_air_freight_rate_requests',
			access_type  : 'private',
			service_name : 'air_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_domestic_air_freight_rate_requests',
			access_type  : 'private',
			service_name : 'domestic_air_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_fcl_customs_rate_requests',
			access_type  : 'private',
			service_name : 'fcl_customs_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_ftl_freight_rate_requests',
			access_type  : 'private',
			service_name : 'ftl_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_haulage_freight_rate_requests',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_trailer_freight_rate_requests',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_lcl_customs_rate_requests',
			access_type  : 'private',
			service_name : 'lcl_customs_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_ltl_freight_rate_requests',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_fcl_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'rate_feedbacks',
		},
		{
			api          : 'list_lcl_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'lcl_freight_rate',
			feature      : 'rate_feedbacks',
		},
		{
			api          : 'list_air_customs_rate_feedbacks',
			access_type  : 'private',
			service_name : 'air_customs_rate',
			feature      : 'rate_feedbacks',
		},
		{
			api          : 'list_air_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'air_freight_rate',
			feature      : 'rate_feedbacks',
		},
		{
			api          : 'list_domestic_air_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'domestic_air_freight_rate',
			feature      : 'rate_feedbacks',
		},
		{
			api          : 'list_fcl_customs_rate_feedbacks',
			access_type  : 'private',
			service_name : 'fcl_customs_rate',
			feature      : 'rate_feedbacks',
		},
		{
			api          : 'list_ftl_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'ftl_freight_rate',
			feature      : 'rate_feedbacks',
		},
		{
			api          : 'list_haulage_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
			feature      : 'rate_feedbacks',
		},
		{
			api          : 'list_trailer_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
			feature      : 'rate_feedbacks',
		},
		{
			api          : 'list_lcl_customs_rate_feedbacks',
			access_type  : 'private',
			service_name : 'lcl_customs_rate',
			feature      : 'rate_feedbacks',
		},
		{
			api          : 'list_ltl_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
			feature      : 'rate_feedbacks',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_trade_requirement_drafts',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_trade_requirement_draft',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'onboard_organization_user',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_shipments',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_spot_searches',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			api          : 'list_margins',
			access_type  : 'private',
			service_name : 'margin',
		},
		{
			api          : 'create_spot_search',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			api          : 'update_organization_search_history',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_organization_search_history',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_checkouts',
			access_type  : 'private',
			service_name : 'checkout',
		},
		{
			api          : 'list_contracts',
			access_type  : 'private',
			service_name : 'contract',
		},
		{
			api          : 'create_organization_trade_party',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_invoicing_parties',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_billing_address',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_address',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api         : 'create_feedback',
			access_type : 'private',
			feature     : 'feedback',
		},
		{
			api          : 'send_trade_requirement_draft_confirmation_otp',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'verify_trade_requirement_draft_confirmation_otp',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_air_freight_incoterms',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			api          : 'get_kam_promotion_stats',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'create_kam_promotion',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'publish_kam_promotion',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'get_incentive_user_detail_stat',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'list_incentive_user_details',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'get_incentive_user_breakup',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'create_incentive_report',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'get_air_freight_incoterms',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			api          : 'create_spot_search_contract',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			api          : 'list_cogo_assured_rate_feedbacks',
			access_type  : 'private',
			service_name : 'cogo_assured_rate',
			feature      : 'rate_feedbacks',
		},
	],
	okam_dashboard: [
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_shipments',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_shipment_services',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'onboard_organization_user',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_checkout',
			access_type  : 'private',
			service_name : 'checkout',
		},
		{
			api          : 'get_shipments_stats',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_shipment_invoice_combinations',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_shipment_invoice_stats',
			access_type  : 'private',
			service_name : 'shipment',
		},
	],
	supply_dashboard: [
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_margins',
			access_type  : 'private',
			service_name : 'margin',
		},
		{
			api          : 'list_shipments',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_flash_booking_rate_stats',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'skip_shipment_flash_booking_rate',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'update_shipment_flash_booking_rate_time',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_spot_searches',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			api          : 'list_spot_negotiations',
			access_type  : 'private',
			service_name : 'spot_negotiation',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_supply_rankings',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'get_spot_negotiation',
			access_type  : 'private',
			service_name : 'spot_negotiation',
		},
		{
			api          : 'get_supply_rate_coverage_stats',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'get_performance_stats',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'get_supply_shipments_stats',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'get_supply_spot_search_stats',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'list_fcl_freight_rate_dislikes',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'list_lcl_freight_rate_dislikes',
			access_type  : 'private',
			service_name : 'lcl_freight_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'list_air_freight_rate_dislikes',
			access_type  : 'private',
			service_name : 'air_freight_rate',
			feature      : 'disliked_rates',
		},

		{
			api          : 'list_fcl_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'list_lcl_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'lcl_freight_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'list_air_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'air_freight_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'list_fcl_customs_rate_feedbacks',
			access_type  : 'private',
			service_name : 'fcl_customs_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'list_lcl_customs_rate_feedbacks',
			access_type  : 'private',
			service_name : 'lcl_customs_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'list_air_customs_rate_feedbacks',
			access_type  : 'private',
			service_name : 'air_customs_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'list_haulage_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'list_trailer_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'get_spot_search',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			api          : 'create_spot_search_negotiation',
			access_type  : 'private',
			feature      : 'search',
			service_name : 'spot_search',
		},
		{
			api          : 'list_rate_sheets',
			access_type  : 'private',
			service_name : 'rate_sheet',
		},
		{
			api          : 'list_fcl_freight_rate_sheets',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_rate_sheet',
			access_type  : 'private',
			service_name : 'rate_sheet',
		},
		{
			api          : 'update_fcl_freight_rate_sheet',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_trade_requirements_rates',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_organization_trade_requirement_csv',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_rate_sheet',
			access_type  : 'private',
			service_name : 'rate_sheet',
		},
		{
			api          : 'create_fcl_freight_rate_sheet',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'list_emails',
			access_type  : 'private',
			service_name : 'email',
		},
		{
			api          : 'list_spot_negotiation_rates',
			access_type  : 'private',
			service_name : 'spot_negotiation',
		},
		{
			api          : 'list_spot_negotiations',
			access_type  : 'private',
			service_name : 'spot_negotiation',
		},
		{
			api          : 'list_fcl_freight_rate_locals',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_spot_negotiation',
			access_type  : 'private',
			service_name : 'spot_negotiation',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_spot_negotiation_by_service_id',
			access_type  : 'private',
			service_name : 'spot_negotiation',
		},
		{
			api          : 'send_spot_negotiation_supplier_assignment_email',
			access_type  : 'private',
			service_name : 'spot_negotiation',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'skip_spot_negotiation',
			access_type  : 'private',
			service_name : 'spot_negotiation',
		},
		{
			api          : 'get_spot_negotiation_rate',
			access_type  : 'private',
			service_name : 'spot_negotiation',
		},
		{
			api          : 'list_lcl_pudo_locations',
			access_type  : 'private',
			service_name : 'lcl_freight_rate',
		},
		{
			api          : 'create_air_schedule',
			access_type  : 'private',
			service_name : 'air_schedule',
		},
		{
			api          : 'create_sailing_schedule',
			access_type  : 'private',
			service_name : 'sailing_schedule',
		},
		{
			api          : 'get_sailing_schedules',
			access_type  : 'private',
			service_name : 'sailing_schedule',
		},
		{
			api          : 'get_air_schedules',
			access_type  : 'private',
			service_name : 'air_schedule',
		},
		{
			api          : 'get_fcl_freight_rate_local',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'get_fcl_freight_rate',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'get_haulage_freight_rate',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
		},
		{
			api          : 'get_trailer_freight_rate',
			access_type  : 'private',
			service_name : 'trailer_freight_rate',
		},
		{
			api          : 'get_lcl_freight_rate',
			access_type  : 'private',
			service_name : 'lcl_freight_rate',
		},
		{
			api          : 'get_air_freight_rate',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'get_ftl_freight_rate',
			access_type  : 'private',
			service_name : 'ftl_freight_rate',
		},
		{
			api          : 'get_ltl_freight_rate',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
		},
		{
			api          : 'get_fcl_cfs_rate',
			access_type  : 'private',
			service_name : 'fcl_cfs_rate',
		},
		{
			api          : 'get_fcl_customs_rate',
			access_type  : 'private',
			service_name : 'fcl_customs_rate',
		},
		{
			api          : 'get_lcl_customs_rate',
			access_type  : 'private',
			service_name : 'lcl_customs_rate',
		},
		{
			api          : 'get_air_customs_rate',
			access_type  : 'private',
			service_name : 'air_customs_rate',
		},
		{
			api          : 'update_spot_negotiation_rate',
			access_type  : 'private',
			service_name : 'spot_negotiation',
		},
		{
			api          : 'list_spot_searches',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			api          : 'list_haulage_freight_rates',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
		},
		{
			api          : 'list_fcl_freight_rates',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'list_lcl_freight_rates',
			access_type  : 'private',
			service_name : 'lcl_freight_rate',
		},
		{
			api          : 'list_domestic_air_freight_charge_codes',
			access_type  : 'private',
			service_name : 'domestic_air_freight_rate',
		},
		{
			api          : 'list_air_freight_rates',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'list_ftl_freight_rates',
			access_type  : 'private',
			service_name : 'ftl_freight_rate',
		},
		{
			api          : 'list_ltl_freight_rates',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
		},
		{
			api          : 'list_trailer_freight_rates',
			access_type  : 'private',
			service_name : 'trailer_freight_rate',
		},
		{
			api          : 'list_fcl_customs_rates',
			access_type  : 'private',
			service_name : 'fcl_customs_rate',
		},
		{
			api          : 'list_lcl_customs_rates',
			access_type  : 'private',
			service_name : 'lcl_customs_rate',
		},
		{
			api          : 'list_air_customs_rates',
			access_type  : 'private',
			service_name : 'air_customs_rate',
		},
		{
			api          : 'list_fcl_cfs_rates',
			access_type  : 'private',
			service_name : 'fcl_cfs_rate',
		},
		{
			api          : 'create_spot_negotiation_comment',
			access_type  : 'private',
			service_name : 'spot_negotiation',
		},
		{
			api          : 'get_spot_negotiation',
			access_type  : 'private',
			service_name : 'spot_negotiation',
		},
		{
			api          : 'list_spot_negotiation_comments',
			access_type  : 'private',
			service_name : 'spot_negotiation',
		},
		{
			api          : 'send_negotiation_email_to_service_provider',
			access_type  : 'private',
			service_name : 'spot_negotiation',
		},
		{
			api          : 'get_spot_search',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			api          : 'update_spot_negotiation_by_service_id',
			access_type  : 'private',
			service_name : 'spot_negotiation',
		},
		{
			api          : 'list_rfqs',
			access_type  : 'private',
			service_name : 'rfq',
		},
		{
			api          : 'list_organization_services',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'rate_density',
		},
		{
			api          : 'list_partner_user_expertises',
			access_type  : 'private',
			service_name : 'partner',
			feature      : 'rate_density',
		},
		{
			api          : 'get_partner_user_rate_stats',
			access_type  : 'private',
			service_name : 'partner',
			feature      : 'rate_density',
		},
		{
			api          : 'create_fcl_freight_rate',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'rate_density',
		},

		{
			api          : 'create_lcl_freight_rate',
			access_type  : 'private',
			service_name : 'lcl_freight_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'create_ftl_freight_rate',
			access_type  : 'private',
			service_name : 'ftl_freight_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'create_fcl_cfs_rate',
			access_type  : 'private',
			service_name : 'fcl_cfs_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'create_air_freight_rate',
			access_type  : 'private',
			service_name : 'air_freight_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'create_ltl_freight_rate',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'create_fcl_customs_rate',
			access_type  : 'private',
			service_name : 'fcl_customs_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'create_lcl_customs_rate',
			access_type  : 'private',
			service_name : 'lcl_customs_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'create_haulage_freight_rate',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'create_air_customs_rate',
			access_type  : 'private',
			service_name : 'air_customs_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'get_fcl_freight_rate_visibility',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'get_lcl_freight_rate_visibility',
			access_type  : 'private',
			service_name : 'lcl_freight_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'get_air_freight_rate_visibility',
			access_type  : 'private',
			service_name : 'air_freight_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'get_ftl_freight_rate_visibility',
			access_type  : 'private',
			service_name : 'ftl_freight_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'get_ltl_freight_rate_visibility',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'get_fcl_customs_rate_visibility',
			access_type  : 'private',
			service_name : 'fcl_customs_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'get_air_customs_rate_visibility',
			access_type  : 'private',
			service_name : 'air_customs_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'get_lcl_customs_rate_visibility',
			access_type  : 'private',
			service_name : 'lcl_customs_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'get_haulage_freight_rate_visibility',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
			feature      : 'rate_density',
		},
		{
			api         : 'list_shipment_flash_booking_rates',
			access_type : 'private',
			feature     : 'live_booking',
		},
		{
			api         : 'create_shipment_flash_booking_rate',
			access_type : 'private',
			feature     : 'live_booking',
		},
		{
			api         : 'update_shipment_flash_booking_rate',
			access_type : 'private',
			feature     : 'live_booking',
		},
		{
			api         : 'get_shipment_services_quotation',
			access_type : 'private',
			feature     : 'live_booking',
		},
		{
			api         : 'get_shipment_quotation',
			access_type : 'private',
			feature     : 'live_booking',
		},
		{
			api     : 'send_flash_booking_email',
			feature : 'live_booking',
		},
		{
			api          : 'list_air_freight_rate_requests',
			access_type  : 'private',
			service_name : 'air_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_domestic_air_freight_rate_requests',
			access_type  : 'private',
			service_name : 'domestic_air_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_fcl_freight_rate_requests',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_lcl_freight_rate_requests',
			access_type  : 'private',
			service_name : 'lcl_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_ftl_freight_rate_requests',
			access_type  : 'private',
			service_name : 'ftl_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_ltl_freight_rate_requests',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_fcl_customs_rate_requests',
			access_type  : 'private',
			service_name : 'fcl_customs_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_fcl_cfs_rate_requests',
			access_type  : 'private',
			service_name : 'fcl_cfs_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_lcl_customs_rate_requests',
			access_type  : 'private',
			service_name : 'lcl_customs_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_air_customs_rate_requests',
			access_type  : 'private',
			service_name : 'air_customs_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_haulage_freight_rate_requests',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_trailer_freight_rate_requests',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'delete_fcl_freight_rate_request',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'delete_lcl_freight_rate_request',
			access_type  : 'private',
			service_name : 'lcl_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'delete_ftl_freight_rate_request',
			access_type  : 'private',
			service_name : 'ftl_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'delete_air_freight_rate_request',
			access_type  : 'private',
			service_name : 'air_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'update_air_freight_rate',
			access_type  : 'private',
			service_name : 'air_freight_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'delete_ltl_freight_rate_request',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'delete_fcl_customs_rate_request',
			access_type  : 'private',
			service_name : 'fcl_customs_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'delete_fcl_cfs_rate_request',
			access_type  : 'private',
			service_name : 'fcl_cfs_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'delete_lcl_customs_rate_request',
			access_type  : 'private',
			service_name : 'lcl_customs_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'delete_air_customs_rate_request',
			access_type  : 'private',
			service_name : 'air_customs_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'delete_haulage_freight_rate_request',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'delete_trailer_freight_rate_request',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'get_rate_requests_stats',
			access_type  : 'private',
			service_name : 'spot_search',
			feature      : 'rate_requests',
		},
		{
			api          : 'list_ftl_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'ftl_freight_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'get_rate_feedbacks_stats',
			access_type  : 'private',
			service_name : 'spot_search',
			feature      : 'disliked_rates',
		},
		{
			api         : 'send_flash_booking_emails',
			access_type : 'private',
			feature     : 'live_booking',
		},
		{
			api          : 'list_ltl_freight_rate_zones',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'delete_domestic_air_freight_rate_request',
			access_type  : 'private',
			service_name : 'domestic_air_freight_rate',
			feature      : 'rate_requests',
		},
		{
			api          : 'delete_fcl_freight_rate_feedback',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'delete_lcl_freight_rate_feedback',
			access_type  : 'private',
			service_name : 'lcl_freight_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'delete_air_freight_rate_feedback',
			access_type  : 'private',
			service_name : 'air_freight_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'delete_ftl_freight_rate_feedback',
			access_type  : 'private',
			service_name : 'ftl_freight_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'delete_ltl_freight_rate_feedback',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'delete_fcl_customs_rate_feedback',
			access_type  : 'private',
			service_name : 'fcl_customs_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'delete_lcl_customs_rate_feedback',
			access_type  : 'private',
			service_name : 'lcl_customs_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'delete_air_customs_rate_feedback',
			access_type  : 'private',
			service_name : 'air_customs_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'delete_haulage_freight_rate_feedback',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
			feature      : 'disliked_rates',
		},
		{
			api          : 'list_ltl_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
			feature      : 'disliked_rates',
		},
		{
			api         : 'list_rate_charge_codes',
			access_type : 'private',
			feature     : 'missing_rates',
		},
		{
			api         : 'delete_domestic_air_freight_rate_feedback',
			access_type : 'private',
			feature     : 'disliked_rates',
		},
		{
			api          : 'get_expertise_locations_for_rate',
			access_type  : 'private',
			service_name : 'location',
			feature      : 'rate_density',
		},
		{
			api          : 'create_air_freight_rate_surcharge',
			access_type  : 'private',
			service_name : 'air_freight_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'create_air_freight_rate_local',
			access_type  : 'private',
			service_name : 'air_freight_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'create_fcl_freight_rate_local',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'create_haulage_freight_rate',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'get_fcl_freight_rate_local',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'get_air_freight_rate_local',
			access_type  : 'private',
			service_name : 'air_freight_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'extend_create_fcl_freight_rate',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'rate_density',
		},
		{
			api          : 'get_fcl_freight_rate_extension',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'rate_density',
		},
		{
			api              : 'list_rfq_searches',
			access_type      : 'private',
			feature          : 'rfq',
			defaultparameter : 'supply_dashboard:allowed',
		},
		{
			api          : 'list_location_expert_service_providers',
			access_type  : 'private',
			feature      : 'disliked_rates',
			service_name : 'organization',
		},
		{
			api          : 'get_fcl_cfs_rate',
			access_type  : 'private',
			service_name : 'fcl_cfs_rate',
			feature      : 'rfq',
		},
		{
			api          : 'create_rfq_supply_agent_preference',
			access_type  : 'private',
			service_name : 'rfq',
			feature      : 'rfq',
		},
		{
			api          : 'get_contract_previous_service_providers',
			access_type  : 'private',
			service_name : 'unified_dashboard',
			feature      : 'live_booking',
		},
	],
	operations_dashboard: [
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_shipments',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_shipments_stats',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_contract_fcl_freight_services',
			access_type  : 'private',
			service_name : 'contract',
		},

		{
			api          : 'update_organization_trade_requirement_draft',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_trade_requirement_drafts',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_trade_requirement_draft_stakeholders',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'send_trade_requirement_draft_confirmation_otp',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'verify_trade_requirement_draft_confirmation_otp',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_shipment_pending_tasks',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'update_contract_draft',
			access_type  : 'private',
			service_name : 'contract',
		},
		{
			api          : 'get_ops_user_incentive_stats',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'create_incentive_report',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'list_contract_lcl_freight_services',
			access_type  : 'private',
			service_name : 'contract',
		},
		{
			api          : 'list_contract_air_freight_services',
			access_type  : 'private',
			service_name : 'contract',
		},
		{
			api          : 'update_bulk_contract_plan_sheet_upload',
			access_type  : 'private',
			service_name : 'contract',
		},
		{
			api          : 'update_contract_plan_sheet_upload',
			access_type  : 'private',
			service_name : 'contract',
		},
		{
			api          : 'get_contract_plan_stats',
			access_type  : 'private',
			service_name : 'contract',
		},
		{
			api          : 'list_contracts',
			access_type  : 'private',
			service_name : 'contract',
		},
	],
	discount: [
		{
			api          : 'update_discount',
			access_type  : 'private',
			service_name : 'discount',
		},
		{
			api          : 'create_discount',
			access_type  : 'private',
			service_name : 'discount',
		},
		{
			api          : 'list_discounts',
			access_type  : 'private',
			service_name : 'discount',
		},
		{
			api          : 'get_discount',
			access_type  : 'private',
			service_name : 'discount',
		},
		{
			api          : 'list_conditions',
			access_type  : 'private',
			service_name : 'condition',
		},
		{
			api          : 'list_rate_charge_codes',
			access_type  : 'private',
			service_name : 'rate_sheet',
		},
	],
	margin: [
		{
			api          : 'list_partners',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_margin',
			access_type  : 'private',
			service_name : 'margin',
		},
		{
			api          : 'create_margin',
			access_type  : 'private',
			service_name : 'margin',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_margins',
			access_type  : 'private',
			service_name : 'margin',
		},
		{
			api          : 'list_rate_charge_codes',
			access_type  : 'private',
			service_name : 'rate_sheet',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
	],
	rate_sheet: [
		{
			api          : 'list_rate_sheets',
			access_type  : 'private',
			service_name : 'rate_sheet',
		},
		{
			api          : 'list_fcl_freight_rate_sheets',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_rate_sheet',
			access_type  : 'private',
			service_name : 'rate_sheet',
		},
		{
			api          : 'update_fcl_freight_rate_sheet',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_trade_requirements_rates',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_organization_trade_requirement_csv',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_rate_sheet',
			access_type  : 'private',
			service_name : 'rate_sheet',
		},
		{
			api          : 'create_fcl_freight_rate_sheet',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'list_cogo_entities',
			access_type  : 'private',
			service_name : 'partner',
		},
	],
	trade_enquiry: [
		{
			api          : 'list_fcl_freight_rate_dislikes',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'list_lcl_freight_rate_dislikes',
			access_type  : 'private',
			service_name : 'lcl_freight_rate',
		},
		{
			api          : 'list_air_freight_rate_dislikes',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'list_fcl_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'list_lcl_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'lcl_freight_rate',
		},
		{
			api          : 'list_air_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'list_air_domestic_freight_rate_feedbacks',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'get_spot_search',
			access_type  : 'private',
			service_name : 'spot_search',
		},

		{
			api          : 'create_spot_search_negotiation',
			access_type  : 'private',
			feature      : 'search',
			service_name : 'spot_search',
		},
		{
			api          : 'delete_air_freight_rate_feedback',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'delete_air_freight_rate_request',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},

		{
			api         : 'list_air_freight_rate_requests',
			access_type : 'private',

			service_name: 'air_freight_rate',
		},
	],
	margin_approval: [
		{
			api          : 'update_spot_search',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			api          : 'get_spot_search',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			api          : 'get_shipment_services_quotation',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_shipment_services',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_spot_searches',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_checkouts',
			access_type  : 'private',
			service_name : 'checkout',
		},
		{
			api          : 'get_checkout',
			access_type  : 'private',
			service_name : 'checkout',
		},
		{
			api          : 'update_checkout',
			access_type  : 'private',
			service_name : 'checkout',
		},
		{
			api          : 'update_shipment_supply_approval_status',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_rate_charge_codes',
			access_type  : 'private',
			service_name : 'rate_sheet',
		},
	],
	invoice_approval: [
		{
			api          : 'list_shipment_purchase_invoices',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'update_shipment_purchase_invoice',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_auth_roles',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'get_auth_possible_permissions',
			access_type  : 'private',
			service_name : 'auth',
		},
	],
	convenience_rate: [
		{
			api          : 'list_cogo_entities',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_convenience_rate_configuration',
			access_type  : 'private',
			service_name : 'convenience_rate',
		},
		{
			api          : 'update_convenience_rate_configuration',
			access_type  : 'private',
			service_name : 'convenience_rate',
		},
		{
			api          : 'list_convenience_rate_configurations',
			access_type  : 'private',
			service_name : 'convenience_rate',
		},
		{
			api          : 'create_convenience_rate_custom_configuration',
			access_type  : 'private',
			service_name : 'convenience_rate',
		},
		{
			api          : 'update_convenience_rate_custom_configuration',
			access_type  : 'private',
			service_name : 'convenience_rate',
		},
		{
			api          : 'get_convenience_rate_configuration',
			access_type  : 'private',
			service_name : 'convenience_rate',
		},
	],
	payment_modes_and_methods: [
		{
			api          : 'list_service_payment_modes',
			access_type  : 'private',
			service_name : 'payment',
		},
		{
			api          : 'create_service_payment_modes',
			access_type  : 'private',
			service_name : 'payment',
		},
		{
			api          : 'get_service_payment_modes',
			access_type  : 'private',
			service_name : 'payment',
		},
		{
			api          : 'get_all_possible_payment_methods',
			access_type  : 'private',
			service_name : 'payment',
		},
		{
			api          : 'update_service_payment_modes',
			access_type  : 'private',
			service_name : 'payment',
		},
		{
			api          : 'list_cogo_entities',
			access_type  : 'private',
			service_name : 'payment',
		},
	],
	condition: [
		{
			api          : 'update_condition',
			access_type  : 'private',
			service_name : 'condition',
		},
		{
			api          : 'get_condition_constants',
			access_type  : 'private',
			service_name : 'condition',
		},
		{
			api          : 'create_condition',
			access_type  : 'private',
			service_name : 'condition',
		},
		{
			api          : 'get_condition',
			access_type  : 'private',
			service_name : 'condition',
		},
		{
			api          : 'list_conditions',
			access_type  : 'private',
			service_name : 'condition',
		},
	],
	cashflow: [
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_cash_flow_sheet',
			access_type  : 'private',
			service_name : 'cash_flow',
		},
		{
			api          : 'list_cash_flow_sheets',
			access_type  : 'private',
			service_name : 'cash_flow',
		},
	],
	credit_request: [
		{
			api          : 'list_credit_allocations',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'get_organization',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_credit_requests',
			access_type  : 'private',
			service_name : 'credit',
		},
		{
			api          : 'list_partners',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_business',
			access_type  : 'private',
			service_name : 'business',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
	],
	shipment_permissible_loss : [],
	product_code              : [
		{
			api          : 'create_sage_product_code_mapping',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_sage_product_code_mappings',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'update_sage_product_code_mapping',
			access_type  : 'private',
			service_name : 'sage',
		},
	],
	organization_service_management: [
		{
			api          : 'list_organization_services',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_service',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_organization_service_stats',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_recommend_service_expertise',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_organization_service_details',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_service_expertises',
			access_type  : 'private',
			service_name : 'organization',
		},
	],
	local_agent_management: [
		{
			api          : 'update_fcl_freight_rate_local_agent',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'list_fcl_freight_rate_local_agents',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'create_fcl_freight_rate_local_agent',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'list_organization_services',
			access_type  : 'private',
			service_name : 'organization',
		},
	],
	locations: [
		{
			api          : 'update_location',
			access_type  : 'private',
			service_name : 'location',
		},
		{
			api          : 'list_locations_mapping',
			access_type  : 'private',
			service_name : 'location',
		},
		{
			api          : 'create_location',
			access_type  : 'private',
			service_name : 'location',
		},
		{
			api          : 'create_location_mapping',
			access_type  : 'private',
			service_name : 'location',
		},
		{
			api          : 'create_location_cluster',
			access_type  : 'private',
			service_name : 'location',
		},
		{
			api          : 'list_location_clusters',
			access_type  : 'private',
			service_name : 'location',
		},
		{
			api          : 'list_operators',
			access_type  : 'private',
			service_name : 'operator',
		},
		{
			api          : 'create_operators',
			access_type  : 'private',
			service_name : 'operator',
		},
		{
			api          : 'update_operator',
			access_type  : 'private',
			service_name : 'operator',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'location',
		},
		{
			api          : 'list_partners',
			access_type  : 'private',
			service_name : 'location',
		},
		{
			api          : 'get_location_cluster',
			access_type  : 'private',
			service_name : 'location',
		},
		{
			api          : 'update_location_cluster',
			access_type  : 'private',
			service_name : 'location',
		},
	],
	ocean_port_pair: [
		{
			api          : 'update_sailing_schedule_port',
			access_type  : 'private',
			service_name : 'sailing_schedule',
		},
		{
			api          : 'get_sailing_schedule_port_pair_coverages',
			access_type  : 'private',
			service_name : 'sailing_schedule',
		},
		{
			api          : 'bulk_update_sailing_schedule_port_pair_coverage',
			access_type  : 'private',
			service_name : 'sailing_schedule',
		},
		{
			api          : 'create_sailing_schedule_port_pair_coverage',
			access_type  : 'private',
			service_name : 'sailing_schedule',
		},
		{
			api          : 'create_sailing_schedule_port_pair',
			access_type  : 'private',
			service_name : 'sailing_schedule',
		},
		{
			api          : 'list_sailing_schedule_port_pairs',
			access_type  : 'private',
			service_name : 'sailing_schedule',
		},
		{
			api          : 'update_sailing_schedule_port_pair_coverage',
			access_type  : 'private',
			service_name : 'sailing_schedule',
		},
		{
			api          : 'bulk_import_sailing_schedules',
			access_type  : 'private',
			service_name : 'sailing_schedule',
		},
	],
	air_port_pair: [
		{
			api          : 'create_air_schedule',
			access_type  : 'private',
			service_name : 'air_schedule',
		},
		{
			api          : 'create_air_schedule_airport_pair',
			access_type  : 'private',
			service_name : 'air_schedule',
		},
		{
			api          : 'list_air_schedule_airport_pairs',
			access_type  : 'private',
			service_name : 'air_schedule',
		},
		{
			api          : 'get_air_schedule_port_pair_coverages',
			access_type  : 'private',
			service_name : 'air_schedule',
		},
	],
	ocean_port: [
		{
			api          : 'update_sailing_schedule_port',
			access_type  : 'private',
			service_name : 'sailing_schedule',
		},
	],
	quotation_approval: [
		{
			api          : 'list_spot_searches',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			api          : 'list_emails',
			access_type  : 'private',
			service_name : 'email',
		},
		{
			api          : 'get_spot_search',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			api          : 'get_checkout',
			access_type  : 'private',
			service_name : 'checkout',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_checkouts',
			access_type  : 'private',
			service_name : 'checkout',
		},
		{
			api          : 'list_rate_charge_codes',
			access_type  : 'private',
			service_name : 'rate_sheet',
		},
	],
	sales: [
		{
			feature      : 'sales',
			api          : 'get_organization',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'sales',
			api          : 'list_emails',
			access_type  : 'private',
			service_name : 'email',
		},
		{
			feature      : 'sales',
			api          : 'get_spot_search',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			feature      : 'sales',
			api          : 'update_user',
			access_type  : 'private',
			service_name : 'user',
		},
		{
			feature      : 'sales',
			api          : 'onboard_organization_user',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'sales',
			api          : 'create_organization_user_invitation',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'sales',
			api          : 'send_organization_user_welcome_email',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'sales',
			api          : 'update_organization_user',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'sales',
			api          : 'list_spot_searches',
			access_type  : 'private',
			service_name : 'spot_search',
		},
		{
			feature      : 'sales',
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'sales',
			api          : 'list_organization_user_invitations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_partner_user_allocations',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_allocation_requests',
			access_type  : 'private',
			service_name : 'allocation',
		},
		{
			feature      : 'sales',
			api          : 'list_organization_settings',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			feature      : 'sales',
			api          : 'create_organization_setting',
			access_type  : 'private',
			service_name : 'organization',
		},
	],
	notifications: [
		{
			api          : 'list_communications',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'bulk_update_communications',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'update_communication',
			access_type  : 'private',
			service_name : 'communication',
		},
	],
	shipment_approval: [
		{
			api          : 'list_shipments',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'update_shipment_sales_approval_status',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_shipment_quotation',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'update_shipment_sales_margin',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_shipment_services',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
	],
	lead_management: [
		{
			api          : 'list_lead_organization_addresses',
			access_type  : 'private',
			service_name : 'lead',
		},
		{
			api          : 'list_lead_users',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'list_lead_organizations',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'get_lead_lifecycle_stats',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'get_lead_organization_progress_stats',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'get_lead_organization',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'get_lead_organization_air_trade_details',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'get_lead_organization_fcl_trade_details',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'get_lead_organization_lcl_trade_details',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'get_lead_organization_haulage_trade_details',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'get_lead_organization_trucking_trade_details',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'update_lead_organization',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'update_lead_organization_air_trade_details',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'update_lead_organization_fcl_trade_details',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'update_lead_organization_lcl_trade_details',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'update_lead_organization_haulage_trade_details',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'update_lead_organization_trucking_trade_details',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'get_lead_organization_users',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'list_lead_notes',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'list_lead_communication_logs',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'create_lead_organization_note',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'create_lead_organization_communication_log',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'create_lead_user',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'update_lead_user',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'merge_lead_organizations',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'merge_lead_users',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'reject_lead_organizations',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'export_leads',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'reject_lead_organizations',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'partner',
		},
		{
			api          : 'get_lead_user',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'update_lead_lifecycle_stage',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'create_lead_user_note',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'create_lead_user_communication_log',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'create_lead_organization',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'list_partners',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'partner',
		},
		{
			api          : 'get_lead_user_organizations',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'import_leads',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'export_leads_with_filters',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'update_lead_organization_user',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'update_lead_organization_users',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'update_lead_priority_score',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'assign_lead_agents',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'assign_lead_agents_with_filters',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'create_lead_organization_user',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'create_lead_actions_with_filters',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'get_lead_organization_conversion_eligibility',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'convert_lead_organization',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'list_lead_segments',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'update_lead_segment',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'create_lead_segment',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'assign_lead_segment_with_filters',
			access_type  : 'private',
			feature      : 'lead_management',
			service_name : 'lead',
		},
		{
			api          : 'list_sage_ar_outstandings',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_sage_ar_invoices',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_invoice_details',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_air_freight_incoterms',
			access_type  : 'private',
			service_name : 'spot_search',
		},
	],
	bl_desk: [
		{
			api          : 'list_shipment_trade_documents',
			access_type  : 'private',
			service_name : 'trade',
		},
		{
			api          : 'update_trade_document',
			access_type  : 'private',
			service_name : 'trade',
		},
		{
			api          : 'list_organization_billing_addresses',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_shipment_documents',
			access_type  : 'private',
			service_name : 'shipment',
		},
	],
	lead_dashboard: [
		{
			api          : 'get_lead_organization_conversion_stats',
			access_type  : 'private',
			service_name : 'lead',
		},
		{
			api          : 'list_lead_organization_conversions',
			access_type  : 'private',
			service_name : 'lead',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
	],
	manual_shipment: [
		{
			api          : 'create_shipment',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_billing_addresses',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_rate_charge_codes',
			access_type  : 'private',
			service_name : 'rate_sheet',
		},
		{
			api          : 'list_communications',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'list_operators',
			access_type  : 'private',
			service_name : 'operator',
		},
		{
			api          : 'get_all_exchange_rates',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'list_locations',
			access_type  : 'private',
			service_name : 'location',
		},
		{
			api          : 'get_sage_product_taxes',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_organization_invoicing_parties',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_lcl_pudo_locations',
			access_type  : 'private',
			service_name : 'lcl_freight_rate',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_shipment_from_requirement_draft',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_organization_trade_requirement_draft',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization_trade_requirement_draft',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_trade_requirement_draft',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'send_trade_requirement_draft_confirmation_otp',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'verify_trade_requirement_draft_confirmation_otp',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_contract_fcl_freight_services',
			access_type  : 'private',
			service_name : 'contract',
		},
		{
			api          : 'get_contract_service_details',
			access_type  : 'private',
			service_name : 'contract',
		},
	],
	incentives: [
		{
			api          : 'create_incentive_plan',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'create_incentive_payment',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'list_payable_incentives',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'update_incentive_plan',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'list_incentive_plans',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'list_auth_roles',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_rolewise_incentive_plans',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'get_incentive_plan_stats',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'get_user_incentive_dashboard',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'check_duplicate_incentive_plan',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'create_ops_incentive_plan',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'create_incentive_rule',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'activate_incentive_plan',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'deactivate_incentive_plan',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'update_ops_incentive_plan',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'update_incentive_rule',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'delete_incentive_plan',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'get_ops_user_incentive_dashboard',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'download_all_user_incentive_earned_csv',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'list_incentive_user_details',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'get_incentive_user_breakup',
			access_type  : 'private',
			service_name : 'incentive',
		},

		{
			api          : 'list_user_incentive_scores',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'update_incentive',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'list_ops_incentive_user_details',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'download_ops_payout_csv',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'download_ops_score_breakup',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'create_duplicate_incentive_plan',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'list_user_incentives',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'get_incentive_user_detail_stat',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'get_ops_user_incentive_stats',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'create_kpi_plan',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'update_kpi_plan',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'create_incentive_report',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'list_kpi_plans',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'list_kpi_scores',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'get_kpi_plan_stats',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'list_monthly_kpi_scores',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'download_kpi_summary_csv',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'list_user_incentive_views',
			access_type  : 'private',
			service_name : 'incentive',
		},
	],
	dunning: [
		{
			api          : 'list_dunning_cycles',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'delete_dunning_cycle',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'update_dunning_cycle',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'create_dunning_cycle',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_dunning_cycle',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_cogo_entities',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'download_customer_list',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_dunning_organization_users',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_dunning_mail_variable',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_dunning_templates',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_dunning_stats',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'create_severity_rule',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_severity_rules',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'delete_severity_rule',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'update_severity_rule',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_dunning_cycle_executions',
			access_type  : 'private',
			service_name : 'sage',
		},
	],
	invoice_triggers: [
		{
			api          : 'list_sage_triggers',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_sage_triggers',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'update_sage_trigger',
			access_type  : 'private',
			service_name : 'sage',
		},
	],
	outstanding: [
		{
			api          : 'get_outstanding_stat',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_auth_roles',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'list_organization_outstandings',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_sage_ar_outstandings',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'download_outstanding_data',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_invoice_details',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'trigger_outstanding_invoice_mail',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_cogo_entities',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_precovid_bprs',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'delete_bpr_precovid_entry',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_organization_by_bpr',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'add_bpr_precovid_list',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'search_bpr_number',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_sage_ar_invoices',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_sage_ar_outstanding_stat',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_partner_user_rm_mapping',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_kam_wise_outstanding_stats',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'get_service_wise_outstanding_stats',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'send_outstanding_report_mail',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_knock_off_invoices',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_sage_payments',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'list_dunning_emails',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'send_outstanding_reminder',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_user_call_details',
			access_type  : 'private',
			service_name : 'voice_call',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_channel_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_organization_communication_log',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_dunning_email_snapshot',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_organization_communication_logs',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_outstanding_account_tagging',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_invoices_kam_breakdown',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_organization_pocs',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_cc_communication_stats',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'send_demand_notice_to_prelegal_accounts',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_communication_templates',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'send_demand_notice_to_prelegal_accounts',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_organization_wise_outstanding',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'get_outstanding_data_bifurcation',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'list_outstanding_invoices',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'create_servetel_communication_log',
			access_type  : 'private',
			service_name : 'voice_call',
		},
		{
			api          : 'update_bulk_outstanding_account_taggings',
			access_type  : 'private',
			service_name : 'sage',
		},
	],
	unified_dashboard: [
		{
			api          : 'list_booking_analysis',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'get_sales_funnel',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'get_accrual_revenue_breakdown',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'get_invoiced_revenue_analysis_breakdown',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'list_supply_funnels',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'list_shipments',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_sales_funnel_custom',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'get_shipment_invoice_stats',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_shipment_profits',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'get_account_wise_organization_funnel',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'get_organization_cohort',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'list_channel_wise_financial_details',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'list_account_wise_financial_details',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'list_product_wise_financial_details',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'get_channel_wise_financial_breakdown',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'get_account_wise_financial_breakdown',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'get_product_wise_financial_breakdown',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'list_monthly_cost',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'list_monthly_revenue',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'list_monthly_profit',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'list_cogo_entities',
			access_type  : 'private',
			service_name : 'partner',
		},
	],
	pay_later: [
		{
			api          : 'get_rm_paylater',
			access_type  : 'private',
			service_name : 'credit',
		},
	],
	business_finance: [
		{
			api          : 'upload_line_items_purchase_manual',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'create_sage_job',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'post_invoices_to_sage',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'update_order',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'update_sage_proforma_invoice',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'update_sage_purchase_invoice_status',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'update_credit_debit_note_status',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'create_credit_note_order',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'create_debit_note_order',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'create_manual_sales_invoice',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'create_manual_purchase_invoice',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'create_organization_document',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_purchase_credit_note_order',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'update_manual_purchase_invoice',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'update_manual_sales_invoice',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'update_purchase_invoice',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'update_purchase_order',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'post_order_to_sage',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'open_shipment_job',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'close_shipment_job',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'open_manual_job',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'close_manual_job',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'create_vendor_payment_file',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'upload_line_items_url_manual_invoice',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_shipments_with_invoices',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_sales_invoice_approvals',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_sage_job',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_sage_jobs',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_proforma_invoice',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'generate_irn_number',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_cost_sheet_quotations',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_shipments',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_shipment_invoice_preference',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'search_products_v2',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_sales_invoice',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_shipment',
			access_type  : 'private',
			service_name : 'bookings',
		},
		{
			api          : 'list_organization_invoicing_parties',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_purchase_invoice_approvals',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_sage_manual_invoice',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_organization_billing_addresses',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_documents',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_cogo_entities',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_manual_purchase_invoice',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_shipment_container_details',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_purchase_invoice_report',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_sales_invoice_report',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_shipment_currency_conversions',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_order_with_shipment',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_purchase_order_with_shipment',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_order_with_sage_job',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_purchase_order_with_sage_job',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_shipment_data_for_invoice',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api         : 'get_common_job_shipment_id_view',
			access_type : 'private',
		},
		{
			api         : 'get_purchase_treasury_live_status',
			access_type : 'private',
		},
	],
	business_finance_income: [
		{
			api          : 'list_order_with_shipment',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_order_with_sage_job',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_proforma_invoice',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_cogo_entities',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_shipment',
			access_type  : 'private',
			service_name : 'bookings',
		},
		{
			api          : 'list_organization_invoicing_parties',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'search_products_v2',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_locations',
			access_type  : 'private',
			service_name : 'location',
		},
		{
			api          : 'get_sage_job',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'upload_line_items_purchase_manual',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'upload_line_items_purchase_manual',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'update_order',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'update_sage_proforma_invoice',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'post_invoices_to_sage',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'update_manual_sales_invoice',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'generate_irn_number',
			access_type  : 'private',
			service_name : 'sage',
		},
	],
	business_finance_expense: [
		{
			api          : 'upload_line_items_purchase_manual',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'update_purchase_order',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'update_sage_purchase_invoice_status',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'post_order_to_sage',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'create_vendor_payment_file',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'post_invoices_to_sage',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'create_vendor_payment_knock_off',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_purchase_order_with_shipment',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_purchase_order_with_sage_job',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_proforma_invoice',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_cogo_entities',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'search_products_v2',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_sage_job',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'update_manual_purchase_invoice',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_shipment',
			access_type  : 'private',
			service_name : 'bookings',
		},
		{
			api          : 'list_organization_invoicing_parties',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_documents',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_document',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_manual_purchase_invoice',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_shipment_currency_conversions',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
	],
	cogo_book: [
		{
			api         : 'get_pnl_accrual_archive_shipment_list',
			access_type : 'private',
		},
		{
			api         : 'get_pnl_statement_salary',
			access_type : 'private',
		},
		{
			api          : 'list_cogo_entities',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api         : 'get_pnl_statement_list',
			access_type : 'private',
		},
		{
			api         : 'post_payments_journal_voucher_approve',
			access_type : 'private',
		},
		{
			api         : 'post_payments_journal_voucher_reject',
			access_type : 'private',
		},
		{
			api          : 'list_organization_trade_parties',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_trade_party_details',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api         : 'post_payments_settlement_settle',
			access_type : 'private',
			module      : 'match',
			feature     : 'match',
		},
		{
			api         : 'post_payments_settlement_check',
			access_type : 'private',
			module      : 'match',
			feature     : 'match',
		},
		{
			api         : 'post_payments_settlement_edit',
			access_type : 'private',
			module      : 'match',
			feature     : 'match',
		},
		{
			api         : 'post_payments_settlemet_reject',
			access_type : 'private',
			module      : 'match',
			feature     : 'match',
		},
		{
			api         : 'get_pnl_accrual_archive_declared_list',
			access_type : 'private',
			module      : 'accruals',
			feature     : 'accruals',
		},
		{
			api         : 'get_pnl_accrual_archive_actual_list',
			access_type : 'private',
			module      : 'accruals',
			feature     : 'accruals',
		},
		{
			api         : 'get_pnl_accrual_archive_shipment_list',
			access_type : 'private',
			module      : 'accruals',
			feature     : 'accruals',
		},
		{
			api         : 'get_pnl_accrual_shipments',
			access_type : 'private',
			module      : 'accruals',
			feature     : 'accruals',
		},
		{
			api         : 'post_pnl_accrual_add_to_selected',
			access_type : 'private',
			module      : 'accruals',
			feature     : 'accruals',
		},
		{
			api         : 'get_pnl_accrual_view_selected',
			access_type : 'private',
			module      : 'accruals',
			feature     : 'accruals',
		},
		{
			api         : 'patch_pnl_accrual_archive',
			access_type : 'private',
			module      : 'accruals',
			feature     : 'accruals',
		},
		{
			api         : 'put_pnl_accrual_freeze_period',
			access_type : 'private',
			module      : 'accruals',
			feature     : 'accruals',
		},
		{
			api         : 'delete_pnl_accrual_archive',
			access_type : 'private',
			module      : 'accruals',
			feature     : 'accruals',
		},
		{
			api         : 'get_pnl_statement_report',
			access_type : 'private',
		},
		{
			api         : 'get_pnl_statement_segments',
			access_type : 'private',
		},
		{
			api         : 'get_pnl_statement_customizations',
			access_type : 'private',
		},
		{
			api         : 'delete_pnl_statement_customizations',
			access_type : 'private',
		},
		{
			api         : 'get_pnl_statement_list_customizations',
			access_type : 'private',
		},
		{
			api         : 'post_pnl_statement_turnover_ratios',
			access_type : 'private',
		},
		{
			api         : 'get_pnl_statement_turnover_ratios',
			access_type : 'private',
		},
		{
			api         : 'get_pnl_statement_locked_periods',
			access_type : 'private',
		},
		{
			api         : 'delete_pnl_statement_salary',
			access_type : 'private',
		},
		{
			api         : 'post_pnl_statement_source_file',
			access_type : 'private',
		},
	],
	account_payables: [
		{
			api         : 'create_organization_document',
			access_type : 'private',
		},
		{
			api          : 'list_organization_trade_parties',
			access_type  : 'private',
			service_name : 'organization',
			feature      : 'trade_party',
		},
		{
			api         : 'get_purchase_bills_sid_details_by_id',
			access_type : 'private',
		},
		{
			api         : 'list_organization_trade_party_details',
			access_type : 'private',
		},
		{
			api          : 'create_outgoing_call',
			access_type  : 'private',
			service_name : 'voice_call',
			module       : 'Outstanding',
			feature      : 'Outstanding',
		},
		{
			api         : 'get_payments_settlement_history',
			access_type : 'private',
			module      : 'Outstanding',
			feature     : 'Outstanding',
		},
		{
			api         : 'get_payments_report_supplier_outstanding',
			access_type : 'private',
			module      : 'Outstanding',
			feature     : 'Outstanding',
		},
		{
			api         : 'get_payments_outstanding_by_supplier',
			access_type : 'private',
			module      : 'Outstanding',
			feature     : 'Outstanding',
		},
		{
			api         : 'get_purchase_payable_bill_list',
			access_type : 'private',
			module      : 'Outstanding',
			feature     : 'Outstanding',
		},
		{
			api         : 'list_organization_users',
			access_type : 'private',
			module      : 'Outstanding',
			feature     : 'Outstanding',
		},
		{
			api         : 'get_purchase_bills_by_id_bill_time_line',
			access_type : 'private',
		},
		{
			api         : 'get_common_job_profit',
			access_type : 'private',
		},
		{
			api         : 'get_purchase_bills_supplier_details',
			access_type : 'private',
		},
		{
			api         : 'get_shipment_cost_sheet',
			access_type : 'private',
		},
		{
			api         : 'list_organization_documents',
			access_type : 'private',
		},
		{
			api          : 'list_cogo_entities',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api         : 'list_organizations',
			access_type : 'private',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api         : 'get_available_balance_currency_wise',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'update_partners_bank_balance',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_purchase_payable_dashboard_total_payable',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_purchase_payable_dashboard_today_payable',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_purchase_payable_dashboard_next_payable',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_purchase_payable_dashboard_age_payable',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_purchase_payable_dashboard_asset_and_nonassets',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_purchase_payable_dashboard_overall_summary',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_purchase_payable_dashboard_service_stats',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_purchase_payable_dashboard_stats',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'post_purchase_payable_tolerance',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_purchase_payable_tolerance',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_purchase_payable_dashboard_paybles_by_service',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_purchase_payable_dashboard_daily_payable_outstanding',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_purchase_payable_dashboard_events_trend',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_purchase_payable_dashboard_total_paybles',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_purchase_payable_dashboard_bill_tat',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_payments_outstanding_paybles_info',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_payments_outstanding_top_ten_service_providers',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_purchase_payable_dashboard_age_payable',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_purchase_treasury_treasury_stats',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_payments_outstanding_by_supplier',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'post_purchase_dispute',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'get_purchase_payable_bill_list',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'get_payments_outstanding_bill_overall',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'get_purchase_payrun_bill',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'delete_purchase_payrun_bill',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'get_purchase_bills_by_id_remarks',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'put_purchase_bills_by_id_release',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'put_purchase_bills_by_id_dispute',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'put_purchase_bills_by_id_reject',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'get_purchase_payable_bill_generate_invoice',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'get_purchase_bills_bill_state',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'put_purchase_payrun_bill',
			access_type : 'private',
			module      : 'payrun',
			feature     : 'payrun',
		},
		{
			api         : 'get_purchase_payrun_bill_list_paid_bill',
			access_type : 'private',
			module      : 'payrun',
			feature     : 'payrun',
		},
		{
			api         : 'post_purchase_payrun_bill_allot_bank',
			access_type : 'private',
			module      : 'payrun',
			feature     : 'payrun',
		},
		{
			api         : 'get_purchase_audit',
			access_type : 'private',
			module      : 'payrun',
			feature     : 'payrun',
		},
		{
			api         : 'get_purchase_payable_bank_list',
			access_type : 'private',
			module      : 'payrun',
			feature     : 'payrun',
		},
		{
			api         : 'post_purchase_payrun',
			access_type : 'private',
			module      : 'payrun',
			feature     : 'payrun',
		},
		{
			api         : 'delete_purchase_payrun',
			access_type : 'private',
			module      : 'payrun',
			feature     : 'payrun',
		},
		{
			api         : 'get_purchase_payrun',
			access_type : 'private',
			module      : 'payrun',
			feature     : 'payrun',
		},
		{
			api         : 'get_purchase_payrun_list_supplier',
			access_type : 'private',
			module      : 'payrun',
			feature     : 'payrun',
		},
		{
			api         : 'get_purchase_payrun_bill_list_paid_bill_by_id',
			access_type : 'private',
			module      : 'payrun',
			feature     : 'payrun',
		},
		{
			api         : 'delete_purchase_payrun_suppliers',
			access_type : 'private',
			module      : 'payrun',
			feature     : 'payrun',
		},
		{
			api         : 'post_purchase_payrun_upload',
			access_type : 'private',
			module      : 'payrun',
			feature     : 'payrun',
		},
		{
			api         : 'get_purchase_payrun_download',
			access_type : 'private',
			module      : 'payrun',
			feature     : 'payrun',
		},
		{
			api         : 'post_purchase_bills_post_to_sage',
			access_type : 'private',
			module      : 'payrun',
			feature     : 'payrun',
		},
		{
			api         : 'get_purchase_payment_upload_list',
			access_type : 'private',
			module      : 'payrun',
			feature     : 'payrun',
		},
		{
			api         : 'get_purchase_payrun_bill_list_view',
			access_type : 'private',
			module      : 'payrun',
			feature     : 'payrun',
		},
		{
			api         : 'get_purchase_payrun_bill_list_view_download',
			access_type : 'private',
			module      : 'payrun',
			feature     : 'payrun',
		},
		{
			api         : 'get_purchase_report_paid_bills',
			access_type : 'private',
			module      : 'payrun',
			feature     : 'payrun',
		},
		{
			api         : 'post_purchase_treasury_req_fund_allocation',
			access_type : 'private',
			module      : 'payrun',
			feature     : 'payrun',
		},
		{
			api         : 'get_purchase_treasury_live_status',
			access_type : 'private',
			module      : 'treasury',
			feature     : 'treasury',
		},
		{
			api         : 'get_purchase_treasury_report',
			access_type : 'private',
			module      : 'treasury',
			feature     : 'treasury',
		},
		{
			api         : 'get_purchase_treasury_report_details',
			access_type : 'private',
			module      : 'treasury',
			feature     : 'treasury',
		},
		{
			api         : 'post_purchase_treasury_allocate_fund',
			access_type : 'private',
			module      : 'treasury',
			feature     : 'treasury',
		},
		{
			api         : 'put_purchase_treasury_reject_fund_req',
			access_type : 'private',
			module      : 'treasury',
			feature     : 'treasury',
		},
		{
			api          : 'get_channel_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_servetel_communication_log',
			access_type  : 'private',
			service_name : 'voice_call',
		},
		{
			api         : 'get_purchase_payable_bill_overseas_details',
			access_type : 'private',
			module      : 'Overseas',
			feature     : 'Overseas',
		},
		{
			api         : 'get_purchase_payable_bill_shipment_documents',
			access_type : 'private',
			module      : 'Overseas',
			feature     : 'Overseas',
		},
		{
			api         : 'get_purchase_payrun_download_overseas_utr',
			access_type : 'private',
			module      : 'Overseas',
			feature     : 'Overseas',
		},
		{
			api         : 'get_purchase_bills_list_overseas_trade_parties',
			access_type : 'private',
			module      : 'Overseas',
			feature     : 'Overseas',
		},
		{
			api         : 'post_purchase_payrun_download_zip',
			access_type : 'private',
			module      : 'Overseas',
			feature     : 'Overseas',
		},
		{
			api         : 'post_purchase_payrun_upload_documents',
			access_type : 'private',
			module      : 'Overseas',
			feature     : 'Overseas',
		},
		{
			api         : 'delete_purchase_payrun_documents',
			access_type : 'private',
			module      : 'Overseas',
			feature     : 'Overseas',
		},
		{
			api         : 'post_purchase_payrun_merged_pdf_by_id',
			access_type : 'private',
			module      : 'Overseas',
			feature     : 'Overseas',
		},

	],
	overheads: [
		{
			api         : 'post_purchase_expense_send_email',
			access_type : 'private',
			module      : 'Expenses',
			feature     : 'Expenses',
		},
		{
			api         : 'get_purchase_expense_list_expense_configurations',
			access_type : 'private',
			module      : 'Expenses',
			feature     : 'Expenses',
		},
		{
			api         : 'get_purchase_expense_list',
			access_type : 'private',
			module      : 'Expenses',
			feature     : 'Expenses',
		},
		{
			api         : 'get_purchase_expense_stakeholder',
			access_type : 'private',
			module      : 'Expenses',
			feature     : 'Expenses',
		},
		{
			api         : 'post_purchase_expense_expense_configuration',
			access_type : 'private',
			module      : 'Expenses',
			feature     : 'Expenses',
		},
		{
			api         : 'get_purchase_expense_list_vendors',
			access_type : 'private',
			module      : 'Vendors',
			feature     : 'Vendors',
		},
		{
			api         : 'post_purchase_expense',
			access_type : 'private',
			module      : 'Expenses',
			feature     : 'Expenses',
		},
		{
			api         : 'put_purchase_bills_status',
			access_type : 'private',
			module      : 'Expenses',
			feature     : 'Expenses',
		},
		{
			api         : 'put_purchase_expense_expense_configuration',
			access_type : 'private',
			module      : 'Expenses',
			feature     : 'Expenses',
		},
		{
			api         : 'list_cogo_entities',
			access_type : 'private',
		},
		{
			api          : 'list_organization_trade_parties',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_vendors',
			access_type  : 'private',
			service_name : 'vendor',
		},
		{
			api         : 'post_common_tax_list_item_taxes',
			access_type : 'private',
			module      : 'Expenses',
			feature     : 'Expenses',
		},
	],
	my_incident: [
		{
			api         : 'get_incident_management_incident_list',
			access_type : 'private',
			module      : 'myIncident',
			feature     : 'myIncident',
		},
		{
			api         : 'patch_incident_management_incident_user_incident_status',
			access_type : 'private',
			module      : 'myIncident',
			feature     : 'myIncident',
		},
		{
			api         : 'post_incident_management_incident_raise_again',
			access_type : 'private',
			module      : 'myIncident',
			feature     : 'myIncident',
		},
		{
			api         : 'patch_incident_management_incident_edit_notes',
			access_type : 'private',
			module      : 'myIncident',
			feature     : 'myIncident',

		},
	],
	vendor_payment: [
		{
			api          : 'list_vendor_payments',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_vendor_payment_with_sage_job',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
	],
	account_receivables: [
		{
			api         : 'list_organizations',
			access_type : 'private',
		},
		{
			api         : 'list_cogo_entities',
			access_type : 'private',
		},
		{
			api         : 'get_shipment_cost_sheet',
			access_type : 'private',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api         : 'get_organization_zone_via_org_id',
			access_type : 'private',
		},
		{
			api         : 'get_sales_dashboard_overall_stats',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_sales_dashboard_daily_sales_outstanding',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_sales_dashboard_collection_trend',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},

		{
			api         : 'get_sales_dashboard_monthly_outstanding',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_sales_dashboard_quarterly_outstanding',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_sales_dashboard_outstanding_by_age',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_sales_dashboard_receivables_by_age',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_sales_dashboard_sales_trend',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_payments_dashboard_outstanding_by_age',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_payments_dashboard_quarterly_outstanding',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_payments_dashboard_kam_wise_outstanding',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_payments_dashboard_daily_sales_outstanding',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_payments_dashboard_sales_funnel',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_payments_dashboard_outstanding',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_payments_dashboard_line_graph_view',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_payments_dashboard_invoice_tat_stats',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'get_payments_dashboard_daily_sales_statistics',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},
		{
			api         : 'list_cogo_entities',
			access_type : 'private',
			module      : 'Dashboard',
			feature     : 'Dashboard',
		},

		{
			api         : 'get_sales_outstanding',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'get_sales_outstanding_invoice_list',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'post_sales_invoice_by_id_irn_generate',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'post_sales_invoice_post_to_sage',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'post_sales_invoice_by_id_irn_cancel',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'get_sales_invoice_generate_pdf',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'post_sales_outstanding_ledger_summary',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'post_sales_outstanding_create_communication',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'get_sales_outstanding_overall',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},

		{
			api         : 'get_sales_report_download_outstanding_list',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'get_sales_invoice_timeline_by_id',
			access_type : 'private',
			module      : 'invoices',
			feature     : 'invoices',
		},
		{
			api         : 'list_organization_trade_party_details',
			access_type : 'private',
			module      : 'Bpr',
			feature     : 'Bpr',
		},
		{
			api         : 'delete_payments_defaulters_by_id',
			access_type : 'private',
			module      : 'Bpr',
			feature     : 'Bpr',
		},
		{
			api         : 'post_payments_defaulters',
			access_type : 'private',
			module      : 'Bpr',
			feature     : 'Bpr',
		},
		{
			api         : 'get_payments_defaulters_list',
			access_type : 'private',
			module      : 'Bpr',
			feature     : 'Bpr',
		},
		{
			api         : 'get_payments_settlement',
			access_type : 'private',
			module      : 'outstanding',
			feature     : 'outstanding',
		},
		{
			api         : 'list_organization_users',
			access_type : 'private',
			module      : 'outstanding',
			feature     : 'outstanding',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'outstanding',
			feature      : 'outstanding',

		},
		{
			api         : 'get_partner_user_rm_mapping',
			access_type : 'private',
			module      : 'outstanding',
			feature     : 'outstanding',
		},
		{
			api         : 'get_sales_invoice_timeline_by_id',
			access_type : 'private',
			module      : 'outstanding',
			feature     : 'outstanding',
		},
		{
			api         : 'post_sales_invoice_by_id_irn_cancel',
			access_type : 'private',
			module      : 'outstanding',
			feature     : 'outstanding',
		},
		{
			api         : 'post_sales_invoice_by_id_irn_generate',
			access_type : 'private',
			module      : 'outstanding',
			feature     : 'outstanding',
		},
		{
			api         : 'get_payments_outstanding_by_customer',
			access_type : 'private',
			module      : 'outstanding',
			feature     : 'outstanding',
		},
		{
			api         : 'get_sales_outstanding_invoice_list',
			access_type : 'private',
			module      : 'outstanding',
			feature     : 'outstanding',
		},
		{
			api         : 'get_sales_report_download_outstanding_list',
			access_type : 'private',
			module      : 'outstanding',
			feature     : 'outstanding',
		},

		{
			api         : 'get_payments_outstanding_customer_payment',
			access_type : 'private',
			module      : 'outstanding',
			feature     : 'outstanding',
		},

		{
			api         : 'get_payments_settlement_history',
			access_type : 'private',
			module      : 'outstanding',
			feature     : 'outstanding',
		},

		{
			api         : 'post_sales_invoice_post_to_sage',
			access_type : 'private',
			module      : 'outstanding',
			feature     : 'outstanding',
		},

	],
	incident_controller: [
		{
			api         : 'get_incident_management_incident_list',
			access_type : 'private',
		},
		{
			api         : 'patch_incident_management_incident_by_id',
			access_type : 'private',
		},
		{
			api         : 'post_payments_journal_voucher_approve',
			access_type : 'private',
		},
		{
			api         : 'post_payments_journal_voucher_reject',
			access_type : 'private',
		},
	],
	vietnam_account_receivables: [
		{
			api         : 'get_sales_invoice_list',
			access_type : 'private',
		},
		{
			api         : 'post_sales_upload_translated_invoice',
			access_type : 'private',
		},
	],
	business_finance_dashboard: [
		{
			api         : 'get_payments_dashboard_finance_profitability_shipment',
			access_type : 'private',
		},
		{
			api         : 'get_payments_dashboard_finance_profitability_customer',
			access_type : 'private',
		},
		{
			api         : 'get_payments_dashboard_finance_service_wise_rec_pay',
			access_type : 'private',
		},
		{
			api         : 'get_payments_dashboard_finance_service_wise_overdue',
			access_type : 'private',
		},
		{
			api         : 'get_payments_dashboard_finance_income_expense',
			access_type : 'private',
		},
		{
			api         : 'get_payments_dashboard_finance_receivable_payable',
			access_type : 'private',
		},
		{
			api         : 'get_payments_dashboard_finance_today_stats',
			access_type : 'private',
		},
		{
			api         : 'get_purchase_treasury_treasury_stats',
			access_type : 'private',
		},
	],
	translate: [
		{
			api         : 'get_translation_translate_list',
			access_type : 'private',
		},
		{
			api         : 'put_translation_translate',
			access_type : 'private',
		},
		{
			api         : 'post_translation_translate',
			access_type : 'private',
		},

		{
			api         : 'post_translation_translate_bulk',
			access_type : 'private',
		},

	],
	reports: [
		{
			api         : 'get_muneem_reports_profitability',
			access_type : 'private',
		},
		{
			api         : 'get_muneem_reports_sage_purchase_report',
			access_type : 'private',
		},
		{
			api         : 'get_muneem_reports_sage_sales_report',
			access_type : 'private',
		},
		{
			api         : 'get_muneem_reports_sage_customers_data',
			access_type : 'private',
		},
		{
			api         : 'get_muneem_reports_sage_suppliers_data',
			access_type : 'private',
		},
		{
			api         : 'get_muneem_reports_sage_organization_mapping_id_report',
			access_type : 'private',
		},
		{
			api         : 'get_muneem_reports_platform_sales_report',
			access_type : 'private',
		},
		{
			api         : 'get_muneem_reports_platform_purchase_report',
			access_type : 'private',
		},
		{
			api         : 'get_muneem_reports_sales_report_for_reconciliation',
			access_type : 'private',
		},
		{
			api         : 'get_muneem_reports_partial_or_unpaid_bills',
			access_type : 'private',
		},
		{
			api         : 'get_muneem_reports_ap_bills_auditor',
			access_type : 'private',
		},
		{
			api         : 'get_muneem_reports_ar_invoices_auditor',
			access_type : 'private',
		},
		{
			api         : 'get_muneem_reports_finance_ap_dashboard_on_finance_accepted',
			access_type : 'private',
		},
		{
			api         : 'get_muneem_reports_bill_payment_status_mismatch',
			access_type : 'private',
		},
		{
			api         : 'get_muneem_reports_bills_account_utilization_mismatch',
			access_type : 'private',
		},
		{
			api         : 'get_muneem_reports_invoice_account_utilization_amount_mismatch',
			access_type : 'private',
		},
		{
			api         : 'get_muneem_reports_invoice_payment_status_mismatch',
			access_type : 'private',
		},
	],
	settlement: [
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api         : 'list_cogo_entities',
			access_type : 'private',
		},
		{
			api          : 'list_organization_trade_parties',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_trade_party_details',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_sales_accounts_bulk_upload',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api         : 'post_payments_journal_voucher_post_to_sage',
			access_type : 'private',
			module      : 'settlement',
			feature     : 'settlement',
		},
		{
			api         : 'get_organization_zone_via_org_id',
			access_type : 'private',
		},
		{
			api         : 'get_payments_settlement_account_balance',
			access_type : 'private',
			module      : 'settlement',
			feature     : 'settlement',
		},
		{
			api         : 'post_payments_accounts_ap_bulk_upload',
			access_type : 'private',
			module      : 'settlement',
			feature     : 'settlement',
		},
		{
			api         : 'get_payments_settlement_documents',
			access_type : 'private',
			module      : 'settlement',
			feature     : 'settlement',
		},
		{
			api         : 'update_organization_trade_party',
			access_type : 'private',
			module      : 'tds-settlement',
			feature     : 'tds-settlement',
		},
		{
			api         : 'post_payments_settlement_editTds',
			access_type : 'private',
			module      : 'tds-settlement',
			feature     : 'tds-settlement',
		},
		{
			api         : 'get_payments_settlement_tds_documents',
			access_type : 'private',
			module      : 'tds-settlement',
			feature     : 'tds-settlement',
		},
		{
			api         : 'get_payments_settlement_org_summary',
			access_type : 'private',
			module      : 'tds-settlement',
			feature     : 'tds-settlement',
		},
		{
			api         : 'get_payments_settlement_history',
			access_type : 'private',
			module      : 'history',
			feature     : 'history',
		},
		{
			api         : 'post_payments_settlement_edit',
			access_type : 'private',
			module      : 'history',
			feature     : 'history',
		},
		{
			api         : 'get_payments_settlement',
			access_type : 'private',
			module      : 'history',
			feature     : 'history',
		},
		{
			api         : 'delete_payments_settlement',
			access_type : 'private',
			module      : 'history',
			feature     : 'history',
		},
		{
			api         : 'get_payments_settlement_check',
			access_type : 'private',
			module      : 'match',
			feature     : 'match',
		},
		{
			api         : 'post_payments_send_for_approval',
			access_type : 'private',
			module      : 'match',
			feature     : 'match',
		},
		{
			api         : 'post_payments_settlement_settle',
			access_type : 'private',
			module      : 'match',
			feature     : 'match',
		},
		{
			api         : 'post_payments_settlement_edit',
			access_type : 'private',
			module      : 'match',
			feature     : 'match',
		},
		{
			api         : 'post_payments_settlement_check',
			access_type : 'private',
			module      : 'match',
			feature     : 'match',
		},
		{
			api         : 'get_sales_accounts',
			access_type : 'private',
			module      : 'onAccount',
			feature     : 'onAccount',
		},
		{
			api         : 'get_purchase_payable_bank_list',
			access_type : 'private',
			module      : 'onAccount',
			feature     : 'onAccount',
		},
		{
			api         : 'delete_sales_accounts',
			access_type : 'private',
			module      : 'onAccount',
			feature     : 'onAccount',
		},
		{
			api         : 'post_payments_accounts_post_to_sage',
			access_type : 'private',
			module      : 'onAccount',
			feature     : 'onAccount',
		},
		{
			api         : 'put_sales_accounts',
			access_type : 'private',
			module      : 'onAccount',
			feature     : 'onAccount',
		},
		{
			api         : 'post_sales_accounts',
			access_type : 'private',
			module      : 'onAccount',
			feature     : 'onAccount',
		},
		{
			api         : 'post_sales_accounts_download_sample',
			access_type : 'private',
			module      : 'onAccount',
			feature     : 'onAccount',
		},
		{
			api         : 'get_payments_journal_voucher_list',
			access_type : 'private',
			module      : 'JournalVoucher',
			feature     : 'JournalVoucher',
		},
		{
			api         : 'get_payments_icjv_list',
			access_type : 'private',
			module      : 'ICJV',
			feature     : 'ICJV',
		},
		{
			api         : 'post_payments_icjv',
			access_type : 'private',
			module      : 'ICJV',
			feature     : 'ICJV',
		},
		{
			api         : 'post_payments_journal_voucher',
			access_type : 'private',
			module      : 'JournalVoucher',
			feature     : 'JournalVoucher',
		},
		{
			api          : 'get_exchange_rate',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
	],
	tracking: [
		{
			api          : 'list_events',
			access_type  : 'private',
			service_name : 'event',
		},
		{
			api          : 'get_unique_event_names',
			access_type  : 'private',
			service_name : 'event',
		},
		{
			api          : 'list_event_mappings',
			access_type  : 'private',
			service_name : 'event',
		},
	],
	booking_tasks: [
		{
			api          : 'list_shipment_task_configs',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'create_shipment_task_config',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'delete_shipment_task_config',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'move_shipment_task_config',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'update_shipment_task_config',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_shipment_process',
			access_type  : 'private',
			service_name : 'shipment',
		},
	],

	campaigns: [
		{
			api          : 'get_campaign_nodes_result',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_campaign_node_details',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_campaign_tracking_stats',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_campaign_overall_stats',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_campaigns',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_conditions',
			access_type  : 'private',
			service_name : 'condition',
		},
		{
			api          : 'get_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'create_campaign_edge',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_mailjet_templates',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'update_campaign_node_configuration',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_campaign_audiences',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'create_campaign_segment',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_communication_templates',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'create_email_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_unique_event_names',
			access_type  : 'private',
			service_name : 'event',
		},
		{
			api          : 'create_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'update_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'publish_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'create_campaign_node',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'update_campaign_node',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'update_campaign_edge_status',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'delete_campaign_edge',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'delete_campaign_node',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'undo_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'redo_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'check_campaign_publishability',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'auto_align_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'stop_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_campaign_tags',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_campaign_communication_stats',
			access_type  : 'private',
			service_name : 'campaign',
		},

		{
			api          : 'get_template_tags',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_event_mappings',
			access_type  : 'private',
			service_name : 'event',
		},
		{
			api          : 'check_active_rules',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_communication_stat_details',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'get_campaign_rule',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'update_campaign_rule',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'update_campaign_email_configuration',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'create_campaign_email_configuration',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_campaign_email_configuration',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'create_channel_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_previous_campaign_stats',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_segment_dashboard',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_campaign_graphs_stats_dashboard',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_campaign_names',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_campaign_nodes',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_campaign_channel_availability',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'verify_segment',
			access_type  : 'private',
			service_name : 'segmentation',
		},
		{
			api          : 'list_segments',
			access_type  : 'private',
			service_name : 'segmentation',
		},
		{
			api          : 'get_segment',
			access_type  : 'private',
			service_name : 'segmentation',
		},
		{
			api          : 'get_campaign_failure_stats',
			access_type  : 'private',
			service_name : 'campaign',
		},
	],
	campaign_dashboard: [
		{
			api          : 'create_campaign_segment',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_campaign_failure_stats',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_campaign_node_details',
			access_type  : 'private',
			service_name : 'campaign',
		},

		{
			api          : 'get_campaign_tracking_stats',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_campaign_journey_metrics',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_campaign_overall_stats',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_campaigns',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_conditions',
			access_type  : 'private',
			service_name : 'condition',
		},
		{
			api          : 'get_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'create_campaign_edge',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_mailjet_templates',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'update_campaign_node_configuration',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_campaign_audiences',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'create_campaign_segment',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_communication_templates',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'create_email_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_unique_event_names',
			access_type  : 'private',
			service_name : 'event',
		},
		{
			api          : 'create_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'update_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'publish_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'create_campaign_node',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'update_campaign_node',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'update_campaign_edge_status',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'delete_campaign_edge',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'delete_campaign_node',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'undo_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'redo_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'check_campaign_publishability',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'auto_align_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'stop_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_campaign_tags',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_campaign_communication_stats',
			access_type  : 'private',
			service_name : 'campaign',
		},

		{
			api          : 'get_template_tags',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_event_mappings',
			access_type  : 'private',
			service_name : 'event',
		},
		{
			api          : 'check_active_rules',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_communication_stat_details',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'get_campaign_rule',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'update_campaign_rule',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'update_campaign_email_configuration',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'create_campaign_email_configuration',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_campaign_email_configuration',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'create_channel_campaign',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_previous_campaign_stats',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_segment_dashboard',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_campaign_graphs_stats_dashboard',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_campaign_names',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_campaign_nodes',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_campaign_channel_availability',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'verify_segment',
			access_type  : 'private',
			service_name : 'segmentation',
		},
		{
			api          : 'list_segments',
			access_type  : 'private',
			service_name : 'segmentation',
		},
		{
			api          : 'get_segment',
			access_type  : 'private',
			service_name : 'segmentation',
		},
		{
			api          : 'get_recurring_campaign_stats',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_campaign_nodes_result',
			access_type  : 'private',
			service_name : 'campaign',
		},
	],
	segmentation: [
		{
			api          : 'list_lead_organizations',
			access_type  : 'private',
			service_name : 'lead',
		},
		{
			api          : 'list_lead_users',
			access_type  : 'private',
			service_name : 'lead',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_lead_segments',
			access_type  : 'private',
			service_name : 'lead',
		},
		{
			api          : 'update_segment',
			access_type  : 'private',
			service_name : 'segmentation',
		},
		{
			api          : 'assign_campaign_segment_with_filters',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_campaign_audiences',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'create_segment',
			access_type  : 'private',
			service_name : 'segmentation',
		},

		{
			api          : 'get_segment',
			access_type  : 'private',
			service_name : 'segmentation',
		},
		{
			api          : 'get_unique_event_names',
			access_type  : 'private',
			service_name : 'event',
		},
		{
			api          : 'get_unique_event_data',
			access_type  : 'private',
			service_name : 'event',
		},
		{
			api          : 'list_event_mappings',
			access_type  : 'private',
			service_name : 'event',
		},
		{
			api          : 'get_segment_audience',
			access_type  : 'private',
			service_name : 'segmentation',
		},
		{
			api          : 'get_segment_segregation_data',
			access_type  : 'private',
			service_name : 'segmentation',
		},
		{
			api          : 'get_utm_campaign_audience_data',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'list_auth_roles',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'list_segmentations',
			access_type  : 'private',
			service_name : 'segmentation',
		},
		{
			api          : 'list_segmentation_users',
			access_type  : 'private',
			service_name : 'segmentation',
		},
		{
			api          : 'get_segment_stats',
			access_type  : 'private',
			service_name : 'segmentation',
		},
		{
			api          : 'list_segment_audiences',
			access_type  : 'private',
			service_name : 'segmentation',
		},
		{
			api          : 'get_segment_tags',
			access_type  : 'private',
			service_name : 'segmentation',
		},
		{
			api          : 'list_cogo_entities',
			access_type  : 'private',
			service_name : 'segmentation',
		},
	],
	templates: [
		{
			api          : 'list_communication_templates',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'update_communication_template',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'get_template_tags',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'create_communication_template',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'get_communication_template',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'get_service_variable',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'get_campaign_channel_availability',
			access_type  : 'private',
			service_name : 'campaign',
		},
		{
			api          : 'get_communication_template_developer_view',
			access_type  : 'public',
			service_name : 'communication',
		},
		{
			api          : 'update_communication_whatsapp_template_status',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'get_communication_content_spam_words',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'create_communication_test_template',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'create_communication_template_suggestions',
			access_type  : 'private',
			service_name : 'communication',
		},
	],
	cogopoints: [
		{
			api          : 'list_checkout_applicable_promocodes',
			access_type  : 'private',
			feature      : 'search',
			service_name : 'checkout',
		},
		{
			api          : 'create_cogopoint_credit_rule',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'update_cogopoint_price_value',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'update_cogopoint_redemption_rule',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'get_cogopoint_unit_price_mapping',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'list_cogopoint_redemption_rules',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'create_cogopoint',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'get_cogopoint',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'update_cogopoint_credit_rule',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'list_cogopoint_rules',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'list_cogopoint_milestones',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'get_cogostore_consumption_graph',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'create_cogopoint_milestone',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'update_cogopoint_milestone',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'list_cogopoint_milestone_events',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'list_cogopoint_expiry_rules',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'update_cogopoint_expiry_rule',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'get_cogopoint_history_detail',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'list_user_cogopoint_histories',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'get_cogopoint_user_dashboard',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'get_organization_cogopoint_profile',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'list_cogostore_voucher_brands',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'get_cogostore_brand_details',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'update_cogostore_brand_details',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'list_cogostore_voucher_stats',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'list_cogostore_orders',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'get_cogostore_voucher_stats',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'get_cogostore_complaint',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'update_cogostore_gyftr_catalogue',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'create_cogostore_communication',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'get_cogostore_rule',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'update_cogostore_rule',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'create_wallet_balance',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'update_cogostore_brand_status',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
	],
	communication_control: [
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'communication_control',
		},
		{
			api          : 'update_user_alert_preference',
			access_type  : 'private',
			service_name : 'communication_control',
		},
		{
			api          : 'get_user_alert_preference',
			access_type  : 'private',
			service_name : 'communication_control',
		},
		{
			api          : 'list_segments',
			access_type  : 'private',
			service_name : 'segmentation',
		},
		{
			api          : 'list_communication_segment_controls',
			access_type  : 'private',
			service_name : 'communication_control',
		},
		{
			api          : 'create_communication_segment_control',
			access_type  : 'private',
			service_name : 'communication_control',
		},
		{
			api          : 'list_communication_channel_controls',
			access_type  : 'private',
			service_name : 'communication_control',
		},
		{
			api          : 'update_communication_channel_control',
			access_type  : 'private',
			service_name : 'communication_control',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'communication_control',
		},
		{
			api          : 'create_communication_segment_control',
			access_type  : 'private',
			service_name : 'communication_control',
		},
		{
			api          : 'update_communication_segment_control',
			access_type  : 'private',
			service_name : 'communication_control',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'communication_control',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_servetel_agent',
			access_type  : 'private',
			service_name : 'voice_call',
		},
		{
			api          : 'list_servetel_agents',
			access_type  : 'private',
			service_name : 'voice_call',
		},
		{
			api          : 'update_servetel_agent',
			access_type  : 'private',
			service_name : 'voice_call',
		},
	],
	prm_feedback: [
		{
			api         : 'list_feedbacks',
			access_type : 'private',
		},
		{
			api         : 'update_feedback',
			access_type : 'private',
		},
	],
	promotions: [
		{
			api          : 'list_segments',
			access_type  : 'private',
			service_name : 'segmentation',
		},
		{

			api          : 'create_duplicate_promotion',
			access_type  : 'private',
			service_name : 'promotion',

		},
		{
			api          : 'get_promotion_shipment_stats',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'list_promotion_shipments',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'download_promotion_shipment_csv',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'list_promotions',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'create_promotion',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'update_promotion',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'list_promotion_tags',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'get_promotion',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'list_promocodes',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'publish_promotion',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'get_promotion_stats',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_auth_roles',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'get_segment',
			access_type  : 'private',
			service_name : 'segmentation',
		},
		{
			api          : 'get_segment_data',
			access_type  : 'private',
			service_name : 'segmentation',
		},
		{
			api          : 'create_kam_promotion',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'list_kam_promotions',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'get_kam_promotion_stats',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'create_promotion_budget_allocation',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'list_promotion_budget_allocations',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'get_promotion_budget_allocation_detail',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'update_agent_budget_allocation',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'update_promotion_rule',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'deactivate_promotion_budget',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'list_promotion_rules',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'create_promotion_rule',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'deactivate_promotion_rule',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'update_budget_amount',
			access_type  : 'private',
			service_name : 'budget',
		},
		{
			api          : 'get_promotion_budget_dashboard',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'publish_kam_promotion',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'update_kam_promotion',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'update_promotion_rule',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
	],
	cogo_assured: [
		{
			api          : 'create_cogo_assured_rate_sheet',
			access_type  : 'private',
			service_name : 'cogo_assured_rate',
		},
		{
			api          : 'list_cogo_assured_rate_sheets',
			access_type  : 'private',
			service_name : 'cogo_assured_rate',
		},
		{
			api          : 'create_cogo_assured_rate',
			access_type  : 'private',
			service_name : 'cogo_assured_rate',
		},
		{
			api          : 'update_cogo_assured_rate',
			access_type  : 'private',
			service_name : 'cogo_assured_rate',
		},
		{
			api          : 'get_cogo_assured_rate',
			access_type  : 'private',
			service_name : 'cogo_assured_rate',
		},
		{
			api          : 'list_cogo_assured_rates',
			access_type  : 'private',
			service_name : 'cogo_assured_rate',
		},
		{
			api          : 'get_checkout_stats',
			access_type  : 'private',
			service_name : 'checkout',
		},
		{
			api          : 'get_cogo_assured_suggested_rates',
			access_type  : 'private',
			service_name : 'cogo_assured_rate',
		},
		{
			api          : 'process_cogo_assured_rate_sheet',
			access_type  : 'private',
			service_name : 'cogo_assured_rate',
		},
	],
	product_code_mapping: [
		{
			api         : 'get_common_tax_rule',
			access_type : 'private',
		},
		{
			api         : 'post_common_tax_rule',
			access_type : 'private',
		},
		{
			api         : 'put_common_tax_rule',
			access_type : 'private',
		},
		{
			api         : 'get_common_tax_level',
			access_type : 'private',
		},
		{
			api         : 'post_common_tax_level',
			access_type : 'private',
		},
		{
			api         : 'put_common_tax_level',
			access_type : 'private',
		},
		{
			api         : 'delete_common_tax_level',
			access_type : 'private',
		},
		{
			api         : 'post_common_item',
			access_type : 'private',
		},
		{
			api         : 'put_common_item',
			access_type : 'private',
		},
		{
			api         : 'get_common_item',
			access_type : 'private',
		},
		{
			api         : 'post_common_tax',
			access_type : 'private',
		},
		{
			api         : 'put_common_tax',
			access_type : 'private',
		},
		{
			api         : 'delete_common_tax_rule',
			access_type : 'private',
		},
		{
			api         : 'post_common_tax_list_item_taxes',
			access_type : 'private',
		},
		{
			api         : 'get_common_tax_list_item_taxes',
			access_type : 'private',
		},
		{
			api         : 'post_common_tax_bulk_upload',
			access_type : 'private',
		},
	],
	manual_invoice: [
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_invoicing_parties',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_organization_billing_addresses',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_documents',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_cogo_entities',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_organization_document',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'search_products_v2',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api         : 'post_purchase_bills',
			access_type : 'private',
			module      : 'purchase_invoice',
			feature     : 'purchase_invoice',
		},
		{
			api         : 'get_purchase_bills_list',
			access_type : 'private',
			module      : 'purchase_invoice',
			feature     : 'purchase_invoice',
		},
		{
			api         : 'post_sales_invoice_update_invoice_status',
			access_type : 'private',
			module      : 'sales_invoice',
			feature     : 'sales_invoice',
		},
		{
			api         : 'get_sales_invoice_list',
			access_type : 'private',
			module      : 'sales_invoice',
			feature     : 'sales_invoice',
		},
		{
			api         : 'put_purchase_bills_status',
			access_type : 'private',
			module      : 'purchase_invoice',
			feature     : 'purchase_invoice',
		},
		{
			api         : 'get_sales_invoice',
			access_type : 'private',
			module      : 'sales_invoice',
			feature     : 'sales_invoice',
		},
		{
			api         : 'post_sales_invoice',
			access_type : 'private',
			module      : 'sales_invoice',
			feature     : 'sales_invoice',
		},
		{
			api         : 'post_sales_invoice_upload_ltl',
			access_type : 'private',
			module      : 'sales_invoice',
			feature     : 'sales_invoice',
		},
		{
			api         : 'post_purchase_bills',
			access_type : 'private',
			module      : 'purchase_invoice',
			feature     : 'purchase_invoice',
		},
		{
			api         : 'put_sales_invoice',
			access_type : 'private',
			module      : 'sales_invoice',
			feature     : 'sales_invoice',
		},
		{
			api         : 'put_purchase_bills',
			access_type : 'private',
			module      : 'purchase_invoice',
			feature     : 'purchase_invoice',
		},
		{
			api         : 'get_sales_invoice_by_id',
			access_type : 'private',
			module      : 'sales_invoice',
			feature     : 'sales_invoice',
		},
		{
			api         : 'get_purchase_bills_by_id',
			access_type : 'private',
			module      : 'purchase_invoice',
			feature     : 'purchase_invoice',
		},
		{
			api         : 'post_purchase_bills_upload_ltl',
			access_type : 'private',
			module      : 'purchase_invoice',
			feature     : 'purchase_invoice',
		},
		{
			api         : 'get_common_job_list',
			access_type : 'private',
			module      : 'jobs',
			feature     : 'jobs',
		},
		{
			api         : 'post_common_job',
			access_type : 'private',
			module      : 'jobs',
			feature     : 'jobs',
		},
		{
			api         : 'get_common_job_by_id',
			access_type : 'private',
			module      : 'jobs',
			feature     : 'jobs',
		},
		{
			api         : 'post_common_job_open',
			access_type : 'private',
			module      : 'jobs',
			feature     : 'jobs',
		},
		{
			api         : 'post_common_job_close',
			access_type : 'private',
			module      : 'jobs',
			feature     : 'jobs',
		},
		{
			api          : 'list_sage_jobs',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'list_sales_invoice_approvals',
			access_type  : 'private',
			service_name : 'sage',
		},
		{
			api          : 'get_purchase_invoice_approvals',
			access_type  : 'private',
			service_name : 'sage',
		},
	],

	tracking_air_container_job: [
		{
			api          : 'list_untracked_air_shipments',
			access_type  : 'private',
			service_name : 'air_tracking',
		},
		{
			api          : 'list_untracked_containers',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'update_air_milestones',
			access_type  : 'private',
			service_name : 'air_tracking',
		},
		{
			api          : 'update_container_and_bl_milestones',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'get_saas_air_subscription',
			access_type  : 'private',
			service_name : 'air_tracking',
		},
		{
			api          : 'get_saas_container_subscription',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'delete_saas_container_timeline_detail',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
		{
			api          : 'update_saas_container_timeline_detail',
			access_type  : 'private',
			service_name : 'saas_traceability',
		},
	],

	ftl_freight: [
		{
			api          : 'list_ftl_freight_rates',
			access_type  : 'private',
			service_name : 'ftl_freight_rate',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_ftl_freight_rate',
			access_type  : 'private',
			service_name : 'ftl_freight_rate',
		},
		{
			api          : 'delete_ftl_freight_rate',
			access_type  : 'private',
			service_name : 'ftl_freight_rate',
		},
		{
			api          : 'get_ftl_freight_rate',
			access_type  : 'private',
			service_name : 'ftl_freight_rate',
		},
		{
			api          : 'update_ftl_freight_rate',
			access_type  : 'private',
			service_name : 'ftl_freight_rate',
		},
		{
			api          : 'create_ftl_freight_rate_bulk_operation',
			access_type  : 'private',
			service_name : 'ftl_freight_rate',
		},
		{
			api          : 'create_rate_sheet',
			access_type  : 'private',
			service_name : 'rate_sheet',
		},
		{
			api          : 'create_fcl_freight_rate_sheet',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
	],
	trailer_freight: [
		{
			api          : 'list_haulage_freight_rates',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_haulage_freight_rate',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
		},
		{
			api          : 'delete_haulage_freight_rate',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
		},
		{
			api          : 'get_haulage_freight_rate',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
		},
		{
			api          : 'update_haulage_freight_rate',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
		},
		{
			api          : 'create_haulage_freight_rate_bulk_operation',
			access_type  : 'private',
			service_name : 'haulage_freight_rate',
		},
		{
			api          : 'create_rate_sheet',
			access_type  : 'private',
			service_name : 'rate_sheet',
		},
		{
			api          : 'create_fcl_freight_rate_sheet',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
	],
	ltl_freight: [
		{
			api          : 'list_ltl_freight_rates',
			access_type  : 'private',
			// feature: 'rms',
			service_name : 'ltl_freight_rate',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_locations',
			access_type  : 'private',
			service_name : 'location',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_ltl_freight_rate',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
		},
		{
			api          : 'delete_ltl_freight_rate',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
		},
		{
			api          : 'get_ltl_freight_rate',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
		},
		{
			api          : 'create_rate_sheet',
			access_type  : 'private',
			service_name : 'rate_sheet',
		},
		{
			api          : 'create_fcl_freight_rate_sheet',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'create_ltl_freight_rate_bulk_operation',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
		},
		{
			api          : 'list_ltl_freight_rate_zones',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
		},
		{
			api          : 'create_ltl_freight_rate_zone',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
		},
		{
			api          : 'update_ltl_freight_rate_zone',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
		},
		{
			api          : 'get_ltl_freight_rate_zone',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
		},
		{
			api          : 'list_ltl_freight_rate_additional_charges',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
		},

		{
			api          : 'create_ltl_freight_rate_additional_charge',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
		},
		{
			api          : 'get_ltl_freight_rate_additional_charge',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
		},
		{
			api          : 'delete_ltl_freight_rate_additional_charge',
			access_type  : 'private',
			service_name : 'ltl_freight_rate',
		},
	],
	liability_dashboard: [
		{
			api          : 'get_cogopoint_stats',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'list_cogopoint_credit_history',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'list_cogopoint_debit_history',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'get_cogopoint_credit_stats',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_promotion_kam_history',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'list_promotion_history_details',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'list_top_promocode_users',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'get_daily_promocode_usages',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'list_promotion_history',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'get_burnt_promocodes',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'list_liability_stats',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'list_promotion_marketing_history',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'get_user_incentive_dashboard',
			access_type  : 'private',
			service_name : 'incentive',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
	],
	air_revenue_desk: [
		{
			api          : 'list_air_freight_rates',
			access_type  : 'private',
			service_name : 'air_freight_rate',
			feature      : 'Live bookings',
		},
	],
	air_supply: [
		{
			api          : 'list_air_freight_rates',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'list_cogo_entities',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_air_freight_rate_audit',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'list_air_freight_rate_locals',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'list_air_freight_rate_surcharges',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'create_air_freight_rate',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'create_air_freight_rate_local',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'create_air_freight_rate_surcharge',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
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
			api          : 'create_air_freight_rate_bulk_operation',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},

		{
			api          : 'create_domestic_air_freight_rate',
			access_type  : 'private',
			service_name : 'domestic_air_freight_rate',
		},
		{
			api          : 'create_domestic_air_freight_rate_terminal',
			access_type  : 'private',
			service_name : 'domestic_air_freight_rate',
		},
		{
			api          : 'create_domestic_air_freight_rate_surcharge',
			access_type  : 'private',
			service_name : 'domestic_air_freight_rate',
		},

		{
			api          : 'create_domestic_air_freight_rate_bulk_operation',
			access_type  : 'private',
			service_name : 'domestic_air_freight_rate',
		},

		{
			api          : 'list_domestic_air_freight_rates',
			access_type  : 'private',
			service_name : 'domestic_air_freight_rate',
		},
		{
			api          : 'list_domestic_air_freight_rate_terminals',
			access_type  : 'private',
			service_name : 'domestic_air_freight_rate',
		},
		{
			api          : 'list_domestic_air_freight_rate_surcharges',
			access_type  : 'private',
			service_name : 'domestic_air_freight_rate',
		},
		{
			api          : 'update_domestic_air_freight_rate_surcharge',
			access_type  : 'private',
			service_name : 'domestic_air_freight_rate',
		},
		{
			api          : 'update_domestic_air_freight_rate_terminal',
			access_type  : 'private',
			service_name : 'domestic_air_freight_rate',
		},
		{
			api          : 'update_domestic_air_freight_rate',
			access_type  : 'private',
			service_name : 'domestic_air_freight_rate',
		},
		{
			api          : 'list_domestic_air_freight_charge_codes',
			access_type  : 'private',
			service_name : 'domestic_air_freight_rate',
		},
		{
			api          : 'create_rate_sheet',
			access_type  : 'private',
			service_name : 'rate_sheet',
		},
		{
			api          : 'create_fcl_freight_rate_sheet',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
		},
		{
			api          : 'update_air_freight_rate',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'list_air_freight_charge_codes',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'update_air_freight_rate_local',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'update_air_freight_rate_surcharge',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'delete_air_freight_rate_feedback',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
		{
			api          : 'delete_air_freight_rate_request',
			access_type  : 'private',
			service_name : 'air_freight_rate',
		},
	],
	pass_through_customers: [
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_settings',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_organization_setting',
			access_type  : 'private',
			service_name : 'organization',
		},
	],
	rail_freight: [
		{
			api          : 'list_rail_domestic_freight_rates',
			access_type  : 'private',
			service_name : 'rail_domestic_freight_rate',
		},
		{
			api          : 'create_rail_domestic_freight_rate',
			access_type  : 'private',
			service_name : 'rail_domestic_freight_rate',
		},
		{
			api          : 'create_rail_domestic_freight_rate_bulk_operation',
			access_type  : 'private',
			service_name : 'rail_domestic_freight_rate',
		},
		{
			api          : 'update_rail_domestic_freight_rate',
			access_type  : 'private',
			service_name : 'rail_domestic_freight_rate',
		},
		{
			api          : 'create_rail_domestic_freight_rate_free_day',
			access_type  : 'private',
			service_name : 'rail_domestic_freight_rate',
		},
		{
			api          : 'get_rail_domestic_freight_rate_free_day',
			access_type  : 'private',
			service_name : 'rail_domestic_freight_rate',
		},
		{
			api          : 'list_rail_domestic_freight_rate_free_days',
			access_type  : 'private',
			service_name : 'rail_domestic_freight_rate',
		},
		{
			api          : 'update_rail_domestic_freight_rate_free_day',
			access_type  : 'private',
			service_name : 'rail_domestic_freight_rate',
		},
	],
	voice_call: [
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_organization',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_call_history',
			access_type  : 'private',
			service_name : 'voice_call',
		},
		{
			api          : 'get_call_state',
			access_type  : 'private',
			service_name : 'voice_call',
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
			api          : 'list_user_call_details',
			access_type  : 'private',
			service_name : 'voice_call',
		},
		{
			api          : 'create_voice_call_communication_logs',
			access_type  : 'private',
			service_name : 'voice_call',
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
			api          : 'create_organization_communication_log',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_servetel_communication_log',
			access_type  : 'private',
			service_name : 'voice_call',
		},
	],
	supply_tools: [
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},

		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_fcl_weight_slabs_configuration',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'weight_slabs',
		},
		{
			api          : 'create_fcl_weight_slabs_configuration',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'weight_slabs',
		},
		{
			api          : 'update_fcl_weight_slabs_configuration',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'weight_slabs',
		},
		{
			api          : 'list_fcl_freight_rate_extension_rule_sets',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'fcl_freight_rate_extensions',
		},
		{
			api          : 'update_fcl_freight_rate_extension_rule_set',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'fcl_freight_rate_extensions',
		},
		{
			api          : 'create_fcl_freight_rate_extension_rule_set',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'fcl_freight_rate_extensions',
		},
		{
			api          : 'list_fcl_freight_commodity_clusters',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'commodity_cluster',
		},
		{
			api          : 'create_fcl_freight_commodity_cluster',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'commodity_cluster',
		},
		{
			api          : 'update_fcl_freight_commodity_cluster',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'commodity_cluster',
		},
		{
			api          : 'list_location_clusters',
			access_type  : 'private',
			service_name : 'location',
			feature      : 'fcl_freight_rate_extensions',
		},
		{
			api          : 'list_commodity_clusters',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'fcl_freight_rate_extensions',
		},
		{
			api         : 'list_rate_charge_codes',
			access_type : 'private',
			feature     : 'fcl_freight_rate_extensions',
		},
		{
			api          : 'get_location_cluster',
			access_type  : 'private',
			feature      : 'fcl_freight_rate_extensions',
			service_name : 'location',
		},
		{
			api          : 'list_fcl_freight_rate_free_days',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'detention_demurrage',
		},
		{
			api          : 'create_fcl_freight_rate_free_day',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'detention_demurrage',
		},
		{
			api          : 'update_fcl_freight_rate_free_day',
			access_type  : 'private',
			service_name : 'fcl_freight_rate',
			feature      : 'detention_demurrage',
		},
	],
	my_profile: [
		{
			api          : 'get_partner_user',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_partner_user',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_partner_user_rm_mapping',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_user_password',
			access_type  : 'private',
			service_name : 'user',
		},
		{
			api          : 'list_event_mappings',
			access_type  : 'private',
			service_name : 'event',
		},
	],
	awb_inventory: [
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_awb_inventories',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'create_awb_inventory',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'update_awb_inventory',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_airwaybill_prefix_from_airline',
			access_type  : 'private',
			service_name : 'operator',
		},
	],
	airline_booking_plugin: [
		{
			api          : 'list_air_india_awb_numbers',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'update_awb_plugin_booking_information',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'create_awb_booking_information',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'create_air_india_awb_number',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'update_air_india_awb_status',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_awb_plugin_booking_information',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'update_air_india_lms_password',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_air_india_lms_password',
			access_type  : 'private',
			service_name : 'shipment',
		},
	],
	whatsapp_communication: [
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_user_profile',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'create_communication_task_note',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'delete_communication_task_note',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'list_task_note_details',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'send_support_chat_messages',
			access_type  : 'private',
			service_name : 'communication',
		},

	],
	omni_channel: [
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_user',
			access_type  : 'private',
			service_name : 'user',
		},
		{
			api          : 'get_organization',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_user_profile',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'send_support_chat_messages',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'create_communication_task_note',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'delete_communication_task_note',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'list_task_note_details',
			access_type  : 'private',
			service_name : 'communication',
		},
	],
	cogo_verse_analytics: [
		{
			api          : 'get_cogoverse_dashboard',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'get_cogoverse_globe_data',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'get_cogoverse_platform_chat_data',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},

	],
	constants: [
		{
			api          : 'create_platform_config_constant',
			access_type  : 'private',
			service_name : 'platform_config',
		},
		{
			api          : 'list_platform_config_constants',
			access_type  : 'private',
			service_name : 'platform_config',
		},
		{
			api          : 'list_partners',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_platform_config_constant_mapping',
			access_type  : 'private',
			service_name : 'platform_config',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'update_platform_config_constant',
			access_type  : 'private',
			service_name : 'platform_config',
		},
		{
			api          : 'list_operators',
			access_type  : 'private',
			service_name : 'operator',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_auth_roles',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'create_platform_config_constant_mapping',
			access_type  : 'private',
			service_name : 'platform_config',
		},
		{
			api          : 'list_communication_templates',
			access_type  : 'private',
			service_name : 'communication',
		},
	],
	cogo_fx: [
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_organization',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_live_exchange_rate',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'update_cogofx_exchange_rate',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'get_cogofx_exchange_rates',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'update_exchange_rate_revised_cogofx',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'update_exchange_rate_cogofx_settings',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'get_exchange_rate_transactional_currencies',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'update_exchange_rate_transactional_currencies',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'get_exchange_rate_cogofx_conversions',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'list_exchange_rate_currencies',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'get_exchange_rate_analytics_data',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'list_exchange_rate_organization_approvals',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'list_organization_approvals',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_cogofx_approvals',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'update_organization_approval',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_organization_exchange_rate_approval',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_exchange_rate_currency_conversion',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'get_invoice_currency_pair_conversions',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'get_exchange_rate_approval_stats',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'get_exchange_rate_shipment_frequency_stats',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'get_exchange_rate_shipment_revenue_stats',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'get_exchange_rate_currency_pair_stats',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'get_exchange_rate_shipment_applicable_state_stats',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'get_exchange_rate_source_count_stats',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'get_exchange_rate_source_wise_revenue',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},
		{
			api          : 'update_source_exchange_rates',
			access_type  : 'private',
			service_name : 'exchange_rate',
		},

	],
	contracts: [
		{
			api          : 'get_contract_projected_stats',
			access_type  : 'private',
			service_name : 'contract',
		},
		{
			api          : 'list_contracts',
			access_type  : 'private',
			service_name : 'contract',
		},
		{
			api          : 'update_contract',
			access_type  : 'private',
			service_name : 'contract',
		},
		{
			api          : 'update_contract_service',
			access_type  : 'private',
			service_name : 'contract',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_shipments_avg_price',
			access_type  : 'private',
			service_name : 'unified_dashboard',
		},
		{
			api          : 'get_contract_port_pair_projected_stats',
			access_type  : 'private',
			service_name : 'contract',
		},
	],
	ground_ops: [
		{
			api         : 'get_air_coe_pending_tasks_list',
			access_type : 'private',
		},
		{
			api         : 'get_air_coe_documents_list',
			access_type : 'private',
		},
		{
			api         : 'get_air_coe_documents',
			access_type : 'private',
		},
		{
			api          : 'list_locations',
			access_type  : 'private',
			service_name : 'location',
		},
		{
			api          : 'list_operators',
			access_type  : 'private',
			service_name : 'operator',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_shipment_document',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'update_shipment_document',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_rate_charge_codes',
			access_type  : 'private',
			service_name : 'rate_sheet',
		},
	],
	cost_booking: [
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_shipment_air_csr_sheets',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'create_shipment_air_csr_sheet',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'update_shipment_air_csr_ocr_data',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_cogo_entities',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'update_shipment_air_csr_sheet',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'create_shipment_air_freight_consolidated_invoice',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_organization_trade_parties',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'get_shipment_air_csr_ocr_data',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'list_shipment_air_freight_consolidated_invoices',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'update_shipment_air_freight_consolidated_invoice',
			access_type  : 'private',
			service_name : 'shipment',
		},
		{
			api          : 'update_bulk_shipment_air_freight_consolidated_invoice',
			access_type  : 'private',
			service_name : 'shipment',
		},
	],
	inventory_management: [
		{
			api          : 'list_rail_domestic_freight_inventories',
			access_type  : 'private',
			service_name : 'inventory_management',
		},
		{
			api          : 'get_rail_domestic_freight_inventories',
			access_type  : 'private',
			service_name : 'inventory_management',
		},

	],
	cogo_one: [
		{
			api          : 'get_user',
			access_type  : 'private',
			service_name : 'user',
		},
		{
			api          : 'create_organization_communication_log',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_communication_logs',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_organization',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'get_organization_cogopoint_profile',
			access_type  : 'private',
			service_name : 'cogopoint',
		},
		{
			api          : 'list_promotions',
			access_type  : 'private',
			service_name : 'promotion',
		},
		{
			api          : 'list_user_call_details',
			access_type  : 'private',
			service_name : 'voice_call',
		},
		{
			api          : 'update_agent_work_preference',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'create_omnichannel_note',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'list_omnichannel_notes',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'update_omnichannel_note',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'create_outgoing_call',
			access_type  : 'private',
			service_name : 'voice_call',
		},
		{
			api          : 'list_chat_suggestions',
			access_type  : 'private',
			service_name : 'communication',
		},
		{

			api          : 'check_outgoing_call_status',
			access_type  : 'private',
			service_name : 'voice_call',
		},
		{
			api          : 'hang_up_outgoing_call',
			access_type  : 'private',
			service_name : 'voice_call',
		},
		{
			api          : 'get_omnichannel_activity_logs',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'get_agent_work_preference',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'create_suggestion',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'bulk_assign_chat',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'assign_chat',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api: 'create_communication',

			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'get_omnichannel_customer_insights',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'update_assigned_chat',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'list_chat_agents',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'list_communication_templates',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'create_communication_template',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'get_communication_template',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'create_communication_platform_chat',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'get_lead_user',
			access_type  : 'private',
			service_name : 'lead',
		},
		{
			api          : 'list_assigned_chat_tags',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'create_platform_chat_user_onboarding',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'list_partners',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_cogoone_timelines',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'list_omnichannel_documents',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'get_omnichannel_document',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'submit_organization_kyc',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'update_omnichannel_document_details',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'create_organization_document',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'send_user_whatsapp_template',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'update_user_room',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'convert_importer_exporter_to_channel_partner',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_user_chat_summary',
			access_type  : 'private',
			service_name : 'communication',
		},
	],
	analytics_dashboard: [
		{
			api          : 'list_analytics_permitted_dashboards',
			access_type  : 'private',
			service_name : 'analytics_permissions',
		},
		{
			api          : 'get_analytics_widget_data',
			access_type  : 'private',
			service_name : 'analytics_permissions',
		},
		{
			api          : 'list_analytics_dashboard_widgets',
			access_type  : 'private',
			service_name : 'analytics_permissions',
		},
		{
			api          : 'update_widget_data_for_analytics_filtered_query',
			access_type  : 'private',
			service_name : 'analytics_permissions',
		},
		{
			api          : 'run_analytics_query',
			access_type  : 'private',
			service_name : 'analytics_permissions',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
	],
	analytics_dashboard_management: [
		{
			api          : 'create_analytics_permission_entry',
			access_type  : 'private',
			service_name : 'analytics_permissions',
		},
		{
			api          : 'list_analytics_permission_entries',
			access_type  : 'private',
			service_name : 'analytics_permissions',
		},
		{
			api          : 'list_analytics_dashboards',
			access_type  : 'private',
			service_name : 'analytics_permissions',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_auth_roles',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'list_analytics_permission_entries',
			access_type  : 'private',
			service_name : 'analytics_permissions',
		},
	],
	ticket_management: [
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'list_organizations',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_organization_users',
			access_type  : 'private',
			service_name : 'organization',
		},
		{
			api          : 'list_auth_roles',
			access_type  : 'private',
			service_name : 'auth',
		},
		{
			api          : 'get_tickets_tags',
			access_type  : 'private',
			service_name : 'tickets',
		},
		{
			api          : 'get_tickets_list',
			access_type  : 'private',
			service_name : 'tickets',
		},
		{
			api          : 'get_tickets_graph',
			access_type  : 'private',
			service_name : 'tickets',
		},
		{
			api          : 'get_tickets_stats',
			access_type  : 'private',
			service_name : 'tickets',
		},
		{
			api          : 'get_tickets_detail',
			access_type  : 'private',
			service_name : 'tickets',
		},
		{
			api          : 'get_tickets_activities',
			access_type  : 'private',
			service_name : 'tickets',
		},
		{
			api          : 'get_tickets_details',
			access_type  : 'private',
			service_name : 'tickets',
		},
		{
			api          : 'post_tickets_ticket',
			access_type  : 'private',
			service_name : 'tickets',
		},
		{
			api          : 'put_tickets_ticket',
			access_type  : 'private',
			service_name : 'tickets',
		},
		{
			api          : 'post_tickets_activity',
			access_type  : 'private',
			service_name : 'tickets',
		},
		{
			api          : 'post_tickets_reassign_reviewer',
			access_type  : 'private',
			service_name : 'tickets',
		},
		{
			api          : 'post_tickets_default_role',
			access_type  : 'private',
			service_name : 'tickets',
		},
		{
			api          : 'post_tickets_default_timing',
			access_type  : 'private',
			service_name : 'tickets',
		},
		{
			api          : 'get_tickets_default_types',
			access_type  : 'private',
			service_name : 'tickets',
		},
		{
			api          : 'post_tickets_default_type',
			access_type  : 'private',
			service_name : 'tickets',
		},
		{
			api          : 'put_tickets_default_timing',
			access_type  : 'private',
			service_name : 'tickets',
		},
		{
			api          : 'put_tickets_default_type',
			access_type  : 'private',
			service_name : 'tickets',
		},
		{
			api          : 'delete_tickets_default_timing',
			access_type  : 'private',
			service_name : 'tickets',
		},
		{
			api          : 'delete_tickets_default_type',
			access_type  : 'private',
			service_name : 'tickets',
		},
	],
};

export default partner;
