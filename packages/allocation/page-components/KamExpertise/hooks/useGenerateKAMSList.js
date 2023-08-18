import { useAllocationRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGenerateKAMSList({ id = '', refetchListObjectives = () => { }, loader = false }) {
	const [{ loading, data = {} }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_objective',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_objective',
	}, { manual: true });

	const refetch = useCallback(async () => {
		try {
			await trigger({
				data: {
					objective_id: id,
				},
			});

			refetchListObjectives();
		} catch (error) {
			console.log(error);
		}
	}, [id, refetchListObjectives, trigger]);

	useEffect(() => {
		if (loader) {
			return;
		}
		refetch();
	}, [loader, refetch]);

	return {
		data,
		loading,
	};
}

export default useGenerateKAMSList;
