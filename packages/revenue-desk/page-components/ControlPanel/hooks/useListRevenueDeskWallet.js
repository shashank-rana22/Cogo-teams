import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useListRevenueDeskWallet = () => {
	const ONE_VALUE = 1;
	const [filters, setFilter] = useState({ service_type: 'fcl_freight', status: 'active' });
	const [page, setPage] = useState(ONE_VALUE);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_revenue_desk_wallet',
		method : 'get',
	}, { manual: true });

	const listRevenueDesk = useCallback(async () => {
		try {
			await trigger({ params: { filters }, page, pagination_data_required: true });
		} catch (error) {
			console.log(error);
		}
	}, [filters, trigger, page]);

	const refetch = () => { listRevenueDesk(); };

	useEffect(() => {
		listRevenueDesk();
	}, [listRevenueDesk, filters, page]);

	return { loading, data, filters, setFilter, refetch, page, setPage };
};

export default useListRevenueDeskWallet;
