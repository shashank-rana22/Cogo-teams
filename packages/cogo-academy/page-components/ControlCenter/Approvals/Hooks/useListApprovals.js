import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListApprovals = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : '/list_cogo_academy_requests',
		method : 'GET',
	}, { manual: true });

	const getListApprovalRequests = useCallback(
		() => {
			trigger({
				params: {
					filters: {
						status: 'pending',
					},
				},
			});
		},
		[trigger],
	);

	useEffect(() => {
		getListApprovalRequests();
	}, [getListApprovalRequests]);

	return { data, loading, getListApprovalRequests };
};

export default useListApprovals;
