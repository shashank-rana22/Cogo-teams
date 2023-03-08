import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

function useGetAllocationKamExpertiseStats() {
	const [params, setParams] = useState({
		kam_level : '1',
		duration  : '7',
	});

	const [{ loading, data: kam_level_data = {} }, refetch] = useAllocationRequest({
		method  : 'get',
		url     : 'kam_expertise_stats',
		authkey : 'get_allocation_kam_expertise_stats',
		params,
	});

	return {
		kam_level_data,
		loading,
		refetch,
	};
}

export default useGetAllocationKamExpertiseStats;
