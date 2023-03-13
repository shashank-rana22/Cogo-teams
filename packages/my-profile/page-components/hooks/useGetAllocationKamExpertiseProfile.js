import { useAllocationRequest } from '@cogoport/request';

function useGetAllocationKamExpertiseProfile() {
	const [{ loading, data = {} }] = useAllocationRequest({
		url     : '/kam_expertise_profile',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_profile',
	}, { manual: false });

	return {
		loading,
		badgeList: data,
	};
}

export default useGetAllocationKamExpertiseProfile;
