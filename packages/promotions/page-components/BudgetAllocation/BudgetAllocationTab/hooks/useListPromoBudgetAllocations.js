import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useListPromoBudgetAllocation = () => {
	const [list, setList] = useState([]);
	const [paginationData, setPaginationData] = useState({});
	const [filters, setFilters] = useState({
		activeTab : 'active_budget',
		role      : '',
		page      : 1,
	});

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/list_promotion_budget_allocations',
			method : 'GET',
			params : {
				role_data_required : true,
				page               : filters.page,
				filters            : {
					status:
            filters.activeTab === 'active_budget' ? 'active' : 'deactivated',
					role_id: filters.role || undefined,
				},
			},
		},
		{ manual: true },
	);

	const triggerPromoBudget = useCallback(async () => {
		try {
			const res = await trigger();
			const { list: resList = [], ...paginationdata } = res?.data || {};
			setList(resList);
			setPaginationData(paginationdata);
		} catch (error) {
			toastApiError(error);
		}
	}, [trigger]);

	const refetch = () => {
		setFilters((state) => ({ ...state, page: 1 }));
		triggerPromoBudget();
	};

	useEffect(() => {
		triggerPromoBudget();
	}, [filters.page, filters.activeTab, filters.role, triggerPromoBudget]);

	useEffect(() => {
		setFilters((state) => ({ ...state, page: 1 }));
	}, [filters.role, setFilters]);

	return {
		loading,
		promoBudgetList: list,
		paginationData,
		refetch,
		filters,
		setFilters,
	};
};

export default useListPromoBudgetAllocation;
