import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListApprovals = (page) => {
	const [{ data, loading }, trigger] = useRequest({
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
					page,
				},
			});
		},
		[trigger, page],
	);

	useEffect(() => {
		getListApprovalRequests();
	}, [getListApprovalRequests]);

	return { data, loading, getListApprovalRequests };
};

export default useListApprovals;
