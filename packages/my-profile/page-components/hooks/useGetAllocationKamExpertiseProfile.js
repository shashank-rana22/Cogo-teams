import { useAllocationRequest } from '@cogoport/request';

function useGetAllocationKamExpertiseProfile(partner_user_id) {
	const [{ loading, data = {} }, refetch] = useAllocationRequest({
		url     : '/kam_expertise_profile',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_profile',
		params  : {
			filters: {
				status: ['active', 'profile'],
			},
			partner_user_id,
		},
	}, { manual: false });

	return {
		badgeListLoading    : loading,
		userBadges          : data,
		profileBadgeRefetch : refetch,
	};
}

export default useGetAllocationKamExpertiseProfile;
