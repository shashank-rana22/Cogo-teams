import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useGetSageArOutstandingsStats = ({ globalFilters }) => {
	const {
		profile: { authorizationparameters, selected_agent_id },
	} = useSelector((state) => state);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_sage_ar_outstanding_stat',
		method : 'GET',
	}, { manual: true });

	useEffect(() => {
		// const is_precovid = 'NO';
		// if (
		// 	multipleValues?.key === 'tagged_state'
		// 	&& multipleValues?.value === 'never'
		// ) {
		// 	is_precovid = 'YES';
		// }
		trigger({
			params: {
				cogo_entity_number : undefined,
				is_precovid        : 'NO',
				tagged_state:
					undefined,
				filters: {
					sales_agent_id: selected_agent_id,
					// ...globalFilters,
				},
			},
		});
	}, [
		authorizationparameters,
		selected_agent_id,
		globalFilters,
		trigger,
	]);
	console.log(data, 'data');
	return {
		statsLoading : loading,
		statsData    : data || {},
	};
};

export default useGetSageArOutstandingsStats;
