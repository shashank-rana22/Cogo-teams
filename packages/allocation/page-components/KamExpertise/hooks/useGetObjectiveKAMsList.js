import { useDebounceQuery } from '@cogoport/forms';
import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const INITIAL_PAGE = 1;

function useGetObjectiveKAMsList({
	objective_id,
}) {
	const { query = '', debounceQuery } = useDebounceQuery();

	const [page, setPage] = useState(INITIAL_PAGE);

	const [params, setParams] = useState({
		page,
		for_individual_rule : false,
		filters             : {
			objective_id,
			q: query || undefined,
		},
	});

	const [{ loading = false, data = {} }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_objective_stats',
		method  : 'get',
		authkey : 'get_allocation_kam_expertise_objective_stats',
		params  : {
			page,
			for_individual_rule : false,
			filters             : {
				objective_id,
				q: query || undefined,
			},
		},
	}, { manual: false });

	const fetch = useCallback(async () => {
		try {
			await trigger({
				params,
			});
		} catch (error) {
			console.log(error?.response?.data);
		}
	}, [trigger, params]);

	useEffect(() => {
		fetch();
	}, [fetch, page, params]);

	return {
		data,
		loading,
		page,
		setPage,
		params,
		setParams,
		fetch,
		debounceQuery,
	};
}

export default useGetObjectiveKAMsList;
