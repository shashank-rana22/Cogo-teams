const CONTROLS = [
	{
		name        : 'designation',
		label       : 'Select Designation',
		controlType : 'asyncSelect',
		placeholder : 'Search Designation',
		asyncKey    : 'list_employees',
		params      : {
			filters                       : { status: 'active' },
			page_limit                    : 100,
			required_keys                 : ['designation'],
			service_objects_data_required : false,
			mappings_data_required        : true,
		},
		labelKey    : 'designation',
		valueKey    : 'designation',
		initialCall : true,
		rules       : {
			required: true,
		},
	},
	{
		name        : 'tribe_id',
		label       : 'Select Tribe',
		controlType : 'asyncSelect',
		placeholder : 'Select Tribe',
		asyncKey    : 'list_tribes',
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
		initialCall : true,
		rules       : {
			required: true,
		},
	},
	{
		name        : 'squad_id',
		label       : 'Select Squad',
		controlType : 'asyncSelect',
		placeholder : 'Select Squad',
		asyncKey    : 'list_squads',
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
		initialCall : true,
		rules       : {
			required: true,
		},
	},
	{
		name        : 'office_location',
		label       : 'Select Reporting Office',
		controlType : 'asyncSelect',
		placeholder : 'Select Reporting Office',
		asyncKey    : 'list_employees',
		params      : {
			filters                       : { status: 'active' },
			page_limit                    : 100,
			required_keys                 : ['office_location'],
			service_objects_data_required : false,
			mappings_data_required        : true,
		},
		initialCall : true,
		labelKey    : 'office_location',
		valueKey    : 'office_location',
		rules       : {
			required: true,
		},
	},
	{
		name        : 'reporting_manager_id',
		label       : 'Select Reporting Manager',
		controlType : 'asyncSelect',
		placeholder : 'Search Reporting Manager',
		asyncKey    : 'list_all_managers',
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
		initialCall : true,
		rules       : {
			required: true,
		},
	},
	{
		name        : 'employee_status',
		label       : 'Select Status',
		controlType : 'select',
		placeholder : 'Select Status',
		options     : [
			{
				label : 'Regular',
				value : 'confirmed',
			},
			{
				label : 'Probation',
				value : 'probation',
			},
			{
				label : 'Notice Period',
				value : 'separated',
			},
			{
				label : 'Inactive',
				value : 'inactive',
			},
		],
		rules: {
			required: true,
		},
	},
];

export default CONTROLS;
