import { useAllocationRequest } from '@cogoport/request';

const useGetKamExpertiseConfig = () => {
	const [{ data, loading }, refetch] = useAllocationRequest({
		url     : '/kam_expertise_configuration_levels',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_configuration_levels',
		params  : {
			filters: {
				expertise_type:
				['Customer Expertise', 'Trade Expertise', 'Commodity Expertise', 'Misc Expertise'],
				status: 'draft',
			},
			audit_data_required: true,
		},
	}, { manual: false });

	return {
		kamConfigDetails : data,
		levelLoading     : loading,
		refetch,
	};
};

export default useGetKamExpertiseConfig;
