import { useAllocationRequest } from '@cogoport/request';

function useGetKamExpertiseCurrentConfig({ type = undefined }) {
	const [{ data = {}, loading }, refetch] = useAllocationRequest({
		url     : 'kam_expertise_card_details',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_card_details',
		params  : {
			...type
				? {
					filters: { status: type },
				} : null,
		},
	}, { manual: false });

	const { list = [] } = data;
	return {
		list,
		configCardLoading : loading,
		cardRefetch       : refetch,
	};
}
export default useGetKamExpertiseCurrentConfig;
