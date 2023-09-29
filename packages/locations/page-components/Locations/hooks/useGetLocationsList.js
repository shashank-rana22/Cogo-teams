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
				includes: {
					status                  : true,
					locality_id             : true,
					created_at              : true,
					city_id                 : true,
					address                 : true,
					local_languages         : true,
					default_params_required : true,
				},
				filters: {
					...restFilters,
				},
				page,
				page_limit,

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
