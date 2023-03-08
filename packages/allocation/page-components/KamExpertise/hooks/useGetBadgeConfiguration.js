// ! NOT USED YET
import { useAllocationRequest } from '@cogoport/request';

function useGetBadgeConfiguration() {
	const [{ loading = false, data: badgeListData = {} }, refetch] = useAllocationRequest({
		url     : '/kam_expertise_badge_configuration',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_badge_configuration',
		params  : { id: '8be211d7-bf22-46cc-915d-459db0231749' },
	}, { manual: false });

	// ToDo :[ Toast success and Error mssges]
	// ToDo : [ take id from the badge list item]

	return {
		loading,
		badgeListData,
	};
}

export default useGetBadgeConfiguration;
