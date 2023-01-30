import {
	useRequest,
	// useCallback
} from '@cogoport/request';
import { useState } from 'react';

const useListAllocationRequests = () => {
	const [params, setParams] = useState({
		sort_by    : 'created_at',
		sort_type  : 'desc',
		page_limit : 10,
		page       : 1,
		filters    : {
			status: 'pending',
		},
	});

	const apiData = useRequest({
		url    : '/list_allocation_requests',
		method : 'get',
		params,
	}, { manual: false });

	const [{ loading, data }, refetch] = apiData;

	// useEffect(() => {
	// 	refetch();
	// }, [params]);

	// const onChangeParams = useCallback((values = {}) => {
	// 	setParams((previousState) => ({
	// 		...previousState,
	// 		...values,
	// 	}));
	// }, []);

	return { data, loading, refetch, setParams };
};

export default useListAllocationRequests;
