import { useRequest } from '@cogoport/request';
import { useCallback, useState, useEffect } from 'react';

const useGetMilestones = ({ sideBar }) => {
	const [filters, setFilters] = useState({
		page       : 1,
		page_limit : 10,
	});

	const [list, setList] = useState({
		data         : [],
		total        : 0,
		total_page   : 0,
		fullResponse : {},
	});

	const { page, page_limit, source, ...restFilters } = filters;
	const [{ error, loading }, refetch] = useRequest({
		url    : '/list_standard_event_mapping',
		method : 'GET',
		params : {
			page,
			page_limit,
			filters: {
				...(restFilters || {}),
				source: source || undefined,
			},
		},
	}, { manual: true });
	const getRefetch = useCallback(async () => {
		try {
			const res = await refetch({});
			const { data = { list: [], total_pages: 0 } } = res;
			setList(() => ({
				data         : data?.list || [],
				total        : data?.total_count,
				total_page   : data?.total_pages,
				fullResponse : res.data,
			}));
		} catch {
			setList(() => ({
				data         : [],
				total        : 0,
				total_page   : 0,
				fullResponse : {},
				reverted     : 0,
			}));
		}
	}, [refetch]);

	useEffect(() => {
		getRefetch();
	}, [getRefetch, sideBar]);

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
		getRefetch,
	};
};

export default useGetMilestones;
