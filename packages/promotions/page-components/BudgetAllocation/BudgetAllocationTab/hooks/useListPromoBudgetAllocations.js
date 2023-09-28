import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useListPromoBudgetAllocation = ({ activeTab = 'active_budget', role = '' }) => {
	const [List, setList] = useState([]);
	const [paginationData, setPaginationData] = useState({});
	const [pagination, setPagination] = useState({ page: 1 });

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/list_promotion_budget_allocations',
			method : 'GET',
			params : {
				role_data_required : true,
				page               : pagination?.page,
				filters            : {
					status  : activeTab === 'active_budget' ? 'active' : 'deactivated',
					role_id : role || undefined,
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
			Toast.error(error);
		}
	}, [trigger]);

	const refetch = () => {
		setPagination({ page: 1 });
		ListPromoBudget();
	};

	useEffect(() => {
		ListPromoBudget();
	}, [pagination.page, activeTab, role, ListPromoBudget]);

	useEffect(() => {
		setPagination((p) => ({ ...p, page: 1 }));
	}, [role]);

	return {
		loading,
		promoBudgetList: List,
		paginationData,
		setPagination,
		refetch,
	};
};

export default useListPromoBudgetAllocation;
