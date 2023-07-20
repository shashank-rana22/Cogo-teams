import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const getPayload = ({ status }) => ({ status });

function useUpdateAgentStatus() {
	const [, trigger] = useRequest({
		url    : '/update_agent_work_preference',
		method : 'post',
	}, { manual: true });

	const updateAgentStatus = useCallback((status) => {
		try {
			trigger({
				data: getPayload({ status }),
			});
		} catch (error) {
			console.error(getApiErrorString(error?.response?.data));
		}
	}, [trigger]);

	return {
		updateAgentStatus,
	};
}
export default useUpdateAgentStatus;
