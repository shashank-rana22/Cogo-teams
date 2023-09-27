import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetLocationsList = () => {
	const [filters, setFilters] = useState({
		page       : 1,
		page_limit : 10,
		type       : 'continent',
	});

	const { page, page_limit, ...restFilters } = filters;

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_locations',
		method : 'GET',

	});
	const apiTrigger = async () => {
		await trigger({
			params: {
				includes : { status: true, default_params_required: true },
				page,
				page_limit,
				filters  : {
					status: 'active',
					...(restFilters || {}),
				},
			},
		});
	};
	useEffect(() => {
		apiTrigger();
		// eslint-disable-next-line
	}, [filters]);

	return {
		loading,
		filters,
		data,
		setFilters,
		refetch: apiTrigger,
	};
};

export default useGetLocationsList;
