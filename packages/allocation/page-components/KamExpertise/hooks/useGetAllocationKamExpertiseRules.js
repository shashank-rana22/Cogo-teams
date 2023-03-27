import { useAllocationRequest } from '@cogoport/request';
// import { useState } from 'react';

function useGetAllocationKamExpertiseRules() {
	// const [params, setParams] = useState({
	// 	filters: {
	// 		status: 'active',
	// 	},
	// });

	const [{ loading, data = {} }, refetch] = useAllocationRequest({
		method  : 'get',
		url     : '/kam_expertise_rules',
		authkey : 'get_allocation_kam_expertise_rules',
		params  : {
			filters: {
				status: 'active',
			},
		},
	});

	return {
		attributeList: data.list || [],
		loading,
		refetch,
	};
}

export default useGetAllocationKamExpertiseRules;
