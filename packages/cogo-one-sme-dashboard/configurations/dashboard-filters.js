import { isEmpty } from '@cogoport/utils';

import getBranchesData from '../utils/getBranchesData';

const dashboardFilters = ({ filterParams = {} }) => {
	const branchOptions = getBranchesData({ partner_id: filterParams?.partner_id });

	return [
		{
			name           : 'partner_id',
			value          : filterParams?.partner_id || '',
			defaultOptions : true,
			caret          : true,
			scope          : 'partner',
			controlType    : 'asyncSelect',
			initialCall    : true,
			asyncKey       : 'partners',
			placeholder    : 'partner',
			params         : {
				filters: {
					entity_types : ['cogoport'],
					status       : 'active',
				},
				page_limit          : 1000,
				roles_data_required : false,
				page                : 1,
			},
		},
		{
			name        : 'office_location_id',
			value       : filterParams?.office_location_id || '',
			controlType : 'select',
			disabled    : isEmpty(branchOptions),
			options     : branchOptions,
			labelKey    : 'name',
			valueKey    : 'id',
			placeholder : 'Office Location',
			className   : 'office_location',
			isClearable : true,
		},
		{
			name           : 'role_id',
			value          : filterParams?.role_id || [],
			defaultOptions : true,
			caret          : true,
			scope          : 'partner',
			multiple       : true,
			controlType    : 'asyncSelect',
			initialCall    : true,
			asyncKey       : 'partner_roles',
			placeholder    : 'Select Roles',
			params         : {
				filters: {
					entity_types   : ['cogoport'],
					stakeholder_id : filterParams?.partner_id,
				},
			},
		},
		{
			name           : 'reporting_manager_id',
			value          : filterParams?.reporting_manager_id || '',
			valueKey       : 'id',
			labelKey       : 'name',
			asyncKey       : 'partner_users',
			controlType    : 'asyncSelect',
			defaultOptions : true,
			placeholder    : 'Select Reporting Manager',
			isClearable    : true,
			params         : {
				page_limit : 10,
				filters    : {
					status     : 'active',
					partner_id : filterParams?.partner_id,

				},
			},
		},
		{
			name                  : 'date_range',
			value                 : filterParams?.date_range || {},
			isPreviousDaysAllowed : true,
			maxDate               : new Date(),
			showTimeSelect        : false,
			controlType           : 'dateRangePicker',
			isClearable           : false,
		},
	];
};

export default dashboardFilters;
