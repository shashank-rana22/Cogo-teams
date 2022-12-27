export const controls = [
	{
		name        : 'name',
		label       : 'Role Name',
		type        : 'text',
		placeholder : 'Enter Role Name',
		rules       : { required: 'Role Name is required' },
		flex        : 2,
		size        : 'lg',
	},
	{
		name        : 'short_name',
		label       : 'Role Short Name',
		maxLength   : 16,
		type        : 'text',
		placeholder : 'Enter Role Short Name',
		rules       : { required: 'Role Short Name is required' },
		flex        : 2,
		size        : 'lg',
	},
	{
		name        : 'stakeholder_id',
		label       : 'Partner',
		type        : 'select',
		options     : [],
		isClearable : true,
		placeholder : 'Choose Partner',
		rules       : { required: 'Partner is required' },
		flex        : 2,
		params      : { page_limit: 10 },
		size        : 'lg',
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
		],
		type        : 'multiSelect',
		isClearable : true,
		placeholder : 'Choose role functions',
		rules       : { required: 'Function is required' },
		flex        : 1,
		size        : 'lg',
	},
	{
		name        : 'role_sub_functions',
		label       : 'Role Sub Functions',
		type        : 'multiSelect',
		isClearable : true,
		placeholder : 'Choose role sub functions',
		flex        : 1,
		size        : 'lg',
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
		flex        : 1,
		size        : 'lg',
	},
	{
		name        : 'remarks',
		label       : 'Description',
		type        : 'text',
		placeholder : 'Enter role description',
		rules       : { required: 'Description is required' },
		flex        : 1,
		size        : 'lg',
	},
];
