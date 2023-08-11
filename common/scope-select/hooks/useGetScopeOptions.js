import { routeConfig } from '@cogoport/navigation-configs';
import { useSelector } from '@cogoport/store';
import { useMemo } from 'react';

import getNavData from '../utils/getNavData';

const ZEROTH_INDEX = 0;

export default function useGetScopeOptions({ defaultValues = {}, apisToConsider = [] } = {}) {
	const { profile, general } = useSelector((store) => store);
	const { pathname } = general || {};
	const { permissions_navigations } = profile || {};
	const { navigation } = routeConfig[pathname] || {};

	const scopeValues = useMemo(() => {
		const navData = getNavData(navigation) || {};
		let { main_apis } = navData;
		const allNavApis = (permissions_navigations || {})[navigation] || {};

		main_apis = apisToConsider?.length > ZEROTH_INDEX ? apisToConsider : main_apis;

		let scopes = [];
		const viewTypes = {};
		let defaultScope = null;
		let defaultView = null;
		const defaultAgentId = defaultValues?.selected_agent_id || '';

		(main_apis || []).forEach((api) => {
			(allNavApis[api] || []).forEach((scopeData) => {
				const { is_default, through_criteria, view_type } = scopeData || {};

				if (view_type !== 'none') {
					scopes.push(view_type);
					viewTypes[view_type] = Array.from(new Set(through_criteria)) || [];

					if ((!defaultScope && is_default) || defaultValues.scope === view_type) {
						defaultScope = view_type;

						defaultView = viewTypes[view_type]?.includes(defaultValues?.view_type)
							? defaultValues?.view_type
							: (through_criteria || [])[ZEROTH_INDEX];
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
