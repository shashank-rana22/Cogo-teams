import { useSelector } from '@cogoport/store';

const useGetPermission = () => {
	const {
		authorizationparameters,
		scope,
		permissions_navigations,
		entity_types,
	} = useSelector(({ general, profile }) => ({
		authorizationparameters : profile?.authorizationparameters,
		scope                   : general?.scope,
		permissions_navigations : profile?.permissions_navigations,
		entity_types            : profile?.partner?.entity_types,
	}));
	const isChannelPartner =		entity_types?.includes('channel_partner')
		&& !entity_types?.includes('cogoport');

	const isApiAllowed = (condition) => {
		const {
			value = '',
			with_permissions_navigations_as: pNavs = null,
			in_navigation = null,
		} = condition;
		const navigation = (authorizationparameters || '').split(':')[0];
		const new_permissions_navigations = pNavs || permissions_navigations;
		const new_navigation = in_navigation || navigation;
		if (new_permissions_navigations && new_navigation) {
			// The condition will get true if any of the navigation matches
			let isApi = false;
			// finding corresponding api
			const apiPermissions =				new_permissions_navigations?.[new_navigation]?.[value];
			if (apiPermissions) {
				// getting viewscope other than none
				const allowApiScopeThere = !!apiPermissions.find(
					(perm) => perm.type !== 'none',
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
		const authParams = (authorizationparameters || '').split(':');
		const {
			value = '',
			with_permissions_navigations_as: pNavs = null,
			in_navigation: in_nav,
			in_api = null,
		} = condition || {};
		const newPnavs = pNavs || permissions_navigations;
		const in_navigation = in_nav || authParams[0];
		if (in_api && in_navigation && newPnavs) {
			let isViewScope = false;
			// finding corresponding api
			const apiPermissions = newPnavs?.[in_navigation]?.[in_api];
			if (apiPermissions) {
				// getting viewscope other than none
				const allowApiScopeThere = !!apiPermissions.find(
					(perm) => perm.type === value,
				);
				if (allowApiScopeThere) {
					isViewScope = true;
				}
			}
			return isViewScope;
		}
		const viewscope = authParams[1];
		return !!(viewscope && viewscope === value);
	};
	const isInViewType = (condition) => {
		const authParams = (authorizationparameters || '').split(':');
		const {
			value = '',
			with_permissions_navigations_as: pNavs = null,
			in_navigation: in_nav,
			in_api = null,
			using_viewscope = null,
		} = condition || {};
		const newPnavs = pNavs || permissions_navigations;
		const in_navigation = in_nav || authParams[0];
		if (in_api && in_navigation && newPnavs && using_viewscope) {
			let isViewType = false;
			// finding corresponding api
			const apiPermissions = newPnavs?.[in_navigation]?.[in_api];
			if (apiPermissions) {
				// getting viewscope other than none
				const allowViewTypeThere = !!apiPermissions.find(
					(perm) => perm.type === using_viewscope
						&& (perm.through_criteria || []).includes(value),
				);
				if (allowViewTypeThere) {
					isViewType = true;
				}
			}
			return isViewType;
		}
		const viewtype = authParams[2];
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
	function AuthorizedToSee({
		conditions = [],
		type = 'and',
		children = null,
	}) {
		return isConditionMatches(conditions, type) ? children : null;
	}
	return {
		authorizationparameters,
		scope,
		permissions_navigations,
		entity_types,
		isConditionMatches,
		AuthorizedToSee,
		isChannelPartner,
	};
};

export default useGetPermission;
