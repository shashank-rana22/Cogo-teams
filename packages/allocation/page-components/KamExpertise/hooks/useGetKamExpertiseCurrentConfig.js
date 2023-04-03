import { useAllocationRequest } from '@cogoport/request';

const useGetKamExpertiseCurrentConfig = () => {
	const [{ data = {}, loading:configCardLoading }, refetch] = useAllocationRequest({
		url     : 'kam_expertise_card_details',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_card_details',
	}, { manual: false });

	const { list = [] } = data;

	const ALL_VERSIONS = list.filter((item) => item.status !== 'draft');
	const DRAFTS = list.filter((item) => item.status === 'draft');
	const LIVE_VERSION_DATA = list.filter((item) => item.status === 'live')?.[0] || {};

	return {
		data,
		ALL_VERSIONS,
		DRAFTS,
		LIVE_VERSION_DATA,
		configCardLoading,
		cardRefetch: refetch,
	};
};
export default useGetKamExpertiseCurrentConfig;
