import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';

import getCustomAuthParams from './getCustomAuthParams';

const SCOPE_INDEX = 1;
const VIEW_TYPE_INDEX = 2;

const useGetPermission = ({ navigation: currNav = '' }) => {
	const {
		scope,
		permissions_navigations,
	} = useSelector(({ general, profile }) => ({
		scope                   : general?.scope,
		permissions_navigations : profile?.permissions_navigations,
	}));

	const isApiAllowed = (condition) => {
		const {
			value = '',
			with_permissions_navigations_as: pNavs = null,
			in_navigation = null,
			in_api = '',
		} = condition;

		const authorizationparameters = getCustomAuthParams({ permissions_navigations, in_api, currNav });
		const navigation = (authorizationparameters || '').split(':')[GLOBAL_CONSTANTS.zeroth_index];
		const new_permissions_navigations = pNavs || permissions_navigations;
		const new_navigation = in_navigation || navigation;
		if (new_permissions_navigations && new_navigation) {
			// The condition will get true if any of the navigation matches
			let isApi = false;
			// finding corresponding api
			const apiPermissions = new_permissions_navigations?.[new_navigation]?.[value];
			if (apiPermissions) {
				// getting viewscope other than none
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

	const isInViewScope = (condition) => {
		const {
			value = '',
			with_permissions_navigations_as: pNavs = null,
			in_navigation: in_nav,
			in_api = null,
		} = condition || {};

		const authorizationparameters = getCustomAuthParams({ currNav, in_api, permissions_navigations });
		const authParams = (authorizationparameters || '').split(':');

		const newPnavs = pNavs || permissions_navigations;
		const in_navigation = in_nav || authParams[GLOBAL_CONSTANTS.zeroth_index];
		if (in_api && in_navigation && newPnavs) {
			let isViewScope = false;
			// finding corresponding api
			const apiPermissions = newPnavs?.[in_navigation]?.[in_api];
			if (apiPermissions) {
				// getting viewscope other than none
				const allowApiScopeThere = !!apiPermissions.find(
					(perm) => perm.view_type === value,
				);
				if (allowApiScopeThere) {
					isViewScope = true;
				}
			}
			return isViewScope;
		}
		const viewscope = authParams[SCOPE_INDEX];
		return !!(viewscope && viewscope === value);
	};
	const isInViewType = (condition) => {
		const {
			value = '',
			with_permissions_navigations_as: pNavs = null,
			in_navigation: in_nav,
			in_api = null,
			using_viewscope = null,
		} = condition || {};

		const authorizationparameters = getCustomAuthParams({ currNav, in_api, permissions_navigations });
		const authParams = (authorizationparameters || '').split(':');

		const newPnavs = pNavs || permissions_navigations;
		const in_navigation = in_nav || authParams[GLOBAL_CONSTANTS.zeroth_index];
		if (in_api && in_navigation && newPnavs && using_viewscope) {
			let isViewType = false;
			// finding corresponding api
			const apiPermissions = newPnavs?.[in_navigation]?.[in_api];
			if (apiPermissions) {
				// getting viewscope other than none
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
	// type can be -> api / viewscope / viewtype / scope
	const checkForCondition = (condition) => {
		const { type = 'api', value = '' } = condition || {};
		if (type === 'api') {
			return isApiAllowed(condition);
		}
		if (type === 'viewscope') {
			return isInViewScope(condition);
		}
		if (type === 'viewtype') {
			return isInViewType(condition);
		}
		if (type === 'scope') {
			return scope === value;
		}
		return false;
	};

	const isConditionMatches = (conditions = [], type = 'and') => {
		// type may be and / or
		let matches = type === 'and';
		conditions.forEach((condition) => {
			if (type === 'and') {
				matches = matches && checkForCondition(condition);
			} else {
				matches = matches || checkForCondition(condition);
			}
		});
		return matches;
	};

	const authorizedToSee = ({
		conditions = [],
		type = 'and',
		children = null,
	}) => (isConditionMatches(conditions, type) ? children : null);

	return {
		scope,
		permissions_navigations,
		isConditionMatches,
		authorizedToSee,
	};
};

export default useGetPermission;
