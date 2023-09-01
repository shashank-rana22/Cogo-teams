import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useListRevenueDeskWallet = () => {
	const [filters, setFilter] = useState({ service_type: 'fcl_freight', status: 'active' });
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_revenue_desk_wallet',
		method : 'get',
	}, { manual: true });

	const listRevenueDesk = useCallback(async () => {
		try {
			await trigger({ params: { filters } });
		} catch (error) {
			console.log(error);
		}
	}, [filters, trigger]);

	const refetch = () => { listRevenueDesk(); };

	useEffect(() => {
		listRevenueDesk();
	}, [listRevenueDesk, filters]);

	return { loading, data: data?.list, filters, setFilter, refetch };
};

export default useListRevenueDeskWallet;
