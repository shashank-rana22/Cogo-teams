import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import { updateUserLastActivity } from '../helpers/configurationHelpers';

function useUpdateAgentPreference({ getListChatAgents = () => {}, firestore = {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_agent_work_preference',
		method : 'post',
	}, { manual: true });

	const updateAgentPreference = async (agent_id, status) => {
		try {
			const payload = { agent_id, status };
			await trigger({
				data: payload,
			});
			Toast.success('Successfully Updated');
			getListChatAgents();
			updateUserLastActivity({ firestore, agent_id, updated_status: status });
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};
	return {
		updateAgentPreference,
		createLoading: loading,
	};
}
export default useUpdateAgentPreference;
