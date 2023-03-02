import { useRequest } from '@cogoport/request';

function useGetBadgeConfiguration() {
	const [{ loading = false, data: badgeListData = {} }] = useRequest({
		method  : 'get',
		url     : '/kam_expertise_badge_configuration',
		authkey : 'get_allocation_kam_expertise_badge_configuration',
	}, { manual: false });

	return {
		loading,
		badgeListData,
	};
}

export default useGetBadgeConfiguration;
