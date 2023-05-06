export const controls = (partnerOptions) => [
	{
		name        : 'name',
		label       : 'Role Name',
		type        : 'text',
		placeholder : 'Enter Role Name',
		rules       : { required: 'Role Name is required' },
	},
	{
		name        : 'short_name',
		label       : 'Role Short Name',
		maxLength   : 16,
		type        : 'text',
		placeholder : 'Enter Role Short Name',
		rules       : { required: 'Role Short Name is required' },
	},
	{
		...partnerOptions,
		name        : 'stakeholder_id',
		label       : 'Partner',
		type        : 'select',
		isClearable : true,
		placeholder : 'Choose Partner',
		rules       : { required: 'Partner is required' },
		params      : { page_limit: 10 },
	},
	{
		name    : 'role_functions',
		label   : 'Role Functions',
		options : [
			{
				label : 'Sales',
				value : 'sales',
			},
			{
				label : 'Supply',
				value : 'supply',
			},
			{
				label : 'Operations',
				value : 'operations',
			},
			{
				label : 'Finance',
				value : 'finance',
			},
			{
				label : 'Training',
				value : 'training',
			},
			{
				label : 'HR',
				value : 'hr',
			},
		],
		type        : 'multiSelect',
		isClearable : true,
		placeholder : 'Choose role functions',
		rules       : { required: 'Function is required' },
	},
	{
		name        : 'role_sub_functions',
		label       : 'Role Sub Functions',
		type        : 'multiSelect',
		isClearable : true,
		placeholder : 'Choose role sub functions',
	},
	{
		name    : 'hierarchy_level',
		label   : 'Hierarchy Level',
		options : [
			{
				label : 'Owner',
				value : 'owner',
			},
			{
				label : 'Manager',
				value : 'manager',
			},
			{
				label : 'Function Head',
				value : 'function_head',
			},
			{
				label : 'Head',
				value : 'head',
			},
			{
				label : 'Zone Head',
				value : 'zone_head',
			},
			{
				label : 'Region Head',
				value : 'region_head',
			},
			{
				label : 'Cluster Head',
				value : 'cluster_head',
			},
		],
		type        : 'select',
		caret       : true,
		isClearable : true,
		rules       : { required: 'Hierarchy Level is required' },
		placeholder : 'Choose Hierarchy Level',
	},
	{
		name        : 'remarks',
		label       : 'Description',
		type        : 'text',
		placeholder : 'Enter role description',
		rules       : { required: 'Description is required' },
	},
];
