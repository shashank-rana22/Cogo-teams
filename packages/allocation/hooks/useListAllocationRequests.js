import { useRequest } from '@cogoport/request';
import { useCallback, useState } from 'react';

const useListAllocationRequests = () => {
	const [params, setParams] = useState({
		sort_by    : 'created_at',
		sort_type  : 'desc',
		page_limit : 10,
		page       : 1,
		filters    : {
			status       : 'pending',
			service_type : 'organization',
		},
	});

	const apiData = useRequest({
		url    : '/list_allocation_requests',
		method : 'get',
		params,
	}, { manual: false });

	const [{ loading, data }, refetch] = apiData;

	const onChangeParams = useCallback((values = {}) => {
		setParams((previousState) => ({
			...previousState,
			...values,
		}));
	}, []);

	return { data, loading, refetch, params, onChangeParams };
};

export default useListAllocationRequests;
