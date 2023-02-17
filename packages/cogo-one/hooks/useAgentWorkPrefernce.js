import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useAgentWorkPrefernce() {
	const [{ loading, data: agentStatus }, trigger] = useRequest({
		url    : '/get_agent_work_preference',
		method : 'get',
	}, { manual: true });

	const workPrefernce = async () => {
		await trigger();
	};

	useEffect(() => {
		workPrefernce();
	}, []);

	return {
		loading,
		agentStatus,
		workPrefernce,
	};
}
export default useAgentWorkPrefernce;
