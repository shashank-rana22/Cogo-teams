import { useAllocationRequest } from '@cogoport/request';

import formatObjectiveDataForCard from '../helpers/format-objective-data-for-card';

const useGetObjectiveDetails = (props) => {
	const { activeObjectiveId } = props;

	const [{ data, loading }] = useAllocationRequest({
		url     : '/objective_details',
		method  : 'GET',
		authkey : 'get_allocation_objective_details',
		params  : { objective_id: activeObjectiveId },
	}, { manual: false });

	const objectiveData = formatObjectiveDataForCard({ objectiveData: data?.data });

	return {
		data: objectiveData,
		loading,
	};
};

export default useGetObjectiveDetails;
