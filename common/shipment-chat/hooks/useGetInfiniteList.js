import { useState, useEffect } from 'react';
import { useSelector } from '@cogoport/store';

const useGetInfiniteList = (hook, params = {}) => {
	const { pathname } = useSelector(({ general, profile }) => ({
		...general,
		user_profile: profile,
	}));
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(true);
	const [initialPath] = useState(pathname);
	const [filters, setFilters] = useState({ page: 1, highlight: undefined });
	const [list, setList] = useState({
		data: [],
		total: 0,
		total_page: 0,
	});
	const { page, highlight = false, ...restFilters } = filters;

	const refetch = () => {
		setLoading(true);
		hook(restFilters, page)
			.then((res) => {
				console.log(res, 'res');
				const { data = { list: [], total: 0 } } = res;
				setList((prevState) => ({
					data:
						data?.page <= 1
							? data?.list || []
							: [...(prevState.data || []), ...(data?.list || [])],
					total: data?.total_count,
					total_page: data?.total,
					fullResponse: res?.data,
				}));
				setLoading(false);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		if (initialPath === pathname) {
			setLoading(true);
			refetch();
		}
	}, [filters, JSON.stringify(params)]);

	const hookSetters = {
		setLoading,
		setFilters,
		setErrors,
		setList,
	};

	return {
		loading,
		page,
		filters: restFilters,
		list,
		errors,
		hookSetters,
		refetch,
		highlight,
	};
};

export default useGetInfiniteList;
