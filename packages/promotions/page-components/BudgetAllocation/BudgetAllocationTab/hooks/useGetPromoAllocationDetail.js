import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

const useGetPromoAllocationDetail = ({ selectedDetails = {}, filterValue = {} }) => {
	const {
		general: { scope = '' },
	} = useSelector((state) => state);
	const [List, setList] = useState([]);
	const [paginationData, setPaginationData] = useState({});
	const [pagination, setPagination] = useState({ page: 1 });

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/get_promotion_budget_allocation_detail',
			method : 'GET',
			scope,
			params : {
				page    : pagination?.page,
				filters : {
					role_id  : selectedDetails?.role_id,
					agent_id : filterValue || undefined,
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
			Toast.error(error);
		}
	}, [trigger, setList, setPaginationData]);

	useEffect(() => {
		getAllocationDetail();
	}, [pagination.page, filterValue, getAllocationDetail]);

	const refetch = () => {
		setPagination({ page: 1 });
		getAllocationDetail();
	};
	return {
		loading,
		promoAllocationList: List,
		paginationData,
		setPagination,
		refetch,
	};
};

export default useGetPromoAllocationDetail;
