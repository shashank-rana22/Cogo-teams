import { routeConfig } from '@cogoport/navigation-configs';
import { useSelector } from '@cogoport/store';
import { useMemo } from 'react';

import getNavData from '../utils/getNavData';

export default function useGetScopeOptions({ defaultValues = {}, apisToConsider = [] } = {}) {
	const { profile, general } = useSelector((store) => store);
	const { pathname } = general || {};
	const { permissions_navigations } = profile || {};
	const { navigation } = routeConfig[pathname] || {};

	const scopeValues = useMemo(() => {
		const navData = getNavData(navigation) || {};
		let { main_apis } = navData;
		const allNavApis = (permissions_navigations || {})[navigation] || {};

		main_apis = apisToConsider?.length > 0 ? apisToConsider : main_apis;

		let scopes = [];
		const viewTypes = {};
		let defaultScope = null;
		let defaultView = null;
		const defaultAgentId = defaultValues?.selected_agent_id || '';

		(main_apis || []).forEach((api) => {
			(allNavApis[api] || []).forEach((scopeData) => {
				const { is_default, through_criteria, type } = scopeData || {};

				if (type !== 'none') {
					scopes.push(type);
					viewTypes[type] = Array.from(new Set(through_criteria)) || [];

					if ((!defaultScope && is_default) || defaultValues.scope === type) {
						defaultScope = type;

						defaultView = viewTypes[type]?.includes(defaultValues?.view_type)
							? defaultValues?.view_type
							: (through_criteria || [])[0];
					}
				}
			});
		});
		scopes = Array.from(new Set(scopes));

		return { scopes, viewTypes, defaultScope, defaultView, defaultAgentId };
	}, [navigation, permissions_navigations, defaultValues, apisToConsider]);

	return {
		scopeData: scopeValues,
		navigation,
		permissions_navigations,
		pathname,
	};
}
