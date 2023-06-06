const consolidated_invoices = {
	new_employee_dashboard: [
		{
			api          : 'create_employee_detail',
			access_type  : 'private',
			service_name : 'harbour',
		},
		{
			api          : 'list_employee_details',
			access_type  : 'private',
			service_name : 'harbour',
		},
		{
			api          : 'get_employee_details',
			access_type  : 'private',
			service_name : 'harbour',
		},
		{
			api          : 'create_employee_offer_letter',
			access_type  : 'private',
			service_name : 'harbour',
		},
		{
			api          : 'create_document_template',
			access_type  : 'private',
			service_name : 'harbour',
		},
		{
			api          : 'update_document_template',
			access_type  : 'private',
			service_name : 'harbour',
		},
		{
			api          : 'list_document_templates',
			access_type  : 'private',
			service_name : 'harbour',
		},
		{
			api          : 'bulk_upload_employee_details',
			access_type  : 'private',
			service_name : 'harbour',
		},
		{
			api          : 'get_employee_signing_documents',
			access_type  : 'private',
			service_name : 'harbour',
		},

		{
			api          : 'get_esign_documents',
			access_type  : 'private',
			service_name : 'harbour',
		},

		{
			api          : 'list_employee_offer_letters',
			access_type  : 'private',
			service_name : 'harbour',
		},

		{
			api          : 'update_employee_bank_details',
			access_type  : 'private',
			service_name : 'harbour',
		},

		{
			api          : 'update_employee_document',
			access_type  : 'private',
			service_name : 'harbour',
		},

	],

	employee_portal: [
		{
			api          : 'get_employee_details',
			access_type  : 'private',
			service_name : 'harbour',
		},
		{
			api          : 'create_employee_bank_details',
			access_type  : 'private',
			service_name : 'harbour',
		},
		{
			api          : 'create_employee_document',
			access_type  : 'private',
			service_name : 'harbour',
		},
		{
			api          : 'update_employee_document',
			access_type  : 'private',
			service_name : 'harbour',
		},
		{
			api          : 'update_employee_detail',
			access_type  : 'private',
			service_name : 'harbour',
		},
		{
			api          : 'update_employee_bank_details',
			access_type  : 'private',
			service_name : 'harbour',
		},
		{
			api          : 'list_document_templates',
			access_type  : 'private',
			service_name : 'harbour',
		},
		{
			api          : 'update_employee_offer_letter',
			access_type  : 'private',
			service_name : 'harbour',
		},
		{
			api          : 'get_document_signing_url',
			access_type  : 'private',
			service_name : 'harbour',
		},
		{
			api          : 'update_partner_user',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'get_employee_signing_documents',
			access_type  : 'private',
			service_name : 'harbour',
		},
	],
};

export default consolidated_invoices;
