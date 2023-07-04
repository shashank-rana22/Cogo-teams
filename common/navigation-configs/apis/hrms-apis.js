const consolidated_invoices = {
	new_employee_dashboard: [
		{
			api          : 'create_employee_detail',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'list_employee_details',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'get_employee_details',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'create_employee_offer_letter',
			access_type  : 'private',
			service_name : 'hrms',
		},

		{
			api          : 'bulk_upload_employee_details',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'list_employee_signed_documents',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'get_esign_documents',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'list_employee_offer_letters',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'update_employee_bank_details',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'update_employee_document',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'list_company_documents',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'create_company_document',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'update_company_document',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'update_employee_detail',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
	],
	employee_portal: [
		{
			api          : 'get_employee_details',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'create_employee_bank_details',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'create_employee_document',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'update_employee_document',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'update_employee_detail',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'update_employee_bank_details',
			access_type  : 'private',
			service_name : 'hrms',
		},

		{
			api          : 'update_employee_offer_letter',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'get_document_signing_url',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'update_partner_user',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_employee_signing_documents',
			access_type  : 'private',
			service_name : 'hrms',
		},
	],
	employee_performance_dashboard: [
		{
			api          : 'get_employee_dashboard_details',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'create_employee_feedback',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'get_modification_history_details',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'get_rating_cycles',
			access_type  : 'private',
			service_name : 'hrms',
		},
	],
};

export default consolidated_invoices;
