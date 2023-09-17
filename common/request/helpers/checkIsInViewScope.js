import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const VIWE_SCOPE_INDEX = 1;

const checkIsInViewScope = ({ condition = {}, authorizationparameters = '', permissions_navigations = {} }) => {
	const authParams = (authorizationparameters || '').split(':');

	const {
		value = '',
		with_permissions_navigations_as: pNavs = null,
		in_navigation: in_nav,
		in_api = null,
	} = condition || {};

	const in_navigation = in_nav || authParams[GLOBAL_CONSTANTS.zeroth_index];

	const newPnavs = pNavs || permissions_navigations;

	if (in_api && in_navigation && newPnavs) {
		let isViewScope = false;

		const apiPermissions = newPnavs?.[in_navigation]?.[in_api];
		if (apiPermissions) {
			const allowApiScopeThere = !!apiPermissions.find(
				(perm) => perm.view_type === value,
			);
			if (allowApiScopeThere) {
				isViewScope = true;
			}
		}
		return isViewScope;
	}
	const viewscope = authParams[VIWE_SCOPE_INDEX];
	return !!(viewscope && viewscope === value);
};

export default checkIsInViewScope;
