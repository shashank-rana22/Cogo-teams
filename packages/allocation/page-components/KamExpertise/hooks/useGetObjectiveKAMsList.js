import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const INITIAL_PAGE = 1;

function useGetObjectiveKAMsList({
	objective_id,
}) {
	const [page, setPage] = useState(INITIAL_PAGE);

	// const [params, setParams] = useState({
	// 	params: {
	// 		page,
	// 		filters: {
	// 			objective_id,
	// 		},
	// 	},
	// });

	const [{ loading = false, data = {} }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_objective_stats',
		method  : 'get',
		authkey : 'get_allocation_kam_expertise_objective_stats',
		params  : {
			page,
			filters: {
				objective_id,
			},
		},
	}, { manual: false });

	const fetch = useCallback(async () => {
		try {
			await trigger({
				params: {
					page,
					filters: {
						objective_id,
					},
				},
			});
		} catch (error) {
			console.log(error?.response?.data);
		}
	}, [objective_id, page, trigger]);

	useEffect(() => {
		fetch();
	}, [fetch, page]);

	return {
		data,
		loading,
		page,
		setPage,
		// params,
		// setParams,
		fetch,
	};
}

export default useGetObjectiveKAMsList;
