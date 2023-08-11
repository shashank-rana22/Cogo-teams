import { isEmpty } from '@cogoport/utils';

const createApiResourceControls = [
	{
		name  : 'name',
		label : 'API Name',
		type  : 'text',
		width : '40%',
		rules : {
			validate: (val) => {
				if (isEmpty(val)) {
					return 'Name is required';
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
		name  : 'display_name',
		label : 'Display Name',
		type  : 'text',
		width : '40%',
		rules : { required: 'Display Name is required' },
	},
	{
		name  : 'service',
		label : 'Service',
		type  : 'text',
		width : '20%',
		rules : { required: 'Service is required' },
	},
	{
		name    : 'access_type',
		label   : 'Access Type',
		type    : 'select',
		options : [{ label: 'Private', value: 'private' }, { label: 'Public', value: 'public' }],
		width   : '40%',
		rules   : { required: 'Access Type is required' },

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
		width : '30%',
		rules : { required: 'Method is required' },
	},

	{
		name  : 'permission_check_required',
		label : 'Permission Check Required',
		type  : 'checkbox',
		width : '30%',
	},
];

export default createApiResourceControls;
