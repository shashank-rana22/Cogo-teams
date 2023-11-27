import getGeoConstants from '@cogoport/globalization/constants/geo';

import { companyType, taggedState } from '../../../../constants';

const geo = getGeoConstants();

const overAllOutstandingcontrols = () => [
	{
		name     : 'include_defaulters',
		label    : 'Include Defaulters',
		type     : 'toggle',
		onLabel  : 'ON',
		offLabel : 'OFF',
		size     : 'md',
	},

	{

		name        : 'kamId',
		label       : 'Select Kam Owner',
		placeholder : 'Select Kam Owner',
		type        : 'asyncSelect',
		asyncKey    : 'partner_users_ids',
		intialCall  : true,
		isClearable : true,
		size        : 'sm',

	},

	{

		name        : 'portfolioManagerId',
		label       : 'Select Portfolio Manager',
		placeholder : 'Select Portfolio Manager',
		asyncKey    : 'partner_users_ids',
		intialCall  : true,
		type        : 'asyncSelect',
		isClearable : true,
		size        : 'sm',
		params      : {
			rm_mappings_data_required    : false,
			partner_data_required        : false,
			pagination_data_required     : false,
			add_service_objects_required : false,
			filters                      : {
				status               : 'active',
				partner_id           : geo.uuid.parent_entity_id,
				role_sub_functions   : ['cp_portfolio'],
				partner_entity_types : ['cogoport'],

			},

		},

	},

	{

		name        : 'portfolioManagerRmId',
		label       : 'Select Portfolio Manager Rm',
		placeholder : 'Select Portfolio Manager Rm',
		asyncKey    : 'partner_users_ids',
		type        : 'asyncSelect',
		intialCall  : true,
		isClearable : true,
		size        : 'sm',
		params      : {
			filters: {
				status     : 'active',
				partner_id : geo.uuid.parent_entity_id,
			},
			rm_mappings_data_required    : false,
			partner_data_required        : false,
			pagination_data_required     : false,
			add_service_objects_required : false,
		},

	},

	{

		name        : 'salesAgentId',
		label       : 'Select Sales Agent',
		placeholder : 'Select Sales Agent',
		asyncKey    : 'partner_users_ids',
		type        : 'asyncSelect',
		intialCall  : true,
		isClearable : true,
		size        : 'sm',
		params      : {
			filters: {
				status         : 'active',
				partner_id     : geo.uuid.parent_entity_id,
				role_functions : ['sales'],
			},
		},

	},

	{
		name        : 'salesAgentRmId',
		label       : 'Select Sales Agent Manager',
		asyncKey    : 'partner_users_ids',
		type        : 'asyncSelect',
		placeholder : 'Select Sales Agent Manager',
		intialCall  : true,
		isClearable : true,
		size        : 'sm',
		params      : {
			filters: {
				status         : 'active',
				partner_id     : geo.uuid.parent_entity_id,
				role_functions : ['sales'],
			},

		},

	},

	{

		name        : 'creditControllerId',
		label       : 'Select Credit Controller',
		placeholder : 'Select Credit Controller',
		asyncKey    : 'partner_users_ids',
		type        : 'asyncSelect',
		params      : {
			filters: {
				status     : 'active',
				partner_id : geo.uuid.parent_entity_id,
				role_ids   : geo.uuid.credit_controller_ids,
			},

		},
		intialCall  : true,
		isClearable : true,
		size        : 'sm',
	},

	{
		label   : 'Company Type',
		name    : 'companyType',
		options : companyType,
		type    : 'radio',
	},

	{
		label   : 'Tagged State',
		name    : 'taggedState',
		options : taggedState,
		type    : 'radio',
	},

];

export default overAllOutstandingcontrols;
