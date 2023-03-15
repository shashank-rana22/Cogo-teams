import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetLocationsList = () => {
	const [filters, setFilters] = useState({
		page       : 1,
		page_limit : 10,
		type       : 'continent',
	});

	const [list, setList] = useState({
		data         : [],
		total        : 0,
		total_page   : 0,
		fullResponse : {},
	});

	const { page, page_limit, ...restFilters } = filters;

	const [{ error, loading }, refetch] = useRequest({
		url    : '/list_locations',
		method : 'GET',
		params : {
			page,
			page_limit,
			includes : { aliases: null, default_params_required: true },
			filters  : {
				status: 'active',
				...(restFilters || {}),
			},
		},
	});

	useEffect(() => {
		refetch()
			.then((res) => {
				const { data = { list: [], total: 0 } } = res;
				setList(() => ({
					data         : data?.list || [],
					total        : data?.total_count,
					total_page   : data?.total,
					fullResponse : res.data,
				}));
			})
			.catch(() => {
				setList(() => ({
					data         : [],
					total        : 0,
					total_page   : 0,
					fullResponse : {},
					reverted     : 0,
				}));
			});
		// eslint-disable-next-line
	}, [filters]);

	const hookSetters = {
		setFilters,
		setList,
	};

	return {
		loading,
		filters,
		list,
		error,
		hookSetters,
		refetch,
	};
};

export default useGetLocationsList;
