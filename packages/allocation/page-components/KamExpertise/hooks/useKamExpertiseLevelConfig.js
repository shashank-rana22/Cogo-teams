// import { useSelector } from '@cogoport/store';
import { useAllocationRequest } from '@cogoport/request';
// import { useEffect } from 'react';

const useKamExpertiseLevelConfig = ({ title }) => {
	const [{ data = [], loading:listLoading }, listrefetch] = useAllocationRequest({
		url     : 'kam_expertise_configuration',
		method  : 'get',
		authkey : 'get_allocation_kam_expertise_configuration',
		params  : {
			filters: {
				transition_level : title,
				status           : 'draft',
			},

		},
	}, { manual: false });

	return {
		listkamLevelDetails: data,
		listLoading,
		listrefetch,
	};
};

export default useKamExpertiseLevelConfig;
