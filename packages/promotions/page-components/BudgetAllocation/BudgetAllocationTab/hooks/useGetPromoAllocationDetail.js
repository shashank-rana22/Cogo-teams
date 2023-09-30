import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useGetPromoAllocationDetail = ({ selectedDetails = {}, filters, setFilters }) => {
	const [List, setList] = useState([]);
	const [paginationData, setPaginationData] = useState({});

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/get_promotion_budget_allocation_detail',
			method : 'GET',
			params : {
				page    : filters?.page,
				filters : {
					role_id  : selectedDetails?.role_id,
					agent_id : filters.agent_id || undefined,
				},
			},
		},
		{ manual: true },
	);

	const getAllocationDetail = useCallback(async () => {
		try {
			const { data } = await trigger();
			const { list = [], ...paginationdata } = data;
			setList(list);
			setPaginationData(paginationdata);
		} catch (error) {
			Toast.error(error.message);
		}
	}, [trigger, setList, setPaginationData]);

	useEffect(() => {
		getAllocationDetail();
	}, [filters.page, filters.agent_id, getAllocationDetail]);

	const refetch = () => {
		setFilters({ ...filters, page: 1 });
		getAllocationDetail();
	};
	return {
		loading,
		promoAllocationList: List,
		paginationData,
		refetch,
	};
};

export default useGetPromoAllocationDetail;
