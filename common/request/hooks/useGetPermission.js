import store, { useSelector } from '@cogoport/store';

import checkIsApiAllowed from '../helpers/checkIsApiAllowed';
import checkIsInViewScope from '../helpers/checkIsInViewScope';
import checkIsInViewType from '../helpers/checkIsInViewType';
import getAuthParams from '../helpers/get-final-authpipe';

const useGetPermission = () => {
	const { scope, permissions_navigations, entity_types } = useSelector(({ general, profile }) => ({
		scope                   : general?.scope,
		permissions_navigations : profile?.permissions_navigations,
		entity_types            : profile?.partner?.entity_types,

	}));

	const isChannelPartner = entity_types?.includes('channel_partner') && !entity_types?.includes('cogoport');

	const checkForCondition = (condition) => {
		const { type = 'api', value = '', in_api = '' } = condition || {};
		if (type === 'api') {
			const authorizationparameters = getAuthParams(store, value);
			return checkIsApiAllowed({ condition, permissions_navigations, authorizationparameters });
		}
		if (type === 'viewscope') {
			const authorizationparameters = getAuthParams(store, in_api);
			return checkIsInViewScope({ condition, permissions_navigations, authorizationparameters });
		}
		if (type === 'viewtype') {
			const authorizationparameters = getAuthParams(store, in_api);
			return checkIsInViewType({ condition, permissions_navigations, authorizationparameters });
		}
		if (type === 'scope') {
			return scope === value;
		}
		return false;
	};

	const isConditionMatches = (conditions = [], type = 'and') => {
		let matches = type === 'and';
		conditions?.forEach((condition) => {
			if (type === 'and') {
				matches = matches && checkForCondition(condition);
			} else {
				matches = matches || checkForCondition(condition);
			}
		});
		return matches;
	};

	const isAuthorizeToSee = ({
		conditions = [],
		type = 'and',
		children = null,
	}) => (isConditionMatches(conditions, type) ? children : null);

	return {
		isChannelPartner,
		isConditionMatches,
		getAuthParams,
		permissions_navigations,
		scope,
		isAuthorizeToSee,
		entity_types,
	};
};

export default useGetPermission;
