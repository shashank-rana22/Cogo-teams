import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

const useGetFiniteList = (hook) => {
	const { pathname } = useSelector(({ general, profile }) => ({
		...general,
		user_profile: profile,
	}));
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(true);
	const [initialPath] = useState(pathname);
	const [filters, setFilters] = useState({ page: 1, negotiation_status: 'awaiting_responses' });
	const [list, setList] = useState({
		data         : [],
		total        : 0,
		total_page   : 0,
		fullResponse : {},
		reverted     : 0,
	});

	const { page, ...restFilters } = filters;

	const refetch = () => {
		setLoading(true);
		hook(restFilters, page)
			.then((res) => {
				const { data = { list: [], total: 0 } } = res;
				setList(() => ({
					data         : data?.list || [],
					total        : data?.total_count,
					total_page   : data?.total,
					fullResponse : res.data,
					reverted     : data?.stats?.reverted,
				}));
				setLoading(false);
			})
			.catch(() => {
				// console.log(e);
				setList(() => ({
					data         : [],
					total        : 0,
					total_page   : 0,
					fullResponse : {},
					reverted     : 0,
				}));
				setLoading(false);
			});
	};

	useEffect(() => {
		if (initialPath === pathname) {
			setLoading(true);
			refetch();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(filters)]);

	const hookSetters = {
		setLoading,
		setFilters,
		setErrors,
		setList,
	};

	return {
		loading,
		page,
		filters,
		list,
		errors,
		hookSetters,
		refetch,
	};
};

export default useGetFiniteList;
