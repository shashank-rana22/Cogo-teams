import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const INITIAL_PAGE = 1;

const useListFclSearches = ({ filters = {} }) => {
	const [pagination, setPagination] = useState(INITIAL_PAGE);
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
					service_data_required : true,
					filters,
					page                  : pagination,

				},
			});
		} catch (err) {
			console.error(err);
		}
	}, [filters, trigger, pagination]);

	useEffect(() => {
		listFclSearchesApi();
	}, [filters, listFclSearchesApi]);

	return {
		data,
		loading,
		refetchListFclSearches,
		pagination,
		setPagination,
	};
};

export default useListFclSearches;
