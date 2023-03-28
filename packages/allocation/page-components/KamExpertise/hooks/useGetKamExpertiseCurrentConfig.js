import { useAllocationRequest } from '@cogoport/request';

const useGetKamExpertiseCurrentConfig = () => {
	const [{ data = [], loading:ConfigCardLoading }, refetch] = useAllocationRequest({
		url     : 'kam_expertise_card_details',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_card_details',
	}, { manual: false });

	return {
		listKamExpertiseCurrentConfigs : data,
		ConfigCardLoading,
		cardRefetch                    : refetch,
	};
};
export default useGetKamExpertiseCurrentConfig;
