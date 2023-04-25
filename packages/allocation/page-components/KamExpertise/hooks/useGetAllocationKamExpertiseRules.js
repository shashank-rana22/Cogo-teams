import { useAllocationRequest } from '@cogoport/request';

function useGetAllocationKamExpertiseRules() {
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
