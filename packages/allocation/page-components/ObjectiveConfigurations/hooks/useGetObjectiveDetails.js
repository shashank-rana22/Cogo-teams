import { useAllocationRequest } from '@cogoport/request';

const useGetObjectiveDetails = (props) => {
	const { activeObjectiveId } = props;

	const [{ data, loading }] = useAllocationRequest({
		url     : '/objective_details',
		method  : 'GET',
		authkey : 'get_allocation_objective_details',
		params  : { objective_id: activeObjectiveId },
	}, { manual: false });

	return {
		data,
		loading,
	};
};

export default useGetObjectiveDetails;
