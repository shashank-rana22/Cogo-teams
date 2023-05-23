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
	],
};

export default consolidated_invoices;
