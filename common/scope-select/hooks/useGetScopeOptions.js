import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { routeConfig } from '@cogoport/navigation-configs';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

import getNavData from '../utils/getNavData';

export default function useGetScopeOptions({
	defaultValues = {},
	apisToConsider = [],
	savedAuthDetails = {},
} = {}) {
	const { profile, general } = useSelector((store) => store);
	const { pathname } = general || {};
	const { permissions_navigations } = profile || {};
	const { navigation } = routeConfig[pathname] || {};

	const {
		scope: savedScope = '',
		through_criteria: savedThroughCriteria = '',
	} = savedAuthDetails || {};

	const scopeValues = useMemo(() => {
		const navData = getNavData({ navigation }) || {};
		let { main_apis } = navData;
		const allNavApis = (permissions_navigations || {})[navigation] || {};

		main_apis = !isEmpty(apisToConsider) ? apisToConsider : main_apis;

		let scopes = [];
		const VIEW_TYPES = {};
		let defaultScope = null;
		let defaultView = null;
		const defaultAgentId = defaultValues?.selected_agent_id || '';

		(main_apis || []).forEach((api) => {
			(allNavApis[api] || []).forEach((scopeData) => {
				const { is_default, through_criteria, view_type } = scopeData || {};

				if (view_type !== 'none') {
					scopes.push(view_type);
					VIEW_TYPES[view_type] = Array.from(new Set(through_criteria)) || [];

					if ((!defaultScope && is_default) || defaultValues.scope === view_type) {
						defaultScope = view_type;

						defaultView = VIEW_TYPES[view_type]?.includes(defaultValues?.view_type)
							? defaultValues?.view_type
							: (through_criteria || [])[GLOBAL_CONSTANTS.zeroth_index];
					}
				}
			});
		});
		scopes = Array.from(new Set(scopes));

		const isScopePresent = (scopes || []).some(
			(scopeOption) => scopeOption === savedScope,
		);

		const isViewTypePresent = (VIEW_TYPES?.[savedScope] || []).some(
			(viewType) => viewType === savedThroughCriteria,
		);

		if (isScopePresent || !defaultScope) {
			if (isViewTypePresent || !defaultScope) {
				defaultView = savedThroughCriteria;
			} else {
				defaultView = null;
			}
			defaultScope = savedScope;
		}

		return {
			scopes,
			viewTypes: VIEW_TYPES,
			defaultScope,
			defaultView,
			defaultAgentId,
		};
	}, [
		navigation,
		permissions_navigations,
		apisToConsider,
		defaultValues?.selected_agent_id,
		defaultValues.scope,
		defaultValues?.view_type,
		savedScope,
		savedThroughCriteria,
	]);

	return {
		scopeData: scopeValues,
		navigation,
		permissions_navigations,
		pathname,
	};
}
