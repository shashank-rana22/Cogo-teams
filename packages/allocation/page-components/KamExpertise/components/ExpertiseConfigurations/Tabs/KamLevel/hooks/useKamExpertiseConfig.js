// import { useSelector } from '@cogoport/store';

import { useAllocationRequest } from '@cogoport/request';

const useKamExpertiseConfig = () => {
	const [{ data = [], loading }] = useAllocationRequest({
		url     : 'kam_expertise_configuration_levels',
		method  : 'get',
		authkey : 'get_allocation_kam_expertise_configuration_levels',
		params  : {
			sort_type: 'desc',
		},
	}, { manual: false });

	return {
		kamConfigDetails: data,
		loading,
	};
};

export default useKamExpertiseConfig;
