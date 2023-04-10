import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetMilestones = () => {
	const [filters, setFilters] = useState({
		page       : 1,
		page_limit : 10,
		// type       : 'continent',
	});

	const [list, setList] = useState({
		data         : [],
		total        : 0,
		total_page   : 0,
		fullResponse : {},
	});

	const { page, page_limit, ...restFilters } = filters;

	const [{ error, loading }, refetch] = useRequest({
		url    : '/list_standard_event_mapping',
		method : 'GET',
		params : {
			page,
			page_limit,
			filters: {
				...(restFilters || {}),
			},
		},
	});

	useEffect(() => {
		refetch()
			.then((res) => {
				const { data = { list: [], total_pages: 0 } } = res;
				setList(() => ({
					data         : data?.list || [],
					total        : data?.total_count,
					total_page   : data?.total_pages,
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

export default useGetMilestones;
