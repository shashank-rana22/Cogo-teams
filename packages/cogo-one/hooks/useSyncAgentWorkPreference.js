import { useRequest } from '@cogoport/request';

const useSyncAgentWorkPreference = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/sync_agent_work_preference',
		method : 'get',
	}, { manual: true });

	const syncWorkPreference = () => {
		try {
			trigger();
		} catch (error) {
			console.error(error, 'error');
		}
	};

	return {
		loading,
		data,
		syncWorkPreference,
	};
};

export default useSyncAgentWorkPreference;
