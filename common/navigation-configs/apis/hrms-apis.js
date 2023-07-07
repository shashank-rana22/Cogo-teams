const hrms = {
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
		{
			api          : 'list_company_documents',
			access_type  : 'private',
			service_name : 'hrms',
		},
	],
	performance_management_configuration: [
		{
			api          : 'list_partner_users',
			access_type  : 'private',
			service_name : 'partner',
		},
		{
			api          : 'create_squad',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'create_tribe',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'create_tribe',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'list_all_tribes',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'list_all_squads',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'list_all_chapters',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'list_all_sub_chapters',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'create_chapter',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'create_sub_chapter',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'list_employee_details',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'delete_squad',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'update_squad',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'delete_tribe',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'update_tribe',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'delete_chapter',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'update_chapter',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'delete_sub_chapter',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'update_sub_chapter',
			access_type  : 'private',
			service_name : 'hrms',
		},
	],

	kra_assignment: [
		{
			api          : 'list_all_sub_chapters',
			access_type  : 'private',
			service_name : 'hrms',
		},

		{
			api          : 'list_all_squads',
			access_type  : 'private',
			service_name : 'hrms',
		},

		{
			api          : 'list_all_tribes',
			access_type  : 'private',
			service_name : 'hrms',
		},

		{
			api          : 'list_all_chapters',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'create_kra',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'edit_kra',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'get_kra',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'list_roles',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'get_unassigned_employees',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'list_employee_details',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'list_kra',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'get_employees_with_low_weightage',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'assign_kra',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'get_kras_assigned',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'list_individual_kra',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'list_employee_kra_details',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'get_rating_review_details',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'get_employee_level',
			access_type  : 'private',
			service_name : 'hrms',
		},

		{
			api          : 'create_individual_kra',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'update_employee_final_rating',
			access_type  : 'private',
			service_name : 'hrms',
		}, {
			api          : 'update_employee_manual_target',
			access_type  : 'private',
			service_name : 'hrms',
		},
		{
			api          : 'publish_ratings',
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

export default hrms;
