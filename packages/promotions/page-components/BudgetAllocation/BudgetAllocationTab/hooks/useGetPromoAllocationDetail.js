import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetPromoAllocationDetail = ({ selectedDetails = {} }) => {
	const [List, setList] = useState([]);
	const [paginationData, setPaginationData] = useState({});
	const [filters, setFilters] = useState({ agent_id: '', page: 1 });

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
			toastApiError(error);
		}
	}, [trigger, setList, setPaginationData]);

	useEffect(() => {
		getAllocationDetail();
	}, [filters, getAllocationDetail]);

	const refetch = () => {
		setFilters({ ...filters, page: 1 });
		getAllocationDetail();
	};

	return {
		loading,
		promoAllocationList: List,
		paginationData,
		refetch,
		filters,
		setFilters,
	};
};

export default useGetPromoAllocationDetail;
