import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useGetAgentPreference() {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_agent_work_preference',
		method : 'get',
	}, { manual: true });

	const fetchWorkStatus = useCallback(() => {
		try {
			trigger();
		} catch (error) {
			console.error(error);
		}
	}, [trigger]);

	useEffect(() => {
		fetchWorkStatus();
	}, [fetchWorkStatus]);

	return {
		loading,
		fetchWorkStatus,
		agentWorkStatus: data,
	};
}
export default useGetAgentPreference;
