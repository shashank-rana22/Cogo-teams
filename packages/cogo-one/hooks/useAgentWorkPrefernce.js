import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useAgentWorkPrefernce() {
	const [{ loading, data: agentStatus }, trigger] = useRequest({
		url    : '/get_agent_work_preference',
		method : 'get',
	}, { manual: true });

	const fetchworkPrefernce = useCallback(async () => {
		try {
			await trigger();
		} catch (error) {
			// console.log(error);
		}
	}, [trigger]);

	useEffect(() => {
		fetchworkPrefernce();
	}, [fetchworkPrefernce]);

	return {
		loading,
		agentStatus,
		fetchworkPrefernce,
	};
}
export default useAgentWorkPrefernce;
