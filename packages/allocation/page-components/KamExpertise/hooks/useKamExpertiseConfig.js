// import { useSelector } from '@cogoport/store';

import { useAllocationRequest } from '@cogoport/request';

const useKamExpertiseConfig = () => {
	const [{ data, loading }, refetch] = useAllocationRequest({
		url     : '/kam_expertise_configuration_levels',
		method  : 'GET',
		authkey : 'get_allocation_kam_expertise_configuration_levels',
		params  : {
			filters: {
				expertise_type : ['Customer Expertise', 'Trade Expertise', 'Commodity Expertise', 'Misc Expertise'],
				status         : 'draft',
			},

		},
	}, { manual: false });

	return {
		kamConfigDetails: data,
		loading,
		refetch,
	};
};

export default useKamExpertiseConfig;
