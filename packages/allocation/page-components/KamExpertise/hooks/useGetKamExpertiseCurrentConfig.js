import { useAllocationRequest } from '@cogoport/request';

const useGetKamExpertiseCurrentConfig = () => {
	const [{ data = [], loading:configCardLoading }, refetch] = useAllocationRequest({
		url     : 'kam_expertise_card_details',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_card_details',
	}, { manual: false });

	return {
		listKamExpertiseCurrentConfigs : data,
		configCardLoading,
		cardRefetch                    : refetch,
	};
};
export default useGetKamExpertiseCurrentConfig;
