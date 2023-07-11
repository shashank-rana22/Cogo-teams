import { isEmpty } from '@cogoport/utils';

const CHANNEL_WISE_ROLES_SUB_FUNCTIONS_FILTER_MAPPING = {
	sme        : ['customer_success'],
	enterprise : ['strategic_sales', 'customer_operations'],
	cp         : ['cp_sales', 'cp_portfolio'],
};

const getChannelWiseRolesFilters = ({ channels }) => {
	if (isEmpty(channels)) return undefined;

	let applicableRoleSubFunctions = [];
	channels.forEach((channel) => {
		const roleSubFunctions = CHANNEL_WISE_ROLES_SUB_FUNCTIONS_FILTER_MAPPING[channel] || [];

		applicableRoleSubFunctions = [...applicableRoleSubFunctions, ...roleSubFunctions];
	});

	return isEmpty(applicableRoleSubFunctions) ? undefined : applicableRoleSubFunctions;
};

export default getChannelWiseRolesFilters;
