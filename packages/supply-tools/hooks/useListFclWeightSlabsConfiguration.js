import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useListFclWeightSlabsConfiguration = () => {
	const [filters, setFilters] = useState({
		page: 1,
	});

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_fcl_weight_slabs_configuration',
		scope  : 'partner',
	});

	const listWeightSlabs = useCallback(async () => {
		try {
			const { page } = filters;
			await trigger({
				params: {
					page,
				},
			});
		} catch (err) {
			console.error(err);
		}
	}, [filters, trigger]);

	useEffect(() => {
		listWeightSlabs();
	}, [listWeightSlabs]);

	return {
		listWeightSlabs,
		data,
		loading,
		filters,
		setFilters,
	};
};

export default useListFclWeightSlabsConfiguration;
