// import { useSelector } from '@cogoport/store';
import { useAllocationRequest } from '@cogoport/request';
// import { useEffect } from 'react';

const useKamExpertiseLevelConfig = () => {
	const [{ data = [], loading }] = useAllocationRequest({
		url     : 'kam_expertise_configuration',
		method  : 'get',
		authkey : 'get_allocation_kam_expertise_configuration',
		params  : { filters: { transition_level: 3 } },
	}, { manual: false });

	return {
		listkamLevelDetails: data,
		loading,
	};
};

export default useKamExpertiseLevelConfig;
