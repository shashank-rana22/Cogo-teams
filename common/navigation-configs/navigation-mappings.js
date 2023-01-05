import {
	IcMBookingDesk, IcMSettings,
} from '@cogoport/icons-react';

import roles_permissions from './apis/roles-n-permission-apis';

const navigationMappings = {
	home: {
		key           : 'home',
		title         : 'Home',
		href          : '/home',
		as            : '/home',
		icon          : IcMBookingDesk,
		possible_apis : [],
		module_type   : 'dashboards',
	},
	roles_permissions: {
		key           : 'roles_permissions',
		title         : 'Roles and Permissions',
		icon          : IcMSettings,
		href          : '/list-roles',
		as            : '/list-roles',
		type          : 'link',
		main_apis     : ['list_auth_roles'],
		possible_apis : [...roles_permissions],
		module_type   : 'crm',
	},
};

export default navigationMappings;
