import { SelectController, AsyncSelectController } from '@cogoport/forms';

export const CONTROLS = [
	{
		name        : 'cogo_id',
		label       : 'Select COGO ID',
		controlType : 'asyncSelect',
		placeholder : 'Search ID',
		asyncKey    : 'list_employee_details',
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
		initialCall: true,
	},
	{
		name        : 'designation',
		label       : 'Select Designation',
		controlType : 'asyncSelect',
		placeholder : 'Search Designation',
		asyncKey    : 'list_operators',
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
		initialCall: true,
	},
	{
		name        : 'tribe',
		label       : 'Select Tribe',
		controlType : 'asyncSelect',
		placeholder : 'Search Tribe',
		asyncKey    : 'list_all_tribes',
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
		initialCall: true,
	},
	{
		name        : 'squad',
		label       : 'Select Squad',
		controlType : 'asyncSelect',
		placeholder : 'Search Squad',
		asyncKey    : 'list_all_squads',
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
		initialCall: true,
	},
	{
		name        : 'reporting_manager',
		label       : 'Select Reporting Manager',
		controlType : 'asyncSelect',
		placeholder : 'Search Reporting Manager',
		asyncKey    : 'list_all_managers',
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
		initialCall: true,
	},
	{
		name        : 'location',
		label       : 'Select Location',
		controlType : 'asyncSelect',
		placeholder : 'Search Location',
		asyncKey    : 'list_operators',
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
		initialCall: true,
	},
	{
		name        : 'chapter',
		label       : 'Select Chapter',
		controlType : 'asyncSelect',
		placeholder : 'Search Chapter',
		asyncKey    : 'list_all_chapters',
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
		initialCall: true,
	},
	{
		name        : 'sub-chapter',
		label       : 'Select Sub-Chapter',
		controlType : 'asyncSelect',
		placeholder : 'Search Sub-Chapter',
		asyncKey    : 'list_sub_chapters',
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
		initialCall: true,
	},
	{
		name        : 'status',
		label       : 'Select Status',
		controlType : 'select',
		placeholder : 'Search Status',
		options     : [
			{
				label : 'Regular',
				value : 'regular',
			},
			{
				label : 'Probation',
				value : 'probation',
			},
			{
				label : 'Notice Period',
				value : 'notice_period',
			},
			{
				label : 'Inactive',
				value : 'inactive',
			},
		],
	},
];

export const CONTROL_MAPPING = {
	select      : SelectController,
	asyncSelect : AsyncSelectController,
};
