import { useAllocationRequest } from '@cogoport/request';

function useGetAllocationKamExpertiseProfile(partner_user_id) {
	const [{ loading, data = {} }] = useAllocationRequest({
		url     : '/kam_expertise_profile',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_profile',
		params  : {
			filters: {
				status: 'active',
			},
			partner_user_id,
		},
	}, { manual: false });

	return {
		listLoading : loading,
		badgeList   : data,
	};
}

export default useGetAllocationKamExpertiseProfile;
