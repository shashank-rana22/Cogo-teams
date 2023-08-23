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

const HONORIFICS_OPTIONS = [
	{
		label : 'Mr.',
		value : 'Mr.',
	},
	{
		label : 'Mrs.',
		value : 'Mrs.',
	},
	{
		label : 'Ms.',
		value : 'Ms.',
	},
	{
		label : 'Dr.',
		value : 'Dr.',
	},
];

const GENDER_OPTIONS = [
	{
		label : 'Male',
		value : 'male',
	},
	{
		label : 'Female',
		value : 'female',
	},
];

const RELATION_TYPE_OPTIONS = [
	{
		label : 'Father',
		value : 'Father',
	},
	{
		label : 'Mother',
		value : 'Mother',
	},
	{
		label : 'Husband',
		value : 'Husband',
	},
];

const controls = () => [
	{
		name        : 'name_title',
		label       : 'Honorifics',
		type        : 'select',
		options     : HONORIFICS_OPTIONS,
		placeholder : 'Honorifics',
	},
	{
		name        : 'name',
		label       : 'Name',
		type        : 'input',
		placeholder : 'First Name',
	},
	{
		name        : 'relation_type',
		label       : 'Relation with you',
		type        : 'select',
		placeholder : 'Relation',
		options     : RELATION_TYPE_OPTIONS,
	},
	{
		name        : 'relation_person_name',
		label       : 'Name of relative',
		type        : 'input',
		placeholder : 'Full Name',
	},
	{
		name        : 'gender',
		label       : 'Gender',
		type        : 'select',
		placeholder : 'Select Gender',
		options     : GENDER_OPTIONS,
	},
	{
		name        : 'employee_code',
		label       : 'Employee Code',
		type        : 'input',
		placeholder : 'Employee Code',
	},
	{
		name        : 'designation',
		label       : 'Employee Designation',
		type        : 'input',
		placeholder : 'Employee Designation',
	},
	{
		name                  : 'date_of_birth',
		label                 : 'Date of Birth',
		type                  : 'SingleDateRange',
		placeholder           : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'].toUpperCase(),
		isPreviousDaysAllowed : true,
	},
	{
		name                  : 'date_of_joining',
		label                 : 'Date of Joining',
		type                  : 'SingleDateRange',
		placeholder           : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'].toUpperCase(),
		isPreviousDaysAllowed : true,
	},
	{
		name        : 'mobile_number',
		label       : 'Phone Number',
		type        : 'mobile-number-select',
		placeholder : 'Mobile',
	},
	{
		name        : 'personal_email',
		label       : 'Personal Email Id',
		type        : 'email',
		placeholder : 'Email',
		disabled    : true,
		rules       :	{
			pattern: {
				value   : GLOBAL_CONSTANTS.regex_patterns.email,
				message : 'Email is invalid',
			},
		},
	},
	{
		name        : 'emergency_contact_details',
		label       : 'Relative contact number',
		type        : 'mobile-number-select',
		placeholder : 'Number',
	},
	{
		name    : 'passport_size_photo_url',
		label   : 'Passport Size Photograph',
		type    : 'fileUpload',
		accept  : '.png,.jpg,.jpeg,',
		maxSize : GLOBAL_CONSTANTS.options.upload_file_size['5MB'],
	},
	{
		name  : 'cogoport_email',
		label : 'Cogoport Email',
		type  : 'email',
		rules :	{
			pattern: {
				value   : GLOBAL_CONSTANTS.regex_patterns.email,
				message : 'Cogoport Email is invalid',
			},
		},
		placeholder: 'Cogoport Email Id',
	},
	{
		name        : 'hiring_manager_id',
		type        : 'asyncSelect',
		asyncKey    : 'list_employees',
		label       : 'Hiring Manager',
		placeholder : 'Hiring Manager',
		initialCall : true,
		params      : {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],

			},
			page_limit: 20,
		},
	},
	{
		name        : 'attendance',
		type        : 'select',
		label       : 'Attendence',
		placeholder : 'Select Attendence',
		options     : GLOBAL_CONSTANTS.attendence_options,
	},
	{
		name        : 'learning_indicator',
		type        : 'select',
		label       : 'Learning Indicator',
		placeholder : 'select LI',
		options     : GLOBAL_CONSTANTS.li_options,

	},
	{
		name        : 'predictive_index',
		type        : 'number',
		label       : 'Predictive Index',
		placeholder : 'Enter PI',
	},
	{
		name        : 'department',
		type        : 'select',
		label       : 'Department',
		placeholder : 'Select Department',
		options     : GLOBAL_CONSTANTS.department_options,
	},
	{
		name        : 'office_location',
		type        : 'select',
		label       : 'Reporting City',
		placeholder : 'Select Location',
		options     : REPORTING_CITY_OPTIONS,
	},
];

export default controls;
