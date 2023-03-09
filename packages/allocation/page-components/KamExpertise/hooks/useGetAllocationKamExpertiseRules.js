import { useAllocationRequest } from '@cogoport/request';

function useGetAllocationKamExpertiseRules() {
	const params = {
		filters: {
			status: 'active',
		},
	};

	// Todo const [params,setParams] for attributes

	const [{ loading, data = {} }, refetch] = useAllocationRequest({
		method  : 'get',
		url     : '/kam_expertise_rules',
		authkey : 'get_allocation_kam_expertise_rules',
		params,
	});

	return {
		attributeList: data.list || [],
		loading,
		refetch,
	};
}

export default useGetAllocationKamExpertiseRules;
