import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

import { VALUE_ONE } from '../../constants';

const useListRevenueDeskWallet = () => {
	const [filters, setFilter] = useState({ service_type: 'all' });
	const [page, setPage] = useState(VALUE_ONE);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_revenue_desk_wallet',
		method : 'get',
	}, { manual: true });

	const { service_type } = filters;

	const listRevenueDesk = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters                  : { status: 'active' },
					service_type             : service_type === 'all' ? undefined : service_type,
					page,
					pagination_data_required : true,
				}
			|| {},
			});
		} catch (error) {
			// console.log(error);
		}
	}, [trigger, service_type, page]);

	const refetch = () => { listRevenueDesk(); };

	useEffect(() => {
		listRevenueDesk();
	}, [listRevenueDesk, filters, page]);

	return { loading, data, filters, setFilter, refetch, page, setPage };
};

export default useListRevenueDeskWallet;
