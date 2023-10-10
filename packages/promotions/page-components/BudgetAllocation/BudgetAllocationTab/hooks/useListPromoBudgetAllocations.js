import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useListPromoBudgetAllocation = () => {
	const [List, setList] = useState([]);
	const [paginationData, setPaginationData] = useState({});
	const [filters, setFilters] = useState({ activeTab: 'active_budget', role: '', page: 1 });

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/list_promotion_budget_allocations',
			method : 'GET',
			params : {
				role_data_required : true,
				page               : filters.page,
				filters            : {
					status  : filters.activeTab === 'active_budget' ? 'active' : 'deactivated',
					role_id : filters.role || undefined,
				},
			},
		},
		{ manual: true },
	);

	const ListPromoBudget = useCallback(async () => {
		try {
			const { data } = await trigger();
			const { list = [], ...paginationdata } = data;
			setList(list);
			setPaginationData(paginationdata);
		} catch (error) {
			Toast.error(error.message);
		}
	}, [trigger]);

	const refetch = () => {
		setFilters((state) => ({ ...state, page: 1 }));
		ListPromoBudget();
	};

	useEffect(() => {
		ListPromoBudget();
	}, [filters.page, filters.activeTab, filters.role, ListPromoBudget]);

	useEffect(() => {
		setFilters((state) => ({ ...state, page: 1 }));
	}, [filters.role, setFilters]);

	return {
		loading,
		promoBudgetList: List,
		paginationData,
		refetch,
		filters,
		setFilters,
	};
};

export default useListPromoBudgetAllocation;
