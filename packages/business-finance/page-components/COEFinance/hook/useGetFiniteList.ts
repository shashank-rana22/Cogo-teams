import { useState, useEffect } from 'react';
import { useSelector } from '@cogoport/store';

interface UseSelectorProps{
    general?:any,
    profile?:object
}

const useGetFiniteList = (hook:any, params = {}) => {
	const { pathname } = useSelector(({ general, profile }:UseSelectorProps) => ({
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
		fullResponse: {},
		reverted: 0,
	});

	const { page, highlight = false, ...restFilters } = filters;

	const refetch = () => {
		setLoading(true);
		hook(restFilters, page)
			.then((res:any) => {
				const { data = { list: [], total: 0 } } = res;
				setList(() => ({
					data: data?.list || [],
					total: data?.total_count,
					total_page: data?.total,
					fullResponse: res.data,
					reverted: data?.stats?.reverted,
				}));
				setLoading(false);
			})
			.catch((e) => {
				console.log(e);
				setList(() => ({
					data: [],
					total: 0,
					total_page: 0,
					fullResponse: {},
					reverted: 0,
				}));
				setLoading(false);
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

export default useGetFiniteList;
