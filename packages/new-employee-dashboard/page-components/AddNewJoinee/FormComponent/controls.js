import { getCountryConstants } from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

const india_country_id = GLOBAL_CONSTANTS.country_ids.IN;
const vietnam_country_id = GLOBAL_CONSTANTS.country_ids.VN;

const india_constants = getCountryConstants({ country_id: india_country_id });
const vietnam_constants = getCountryConstants({ country_id: vietnam_country_id });

const OFFICE_LOCATIONS = [...india_constants.office_locations, ...vietnam_constants.office_locations];

const REPORTING_CITY_OPTIONS = OFFICE_LOCATIONS.map((location) => (
	{ label: startCase(location), value: location }));

const controls = [
	{
		name        : 'name',
		type        : 'text',
		label       : 'Name*',
		placeholder : 'Name of the employee',
		rules       : {
			required: 'name is required',
		},
	},
	{
		name        : 'personal_email',
		label       : 'Personal Email ID*',
		placeholder : 'Enter a valid email id',
		type        : 'text',
		rules       : {
			required : 'Email is required',
			pattern  : {
				value   : GLOBAL_CONSTANTS.regex_patterns.email,
				message : 'Email is invalid',
			},
		},
	},
	{
		name        : 'mobile_number',
		label       : 'Contact Details*',
		type        : 'mobile-number-select',
		inputType   : 'number',
		placeholder : 'Mobile Number*',
		rules       : {
			required: 'Mobile Number is required',
		},
	},
	{
		name        : 'employee_code',
		type        : 'text',
		label       : 'Employee ID',
		placeholder : 'Employee Id',
	},
	{
		name        : 'designation',
		type        : 'select',
		label       : 'Designation*',
		placeholder : 'Role',
		options     : GLOBAL_CONSTANTS.options.role_options,
		rules       : {
			required: 'Role is required',
		},
	},
	{
		name                  : 'date_of_joining',
		label                 : 'Date of joining',
		type                  : 'SingleDateRange',
		dateFormat            : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
		isPreviousDaysAllowed : true,
		isClearable           : true,
	},
	{
		name        : 'office_location_country',
		type        : 'select',
		label       : 'Reporting Country*',
		placeholder : 'Select Location',
		options     : [
			{ value: 'india', label: 'India' },
			{ value: 'vietnam', label: 'Vietnam' },
		],
		rules: {
			required: 'Reporting Country is required',
		},
	},
	{
		name        : 'office_location',
		type        : 'select',
		label       : 'Reporting City*',
		placeholder : 'Select Location',
		options     : REPORTING_CITY_OPTIONS,
		rules       : {
			required: 'Location is required',
		},
	},
	{
		name        : 'cogoport_email',
		label       : 'Cogoport Email ID',
		placeholder : 'Enter a valid email id',
		type        : 'text',
		rules       : {
			pattern: {
				value   : GLOBAL_CONSTANTS.regex_patterns.email,
				message : 'Email is invalid',
			},
		},
	},
	{
		name        : 'attendence',
		type        : 'select',
		label       : 'Attendence*',
		placeholder : 'Select Attendence',
		options     : GLOBAL_CONSTANTS.attendence_options,
		rules       : {
			required: 'Attendence is required',
		},
	},
	{
		name        : 'li',
		type        : 'select',
		label       : 'LI',
		placeholder : 'select LI',
		options     : GLOBAL_CONSTANTS.li_options,

	},
	{
		name        : 'pi',
		type        : 'number',
		label       : 'PI',
		placeholder : 'Enter PI',

	},
	{
		name        : 'department',
		type        : 'select',
		label       : 'Department*',
		placeholder : 'Select Department',
		options     : GLOBAL_CONSTANTS.department_options,
		rules       : {
			required: 'Department is required',
		},

	},
	{
		name        : 'segment',
		type        : 'select',
		label       : 'Segment*',
		placeholder : 'Select Segment',
		options     : GLOBAL_CONSTANTS.segment_options,
		rules       : {
			required: 'Segment is required',
		},

	},
	{
		name        : 'hiring_manager_id',
		type        : 'asyncSelect',
		asyncKey    : 'partner_users_ids',
		label       : 'Hiring Manager*',
		placeholder : 'Hiring Manager',
		rules       : {
			required: 'Hiring Manager is required',
		},
		initialCall : true,
		params      : {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],

			},
			page_limit: 100,
		},
	},
	{
		name        : 'reporting_manager_id',
		type        : 'asyncSelect',
		asyncKey    : 'partner_users_ids',
		label       : 'Reporting Manager',
		placeholder : 'Reporting Manager',
		rules       : {
			required: 'Reporting Manager is required',
		},
		initialCall : true,
		params      : {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],

			},
			page_limit: 100,
		},
	},
	{
		name        : 'hr_id',
		type        : 'asyncSelect',
		asyncKey    : 'partner_users_ids',
		label       : 'HR Name*',
		placeholder : 'Enter Name',
		rules       : {
			required: 'name is required',
		},
		initialCall : true,
		params      : {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],
			},
			page_limit: 100,
		},
	},
	{
		name        : 'hrbp_id',
		type        : 'asyncSelect',
		asyncKey    : 'partner_users_ids',
		label       : 'HRBP*',
		placeholder : 'HRBP',
		rules       : {
			required: 'HRBP is required',
		},
		params: {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],
			},
			page_limit: 100,
		},
	},
];

export default controls;
