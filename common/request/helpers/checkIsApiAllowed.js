import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import store from '@cogoport/store';

import getAuthorizationParams from './get-final-authpipe';

const checkIsApiAllowed = ({ condition = {}, permissions_navigations = {} }) => {
	const { value = '', with_permissions_navigations_as: pNavs = null, in_navigation = null } = condition || {};
	const authorizationparameters = getAuthorizationParams(store, value);
	const navigation = (authorizationparameters || '').split(':')[GLOBAL_CONSTANTS.zeroth_index];

	const new_permissions_navigations = pNavs || permissions_navigations;

	const new_navigation = in_navigation || navigation;

	if (new_permissions_navigations && new_navigation) {
		let isApi = false;

		const apiPermissions = new_permissions_navigations?.[new_navigation]?.[value];
		if (apiPermissions) {
			const allowApiScopeThere = !!apiPermissions.find(
				(perm) => perm.view_type !== 'none',
			);

			if (allowApiScopeThere) {
				isApi = true;
			}
		}
		return isApi;
	}
	return false;
};

export default checkIsApiAllowed;
