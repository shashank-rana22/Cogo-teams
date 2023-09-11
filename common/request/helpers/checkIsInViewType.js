import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const VIEW_TYPE_INDEX = 2;

const checkIsInViewType = ({ condition = {}, authorizationparameters = '', permissions_navigations = {} }) => {
	const authParams = (authorizationparameters || '').split(':');
	const {
		value = '',
		with_permissions_navigations_as: pNavs = null,
		in_navigation: in_nav,
		in_api = null,
		using_viewscope = null,
	} = condition || {};
	const newPnavs = pNavs || permissions_navigations;
	const in_navigation = in_nav || authParams[GLOBAL_CONSTANTS.zeroth_index];
	if (in_api && in_navigation && newPnavs && using_viewscope) {
		let isViewType = false;

		const apiPermissions = newPnavs?.[in_navigation]?.[in_api];
		if (apiPermissions) {
			const allowViewTypeThere = !!apiPermissions.find(
				(perm) => perm.view_type === using_viewscope
						&& (perm.through_criteria || []).includes(value),
			);
			if (allowViewTypeThere) {
				isViewType = true;
			}
		}
		return isViewType;
	}
	const viewtype = authParams[VIEW_TYPE_INDEX];
	return !!(viewtype && viewtype === value);
};

export default checkIsInViewType;
