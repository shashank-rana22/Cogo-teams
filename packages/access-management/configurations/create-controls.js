export const controls = (partnerOptions, t) => [
	{
		name        : 'name',
		label       : t('accessManagement:roles_and_permission_create_role_modal_role_name'),
		type        : 'text',
		placeholder : t('accessManagement:roles_and_permission_create_role_modal_role_name_placeholder'),
		rules       : {
			required:
			t('accessManagement:roles_and_permission_create_role_modal_role_name_rules_required'),
		},
	},
	{
		name        : 'short_name',
		label       : t('accessManagement:roles_and_permission_create_role_modal_role_short_name'),
		maxLength   : 16,
		type        : 'text',
		placeholder : t('accessManagement:roles_and_permission_create_role_modal_role_short_name_placeholder'),
		rules       : {
			required:
			t('accessManagement:roles_and_permission_create_role_modal_role_short_name_rules_required'),
		},
	},
	{
		...partnerOptions,
		name        : 'stakeholder_id',
		label       : t('accessManagement:roles_and_permission_create_role_modal_stakeholder_id_partner'),
		type        : 'select',
		isClearable : true,
		placeholder : t('accessManagement:roles_and_permission_create_role_modal_stakeholder_id_partner_placeholder'),
		rules       : {
			required:
			t('accessManagement:roles_and_permission_create_role_modal_stakeholder_id_partner_rules_required'),
		},
		params: { page_limit: 10 },
	},
	{
		name    : 'role_functions',
		label   : t('accessManagement:roles_and_permission_create_role_modal_role_function_label'),
		options : [
			{
				label : t('accessManagement:roles_and_permission_select_role_functions_select_sales'),
				value : 'sales',
			},
			{
				label : t('accessManagement:roles_and_permission_select_role_functions_select_supply'),
				value : 'supply',
			},
			{
				label : t('accessManagement:roles_and_permission_select_role_functions_select_operations'),
				value : 'operations',
			},
			{
				label : t('accessManagement:roles_and_permission_select_role_functions_select_finance'),
				value : 'finance',
			},
			{
				label : t('accessManagement:roles_and_permission_update_edit_role_role_functions_training'),
				value : 'training',
			},
			{
				label : t('accessManagement:roles_and_permission_update_edit_role_role_functions_hr'),
				value : 'hr',
			},
			{
				label : t('accessManagement:roles_and_permission_select_role_functions_select_external'),
				value : 'external',
			},
			{
				label : 'Public',
				value : 'public',
			},
		],
		type        : 'multiSelect',
		isClearable : true,
		placeholder : t('accessManagement:roles_and_permission_create_role_modal_role_function_label_placeholder'),
		rules       : {
			required:
			t('accessManagement:roles_and_permission_create_role_modal_role_function_rules_required'),
		},
	},
	{
		name        : 'role_sub_functions',
		label       : t('accessManagement:roles_and_permission_create_role_modal_role_sub_functions'),
		type        : 'multiSelect',
		isClearable : true,
		placeholder : t('accessManagement:roles_and_permission_create_role_modal_role_sub_functions_placeholder'),
	},
	{
		name    : 'hierarchy_level',
		label   : t('accessManagement:roles_and_permission_create_role_modal_role_hierarchy_level_label'),
		options : [
			{
				label : t('accessManagement:roles_and_permission_select_hierarchy_level_owner'),
				value : 'owner',
			},
			{
				label : t('accessManagement:roles_and_permission_select_hierarchy_level_manager'),
				value : 'manager',
			},
			{
				label : t('accessManagement:roles_and_permission_select_hierarchy_level_function_head'),
				value : 'function_head',
			},
			{
				label : t('accessManagement:roles_and_permission_select_hierarchy_level_head'),
				value : 'head',
			},
			{
				label : t('accessManagement:roles_and_permission_select_hierarchy_level_zone_head'),
				value : 'zone_head',
			},
			{
				label : t('accessManagement:roles_and_permission_select_hierarchy_level_region_head'),
				value : 'region_head',
			},
			{
				label : t('accessManagement:roles_and_permission_select_hierarchy_level_cluster_head'),
				value : 'cluster_head',
			},
		],
		type        : 'select',
		caret       : true,
		isClearable : true,
		rules       : {
			required:
			t('accessManagement:roles_and_permission_create_role_modal_role_hierarchy_level_rules_required'),
		},
		placeholder: t('accessManagement:roles_and_permission_create_role_modal_role_hierarchy_level_placeholder'),
	},
	{
		name        : 'remarks',
		label       : t('accessManagement:roles_and_permission_create_role_modal_role_remarks_label'),
		type        : 'text',
		placeholder : t('accessManagement:roles_and_permission_create_role_modal_role_remarks_placeholder'),
		rules       : {
			required:
			t('accessManagement:roles_and_permission_create_role_modal_role_remarks_rules_requried'),
		},
	},
];
