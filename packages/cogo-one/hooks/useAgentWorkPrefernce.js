/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useAgentWorkPrefernce() {
	const [{ loading, data: agentStatus }, trigger] = useRequest({
		url    : '/get_agent_work_preference',
		method : 'get',
	}, { manual: true });

	const fetchworkPrefernce = async () => {
		try {
			await trigger();
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(() => {
		fetchworkPrefernce();
	}, []);

	return {
		loading,
		agentStatus,
		fetchworkPrefernce,
	};
}
export default useAgentWorkPrefernce;
