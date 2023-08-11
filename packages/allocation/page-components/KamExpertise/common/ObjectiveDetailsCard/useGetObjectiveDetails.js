import { useAllocationRequest } from '@cogoport/request';

const useGetObjectiveDetails = (props) => {
	const { activeObjectiveId } = props;

	const [{ loading = false, data }] = useAllocationRequest({
		url     : 'objective_details',
		method  : 'get',
		authkey : 'get_allocation_objective_details',
		params  : {
			objective_id: activeObjectiveId,
		},
	}, { manual: false });

	return {
		data: data?.data || {},
		loading,
	};
};

export default useGetObjectiveDetails;
