import { useAllocationRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetKamExpertiseConfig = ({ responseId }) => {
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

	useEffect(() => {
		refetch();
	}, [responseId, refetch]);

	return {
		kamConfigDetails : data,
		levelLoading     : loading,
		refetch,
	};
};

export default useGetKamExpertiseConfig;
