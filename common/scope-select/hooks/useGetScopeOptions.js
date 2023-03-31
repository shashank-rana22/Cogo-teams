import { routeConfig } from '@cogoport/navigation-configs';
import { useSelector } from '@cogoport/store';
import { useMemo } from 'react';

import { getNavData } from '../utils/getNavData';

export default function useGetScopeOptions({ defaultValues = {} } = {}) {
	const { profile, general } = useSelector((store) => store);
	const { pathname } = general || {};
	const { permissions_navigations } = profile || {};
	const { navigation } = routeConfig[pathname] || {};

	const scopeValues = useMemo(() => {
		const navData = getNavData(navigation) || {};
		const { main_apis } = navData;
		const allNavApis = (permissions_navigations || {})[navigation] || {};

		const scopes = [];
		const viewTypes = {};
		let defaultScope = null;
		let defaultView = null;
		const defaultAgentId = defaultValues.selected_agent_id;

		(main_apis || []).forEach((api) => {
			(allNavApis[api] || []).forEach((scopeData) => {
				const { is_default, through_criteria, type } = scopeData || {};

				if (type !== 'none') {
					scopes.push(type);
					viewTypes[type] = through_criteria || [];

					if (is_default || defaultValues.scope === type) {
						defaultScope = type;

						defaultView = viewTypes[type].includes(defaultValues.view_type)
							? defaultValues.view_type
							: (through_criteria || [])[0];
					}
				}
			});
		});

		return { scopes, viewTypes, defaultScope, defaultView, defaultAgentId };
	}, [navigation, permissions_navigations, defaultValues]);

	return {
		scopeData: scopeValues,
		navigation,
		permissions_navigations,
		pathname,
	};
}
