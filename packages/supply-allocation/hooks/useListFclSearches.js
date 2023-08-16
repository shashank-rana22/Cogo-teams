import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useListFclSearches = ({ filters = {} }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_supply_fcl_freight_searches',
		method : 'get',
		params : {
			service_data_required: true,
		},
	}, { manual: false });

	const refetchListFclSearches = async () => {
		try {
			await trigger({
				params: {
					service_data_required: true,
					filters,
				},
			});
		} catch (err) {
			console.error(err);
		}
	};

	const listFclSearchesApi = useCallback(async () => {
		try {
			await trigger({
				params: {
					service_data_required: true,
					filters,
				},
			});
		} catch (err) {
			console.error(err);
		}
	}, [filters, trigger]);

	useEffect(() => {
		listFclSearchesApi();
	}, [filters, listFclSearchesApi]);

	return {
		data,
		loading,
		refetchListFclSearches,
	};
};

export default useListFclSearches;
