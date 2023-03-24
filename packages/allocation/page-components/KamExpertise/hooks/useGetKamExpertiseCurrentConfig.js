import { useAllocationRequest } from '@cogoport/request';

const useGetKamExpertiseCurrentConfig = () => {
	const [{ data = [], loading:ConfigCardLoading }, refetch] = useAllocationRequest({
		url     : 'kam_expertise_card_details',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_card_details',
		params  : {
			version_list_details: true,
		},
	}, { manual: false });

	return {
		listKamExpertiseCurrentConfigs: data,
		ConfigCardLoading,
		refetch,
	};
};
export default useGetKamExpertiseCurrentConfig;
