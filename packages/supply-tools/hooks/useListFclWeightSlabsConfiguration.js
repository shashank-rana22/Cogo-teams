import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useListFclWeightSlabsConfiguration = () => {
	const [filters, setFilters] = useState({
		page: 1,
	});

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_fcl_weight_slabs_configuration',
		scope  : 'partner',
	});

	const { page = 1 } = filters;

	const listWeightSlabs = useCallback(async () => {
		try {
			await trigger({
				params: {
					page,
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger, page]);

	useEffect(() => {
		listWeightSlabs();
	}, [listWeightSlabs, filters]);

	return {
		listWeightSlabs,
		data,
		loading,
		filters,
		setFilters,
	};
};

export default useListFclWeightSlabsConfiguration;
