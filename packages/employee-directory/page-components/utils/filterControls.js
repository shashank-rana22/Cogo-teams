import { SelectController, AsyncSelectController, DatepickerController, InputController } from '@cogoport/forms';

export const CONTROLS = [
	{
		name        : 'employee_code',
		label       : 'Select COGO ID',
		controlType : 'asyncSelect',
		placeholder : 'Search ID',
		asyncKey    : 'list_employees',
		params      : {
			filters                       : { status: 'active' },
			page_limit                    : 100,
			required_keys                 : ['employee_code'],
			service_objects_data_required : false,
			mappings_data_required        : true,
		},
		isClearable : true,
		labelKey    : 'employee_code',
		valueKey    : 'employee_code',
		initialCall : true,
		multiple    : true,
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
		isClearable : true,
		labelKey    : 'designation',
		valueKey    : 'designation',
		initialCall : true,
		multiple    : true,
	},
	{
		name        : 'tribe_id',
		label       : 'Select Tribe',
		controlType : 'asyncSelect',
		placeholder : 'Search Tribe',
		asyncKey    : 'list_tribes',
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
		isClearable : true,
		initialCall : true,
		multiple    : true,
	},
	{
		name        : 'squad_id',
		label       : 'Select Squad',
		controlType : 'asyncSelect',
		placeholder : 'Search Squad',
		asyncKey    : 'list_squads',
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
		isClearable : true,
		initialCall : true,
		multiple    : true,
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
		isClearable : true,
		initialCall : true,
		multiple    : true,
	},
	{
		name        : 'office_location',
		label       : 'Select Location',
		controlType : 'asyncSelect',
		placeholder : 'Search Location',
		asyncKey    : 'list_employees',
		params      : {
			filters                       : { status: 'active' },
			page_limit                    : 100,
			required_keys                 : ['office_location'],
			service_objects_data_required : false,
			mappings_data_required        : true,
		},
		labelKey    : 'office_location',
		valueKey    : 'office_location',
		initialCall : true,
		isClearable : true,
		multiple    : true,
	},
	{
		name        : 'chapter_id',
		label       : 'Select Chapter',
		controlType : 'asyncSelect',
		placeholder : 'Search Chapter',
		asyncKey    : 'list_chapters',
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
		isClearable : true,
		initialCall : true,
		multiple    : true,
	},
	{
		name        : 'sub_chapter_id',
		label       : 'Select Sub-Chapter',
		controlType : 'asyncSelect',
		placeholder : 'Search Sub-Chapter',
		asyncKey    : 'list_sub_chapters',
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
		isClearable : true,
		initialCall : true,
		multiple    : true,
	},
];

export const getControls = (type) => {
	const STATUS_FILTER = {
		name        : 'employee_status',
		label       : 'Select Status',
		controlType : 'select',
		placeholder : 'Search Status',
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
		],
		isClearable : true,
		multiple    : true,
	};

	return type === 'all_employees' ? [...CONTROLS, STATUS_FILTER] : CONTROLS;
};

export const CONTROL_MAPPING = {
	select      : SelectController,
	asyncSelect : AsyncSelectController,
	date        : DatepickerController,
	text        : InputController,
};
