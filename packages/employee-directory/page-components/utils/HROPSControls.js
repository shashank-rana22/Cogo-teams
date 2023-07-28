/* eslint-disable max-lines-per-function */
function getHROPSControls(isCogoFreight, isEditable) {
	const CONTROLS = [
		{
			label       : 'Employee Name',
			name        : 'name',
			controlType : 'text',
			placeholder : 'Employee Name',
			disabled    : !isEditable,
			rules       : {
				required: true,
			},
		},
		{
			label       : 'COGO - ID',
			name        : 'employee_code',
			controlType : 'text',
			placeholder : 'COGO ID',
			disabled    : true,
		},
		{
			label       : 'Email',
			name        : 'cogoport_email',
			controlType : 'text',
			placeholder : 'Email',
			rules       : {
				required: true,
			},
			disabled: !isEditable,
		},
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
			disabled: !isEditable,
		},
		{
			name        : 'department',
			label       : 'Select Department',
			controlType : 'asyncSelect',
			placeholder : 'Search Department',
			asyncKey    : 'list_employees',
			params      : {
				filters                       : { status: 'active' },
				page_limit                    : 100,
				required_keys                 : ['department'],
				service_objects_data_required : false,
				mappings_data_required        : true,
			},
			labelKey    : 'department',
			valueKey    : 'department',
			initialCall : true,
			rules       : {
				required: true,
			},
			disabled: !isEditable,
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
			disabled: !isEditable,
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
			disabled: !isEditable,
		},
		// {
		// 	name        : 'payroll_country',
		// 	label       : 'Select Payroll Country',
		// 	controlType : 'asyncSelect',
		// 	placeholder : 'Select Payroll Country',
		// 	asyncKey    : 'list_locations',
		// 	params      : {
		// 		filters: {
		// 			type: ['country'],
		// 		},
		// 	},
		// 	initialCall : true,
		// 	rules       : {
		// 		required: true,
		// 	},
		// 	disabled: !isEditable,
		// },
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
			disabled: !isEditable,
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
			disabled: !isEditable,
		},
		{
			name        : 'chapter_id',
			label       : 'Select Chapter',
			controlType : 'asyncSelect',
			placeholder : 'Select Chapter',
			asyncKey    : 'list_chapters',
			params      : {
				filters    : { status: 'active' },
				page_limit : 100,
			},
			initialCall : true,
			rules       : {
				required: true,
			},
			disabled: !isEditable,
		},
		{
			name        : 'sub_chapter_id',
			label       : 'Select Sub Chapter',
			controlType : 'asyncSelect',
			placeholder : 'Select Sub Chapter',
			asyncKey    : 'list_sub_chapters',
			params      : {
				filters    : { status: 'active' },
				page_limit : 100,
			},
			initialCall : true,
			// rules       : {
			// 	required: true,
			// },
			disabled    : !isEditable,
		},
		{
			label       : 'LI',
			name        : 'li',
			controlType : 'text',
			placeholder : 'LI',
			disabled    : true,
		},
		{
			label       : 'PI',
			name        : 'pi',
			controlType : 'text',
			placeholder : 'PI',
			disabled    : true,
		},
		{
			label                 : 'Enter date of joining',
			name                  : 'date_of_joining',
			controlType           : 'date',
			placeholder           : 'Date of joining',
			isPreviousDaysAllowed : true,
			dateFormat            : 'dd-MM-yyyy',
			rules                 : {
				required: true,
			},
			disabled: !isEditable,
		},
		{
			label                 : 'Enter Resignation Date',
			name                  : 'resignation_date',
			controlType           : 'date',
			isPreviousDaysAllowed : true,
			placeholder           : 'Resignation Date',
			disabled              : !isEditable,
		},
		{
			name        : 'lwp',
			label       : 'LWP',
			controlType : 'select',
			placeholder : 'LWP',
			options     : [
				{
					label : 'Yes',
					value : 'true',
				},
				{
					label : 'No',
					value : 'false',
				},
			],
			rules: {
				required: true,
			},
			disabled: !isEditable,
		},
		{
			name        : 'absconding',
			label       : 'Absconding',
			controlType : 'select',
			placeholder : 'Absconding',
			options     : [
				{
					label : 'Yes',
					value : 'true',
				},
				{
					label : 'No',
					value : 'false',
				},
			],
			rules: {
				required: true,
			},
			disabled: !isEditable,
		},
		{
			name        : 'cogo_freight',
			label       : 'Cogo Freight',
			controlType : 'select',
			placeholder : 'cogo_freight',
			options     : [
				{
					label : 'Yes',
					value : 'true',
				},
				{
					label : 'No',
					value : 'false',
				},
			],
			rules: {
				required: true,
			},
			disabled: !isEditable,
		},
	];

	const COGO_FREIGHT_JOINING = {
		label                 : 'Cogo Freight DOJ',
		name                  : 'cfpl_joining_date',
		controlType           : 'date',
		isPreviousDaysAllowed : true,
		placeholder           : 'Cogo Freight DOJ',
		rules                 : {
			required: true,
		},
		disabled: !isEditable,
	};

	return isCogoFreight === 'true' ? [...CONTROLS, COGO_FREIGHT_JOINING] : CONTROLS;
}

export default getHROPSControls;
