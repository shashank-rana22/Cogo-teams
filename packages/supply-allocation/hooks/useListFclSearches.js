import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const INITIAL_PAGE = 1;

const useListFclSearches = () => {
	const [pagination, setPagination] = useState(INITIAL_PAGE);
	const [filters, setFilters] = useState({});
	const [sortFilters, setSortFilters] = useState({});

	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/list_rolling_fcl_freight_searches',
			method : 'get',
			params : {
				service_data_required    : true,
				allocation_data_required : true,
			},
		},
		{ manual: false },
	);

	const refetchListFclSearches = async () => {
		try {
			await trigger({
				params: {
					service_data_required    : true,
					allocation_data_required : true,
					filters,
					...sortFilters,
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
					service_data_required    : true,
					allocation_data_required : true,
					filters,
					page                     : pagination,
					...sortFilters,
				},
			});
		} catch (err) {
			console.error(err);
		}
	}, [trigger, filters, pagination, sortFilters]);

	useEffect(() => {
		listFclSearchesApi();
	}, [filters, listFclSearchesApi]);

	return {
		data,
		loading,
		refetchListFclSearches,
		pagination,
		setPagination,
		filters,
		setFilters,
		sortFilters,
		setSortFilters,
	};
};

export default useListFclSearches;
