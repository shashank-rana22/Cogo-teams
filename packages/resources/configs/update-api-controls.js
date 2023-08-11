import { isEmpty } from '@cogoport/utils';

const updateApiControls = ({ selectedApi }) => [
	{
		name  : 'name',
		label : 'Resource Name',
		type  : 'text',
		width : '40%',
		value : (selectedApi || {}).name,
		rules : {
			validate: (val) => {
				if (isEmpty(val)) {
					return 'Please select the api to update...';
				}
				const SNAKE_CASE_REGEX = /^[a-z0-9_]+$/;
				const isSnakeCase = SNAKE_CASE_REGEX.test(val);

				if (!isSnakeCase) {
					return 'Name should be snake case';
				}

				return true;
			},
		},
	},
	{
		name     : 'display_name',
		label    : 'Display Name',
		type     : 'text',
		width    : '40%',
		disabled : !selectedApi,
	},
	{
		name     : 'service',
		label    : 'Service',
		type     : 'text',
		width    : '20%',
		disabled : !selectedApi,
	},
	{
		name     : 'access_type',
		label    : 'Access Type',
		type     : 'select',
		options  : [{ label: 'Private', value: 'private' }, { label: 'Public', value: 'public' }],
		width    : '30%',
		disabled : !selectedApi,
	},
	{
		name    : 'method',
		label   : 'Method',
		type    : 'select',
		options : [
			{ label: 'GET', value: 'get' },
			{ label: 'POST', value: 'post' },
			{ label: 'PUT', value: 'put' },
			{ label: 'DELETE', value: 'delete' },
			{ label: 'PATCH', value: 'patch' },
		],
		width    : '20%',
		disabled : !selectedApi,
	},
	{
		name     : 'status',
		label    : 'Status',
		type     : 'select',
		options  : [{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }],
		width    : '20%',
		disabled : !selectedApi,
	},
	{
		name  : 'permission_check_required',
		label : 'Permission Check Required',
		type  : 'checkbox',
		width : '30%',
	},
];

export default updateApiControls;
