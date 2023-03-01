import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

interface UseSelectorProps {
	general?: any;
	profile?: object;
}

interface ListInterface {
	data: Array<object>,
	total: number,
	total_page: number,
	fullResponse: any,
	reverted: number,
}

const useGetFiniteList = (hook: any, params = {}) => {
	const { pathname } = useSelector(
		({ general, profile }: UseSelectorProps) => ({
			...general,
			user_profile: profile,
		}),
	);

	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(true);
	const [initialPath] = useState(pathname);
	const [filters, setFilters] = useState({ page: 1 });
	const [list, setList] = useState<ListInterface>({
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
			.then((res: any) => {
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
	};
};

export default useGetFiniteList;
