import { useAllocationRequest } from '@cogoport/request';

const useGetKamExpertiseLevelConfig = ({ transition_level }) => {
	const [{ data = [], loading:listLoading }] = useAllocationRequest({
		url     : 'kam_expertise_configuration',
		method  : 'get',
		authkey : 'get_allocation_kam_expertise_configuration',
		params  : {
			filters: {
				transition_level,
				status: 'draft',
			},

		},
	}, { manual: false });

	return {
		listkamLevelDetails: data,
		listLoading,
	};
};

export default useGetKamExpertiseLevelConfig;
