import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

import toastApiError from '../utlis/toastApiError';

const useGetListBusinessEntities = () => {
	const [filters, setFiters] = useState({});
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_business_entities',
		method : 'GET',
	}, { manual: true });

	const getListBusinessEntities = useCallback(async () => {
		try {
			const { page = 1 } = filters;
			await trigger({
				params: {
					filters: {
						...filters,
					},
					page,
					page_limit: 10,
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger, filters]);

	useEffect(() => {
		getListBusinessEntities();
	}, [getListBusinessEntities]);

	return {
		filters,
		setFiters,
		loading,
		data,
		refetch    : getListBusinessEntities,
		totalCount : data?.total_count,
	};
};
export default useGetListBusinessEntities;
