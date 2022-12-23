import { request } from '@cogoport/request/helpers/request';
import { useSelector } from '@cogoport/store';
import { merge } from '@cogoport/utils';
import { useState } from 'react';

// import VCs from '../constants/global';

import useGetInfiniteList from './useGetInfiniteList';

const getActivityList = (api, filterValues, otherParams = {}) => {
	const filters = merge({ filters: { ...filterValues } }, otherParams);

	return request.get(`/${api}`, {
		params: { ...filters },
	});
};

const useGetList = ({ config, formatParams }) => {
	const { tabs } = config || {};
	const { active, filterKey, tabs: tabObj } = tabs;
	// const { scope, authorizationparameters, selected_agent_id } = useSelector(
	// 	({ general, profile }) => ({
	// 		scope                   : general.scope,
	// 		authorizationparameters : profile?.authorizationparameters,
	// 		selected_agent_id       : profile.selected_agent_id,
	// 	}),
	// );
	const [currentTab, setCurrentTab] = useState(active || '');
	const activeConfig = tabObj[currentTab];

	const { api, params: activeParams } = activeConfig;

	const getActivity = (rawFilters, currentPage) => {
		// const view_type = authorizationparameters?.split(':')[2];
		const agent_key = {};

		// const key =			VCs.VIEW_KEY_MAPPINGS[view_type] || VCs.VIEW_KEY_MAPPINGS.default;

		// agent_key[key] = selected_agent_id;

		const allFilters = { ...agent_key, ...rawFilters };
		if (filterKey) {
			allFilters[filterKey] = currentTab;
		}

		let filters = {};
		let otherParams = {};
		if (formatParams) {
			const formattedParams = formatParams(allFilters, activeParams);
			otherParams = formattedParams.otherParams || {};
			filters = formattedParams.filters || {};
		} else {
			filters = allFilters || {};
			if (activeParams) {
				otherParams = activeParams;
			} else {
				otherParams = {};
			}
		}

		return getActivityList(
			api,
			filters,
			{ page_limit: 20, ...(otherParams || {}), page: currentPage },
			// scope,
		);
	};

	const {
		loading,
		page,
		filters,
		list: { data, total, total_page },
		hookSetters,
		refetch,
	} = useGetInfiniteList(getActivity, {
		// authorizationparameters,
		// selected_agent_id,
	});
	const newData = data;
	return {
		loading,
		page,
		filters,
		list: { data: newData, total, total_page },
		hookSetters,
		setCurrentTab,
		currentTab,
		refetch,
	};
};
export default useGetList;
