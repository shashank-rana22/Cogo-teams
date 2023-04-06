const performance_management = {
	user_dashboard: [
		{
			api          : 'get_iris_get_user_info',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_get_average_ratings',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_list_user_feedbacks',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_get_performance_stats',
			access_type  : 'private',
			service_name : 'iris',
		},
	],
	hr_dashboard: [
		{
			api          : 'get_iris_list_user_feedbacks',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_get_user_info',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_get_average_ratings',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'post_iris_create_question',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_list_managers',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_list_questions',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_list_forms',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_list_departments',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'post_iris_create_form',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_list_tags',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_get_form',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_get_form_deadline',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_get_form_responses',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'post_iris_create_form_responses',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'post_iris_update_form_responses',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_get_department_mappings',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_list_reportees',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'post_iris_notify_managers',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'create_communication',
			access_type  : 'private',
			service_name : 'communication',
		},
		{
			api          : 'get_iris_get_performance_stats',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_get_log_stats',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_download_csv',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'post_iris_update_partner_user_admin_mapping',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'post_iris_create_log',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'post_iris_create_file',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'post_iris_update_file',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_list_logs',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'post_iris_update_log',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_download_log_csv',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'post_iris_update_form_deadline',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_get_comments',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_list_files',
			access_type  : 'private',
			service_name : 'iris',
		},
	],

	manager_dashboard: [
		{
			api          : 'post_iris_create_form_responses',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'post_iris_update_form_responses',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_get_month_stats',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_list_reportees',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_get_average_ratings',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_get_performance_stats',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_get_log_stats',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_get_department_mappings',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_get_form',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_list_logs',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'post_iris_update_log',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_list_user_feedbacks',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_get_form_responses',
			access_type  : 'private',
			service_name : 'iris',
		},
	],
	employee_directory: [
		{
			api          : 'get_iris_get_employees',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_list_reportees',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'get_iris_download_employee_csv',
			access_type  : 'private',
			service_name : 'iris',
		},
		{
			api          : 'post_iris_update_partner_user_admin_mapping',
			access_type  : 'private',
			service_name : 'iris',
		},
	],
};

export default performance_management;
